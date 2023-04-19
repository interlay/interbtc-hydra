import { BigDecimal } from "@subsquid/big-decimal";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";
import { Big, RoundingMode } from "big.js";
import {
    CumulativeDexTradeCount,
    CumulativeDexTradeCountPerAccount,
    CumulativeDexTradingVolume,
    CumulativeDexTradingVolumePerAccount,
    CumulativeDexTradingVolumePerPool,
    Currency,
    fromJsonPooledToken,
    Height,
    PooledToken,
    PoolType,
    Swap
} from "../../model";
import { Ctx, EventItem } from "../../processor";
import { DexGeneralAssetSwapEvent, DexStableCurrencyExchangeEvent } from "../../types/events";
import { DexGeneralPairStatusesStorage } from "../../types/storage";
import { CurrencyId as CurrencyId_V1021000, PairStatus_Trading } from "../../types/v1021000";
import { address, currencyId } from "../encoding";
import {
    createPooledAmount,
    SwapDetails,
    SwapDetailsAmount,
    updateCumulativeDexTotalTradeCount,
    updateCumulativeDexTotalVolumes,
    updateCumulativeDexTradeCountPerAccount,
    updateCumulativeDexVolumesForStablePool,
    updateCumulativeDexVolumesForStandardPool,
    updateCumulativeDexVolumesPerAccount
} from "../utils/cumulativeVolumes";
import EntityBuffer from "../utils/entityBuffer";
import { blockToHeight } from "../utils/heights";
import { compareCurrencies, getStablePoolCurrencyByIndex } from "../utils/pools";

function isPooledToken(currency: Currency): currency is PooledToken {
    try {
        fromJsonPooledToken(currency);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Combines the given arrays into an array of {@link SwapDetailsAmount}.
 * @param currencies An array of currencies, assumed to be of type {@link PooledToken}
 * @param atomicBalances An array of bigint atomic balances matching the currencies array
 * @param fromAccountId The sending account id
 * @param toAccountId The receiving account id
 * @returns An array of {@link SwapDetailsAmount}s in the same order as the currencies and amounts were passed in
 * @throws {@link Error}
 * Throws an error if currencies length does not match balances length, or if a passed in currency is not a {@link PooledToken}
 */
function createSwapDetailsAmounts(
    currencies: Currency[],
    currencyIds: CurrencyId_V1021000[],
    atomicBalances: bigint[],
    fromAccountId: string,
    toAccountId: string
): SwapDetailsAmount[] {
    if (currencies.length !== atomicBalances.length) {
        throw new Error(`Cannot create SwapDetailsAmounts; currency count [${
            currencies.length
        }] does not match balance count [${
            atomicBalances.length
        }]`);
    }

    if (currencies.length !== currencyIds.length) {
        throw new Error(`Cannot create SwapDetailsAmounts; currency count [${
            currencies.length
        }] does not match currencyIds count [${
            currencyIds.length
        }]`);
    }

    const amounts: SwapDetailsAmount[] = [];

    for (let idx = 0; idx < currencies.length; idx++) {
        // only last amount goes to destination account, all others is the sender swapping with themselves
        const accountId = idx == (currencies.length - 1) ? toAccountId : fromAccountId;
        const currency = currencies[idx];
        const currencyId = currencyIds[idx];
        const atomicAmount = atomicBalances[idx];

        if (!isPooledToken(currency)) {
            throw new Error(`Cannot create SwapDetailsAmounts; unexpected currency type found (${
                currency.isTypeOf
            }), skip processing of DexGeneralAssetSwapEvent`);
        }

        amounts.push({
            currency,
            atomicAmount,
            accountId,
            currencyId
        });
    }

    return amounts;
}

/**
 * Combines the given arrays into in/out pairs as an array of {@link SwapDetails}.
 * @param amounts The swap details amounts in order of the swap path
 * @returns An array of pair-wise combined {@link SwapDetails}.
 */
function createPairWiseSwapDetails(amounts: SwapDetailsAmount[]): SwapDetails[] {
    const swapDetailsList: SwapDetails[] = [];
    for(let idx = 0; (idx + 1) < amounts.length; idx++) {
        const inIdx = idx;
        const outIdx = idx + 1;
        
        swapDetailsList.push({
            from: amounts[inIdx],
            to: amounts[outIdx]
        });
    }

    return swapDetailsList;
}

async function updateTotalAndPerAccountVolumesAndTradeCounts(
    blockTimestamp: Date,
    amounts: SwapDetailsAmount[],
    accountId: string,
    store: Store,
    entityBuffer: EntityBuffer
): Promise<void> {
    const [
        volumePerAccountEntity,
        totalVolumeEntity,
        tradeCountPerAccountEntity,
        totalCountEntity
    ] = await Promise.all([
        updateCumulativeDexVolumesPerAccount(
            store,
            blockTimestamp,
            amounts,
            accountId,
            entityBuffer
        ),
        updateCumulativeDexTotalVolumes(
            store,
            blockTimestamp,
            amounts,
            entityBuffer
        ),
        updateCumulativeDexTradeCountPerAccount(
            store,
            blockTimestamp,
            accountId,
            entityBuffer
        ),
        updateCumulativeDexTotalTradeCount(
            store,
            blockTimestamp,
            entityBuffer
        ),
    ]);
    entityBuffer.pushEntity(CumulativeDexTradingVolume.name, totalVolumeEntity);
    entityBuffer.pushEntity(CumulativeDexTradingVolumePerAccount.name, volumePerAccountEntity);
    entityBuffer.pushEntity(CumulativeDexTradeCount.name, totalCountEntity);
    entityBuffer.pushEntity(CumulativeDexTradeCountPerAccount.name, tradeCountPerAccountEntity);
}

export async function dexGeneralAssetSwap(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new DexGeneralAssetSwapEvent(ctx, item.event);
    let currencies: Currency[] = [];
    let currencyIds: CurrencyId_V1021000[] = [];
    let atomicBalances: bigint[] = [];
    let fromAccountId: string;
    let toAccountId: string;

    if (rawEvent.isV1021000) {
        const [fromAccountIdRaw, toAccountIdRaw, swapPath, balances] = rawEvent.asV1021000;
        currencyIds = swapPath;
        currencies = swapPath.map(currencyId.encode);
        atomicBalances = balances;
        fromAccountId = address.interlay.encode(fromAccountIdRaw);
        toAccountId = address.interlay.encode(toAccountIdRaw);
    } else {
        ctx.log.warn("UNKOWN EVENT VERSION: DexGeneral.AssetSwap");
        return;
    }

    const height = await blockToHeight(ctx, block.height);

    // we can only use pooled tokens, check we have not other ones
    for (const currency of currencies) {
        if (!isPooledToken(currency)) {
            ctx.log.error(`Unexpected currency type ${currency.isTypeOf} in pool, skip processing of DexGeneralAssetSwapEvent`);
            return;
        }
    }

    let amounts: SwapDetailsAmount[];
    try {

        amounts = createSwapDetailsAmounts(currencies, currencyIds, atomicBalances, fromAccountId, toAccountId);
    } catch (e) {
        ctx.log.error((e as Error).message);
        return;
    }
    const swapDetailsList = createPairWiseSwapDetails(amounts);


    const blockTimestamp = new Date(block.timestamp);
    // construct and await sequentially, otherwise some operations may try to read values from 
    // the entity buffer before it has been updated
    for (const swapDetails of swapDetailsList) {
        const swapEntity = await buildNewSwapEntity(
            ctx,
            block,
            PoolType.Standard,
            swapDetails,
            height,
            blockTimestamp
        );

        entityBuffer.pushEntity(Swap.name, swapEntity);

        const entity = await updateCumulativeDexVolumesForStandardPool(
            ctx.store,
            blockTimestamp,
            swapDetails,
            entityBuffer
        );
        entityBuffer.pushEntity(CumulativeDexTradingVolumePerPool.name, entity);
    }

    await updateTotalAndPerAccountVolumesAndTradeCounts(
        blockTimestamp,
        amounts,
        fromAccountId,
        ctx.store,
        entityBuffer
    );
}

export async function dexStableCurrencyExchange(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new DexStableCurrencyExchangeEvent(ctx, item.event);
    let poolId: number;
    let inIndex: number;
    let outIndex: number;
    let inAmount: bigint;
    let outAmount: bigint;
    let fromAccountId: string;
    let toAccountId: string;

    if (rawEvent.isV1021000) {
        const event = rawEvent.asV1021000;
        poolId = event.poolId;
        inIndex = event.inIndex;
        outIndex = event.outIndex;
        inAmount = event.inAmount;
        outAmount = event.outAmount;
        fromAccountId = address.interlay.encode(event.who);
        toAccountId = address.interlay.encode(event.to);
    } else {
        ctx.log.warn("UNKOWN EVENT VERSION: DexStable.CurrencyExchange");
        return;
    }

    const [outCurrency, outCurrencyId] = await getStablePoolCurrencyByIndex(ctx, block, poolId, outIndex);
    const [inCurrency, inCurrencyId] = await getStablePoolCurrencyByIndex(ctx, block, poolId, inIndex);
    
    if (!isPooledToken(inCurrency)) {
        ctx.log.error(`Unexpected currencyIn type ${inCurrency.isTypeOf}, skip processing of DexGeneralAssetSwapEvent`);
        return;
    }
    if (!isPooledToken(outCurrency)) {
        ctx.log.error(`Unexpected currencyOut type ${outCurrency.isTypeOf}, skip processing of DexGeneralAssetSwapEvent`);
        return;
    }

    const swapDetails: SwapDetails = {
        from: {
            currency: inCurrency,
            currencyId: inCurrencyId,
            atomicAmount: inAmount,
            accountId: fromAccountId
        },
        to: {
            currency: outCurrency,
            currencyId: outCurrencyId,
            atomicAmount: outAmount,
            accountId: toAccountId
        }
    };

    const amounts = [swapDetails.from, swapDetails.to];
    const blockTimestamp = new Date(block.timestamp);

    const entity = await updateCumulativeDexVolumesForStablePool(
        ctx.store,
        blockTimestamp,
        poolId,
        swapDetails,
        entityBuffer
    );

    entityBuffer.pushEntity(CumulativeDexTradingVolumePerPool.name, entity);

    await updateTotalAndPerAccountVolumesAndTradeCounts(
        blockTimestamp,
        amounts,
        fromAccountId,
        ctx.store,
        entityBuffer
    );
}

async function buildNewSwapEntity(
    ctx: Ctx,
    block: SubstrateBlock,
    poolType: PoolType,
    swapDetails: SwapDetails,
    height: Height,
    blockTimestamp: Date
): Promise<Swap> {
    
    let feeRate = Big(0);

    if (poolType == PoolType.Standard) {
        const currencyCompareValue = compareCurrencies(swapDetails.from.currency, swapDetails.to.currency);
        const currencyPairKey: [CurrencyId_V1021000, CurrencyId_V1021000] = currencyCompareValue < 0 
            ? [swapDetails.from.currencyId, swapDetails.to.currencyId] 
            : [swapDetails.to.currencyId, swapDetails.from.currencyId];
    
        const dexGeneralStorage = new DexGeneralPairStatusesStorage(ctx, block);
        if (!dexGeneralStorage.isExists) {
            throw Error("buildNewSwapEntity: DexGeneral.PairStatuses storage is not defined for this spec version");
        } else if (dexGeneralStorage.isV1021000) {
            const rawStorage = await dexGeneralStorage.getAsV1021000(currencyPairKey);
            if (rawStorage.__kind === "Trading") {
                // raw fee rate is in basis points, so times 0.0001 for actual rate
                feeRate = Big((rawStorage as PairStatus_Trading).value.feeRate.toString()).mul(0.0001);
            }
        }
    } else {
        // TODO: implement fee rate fetching for stable dex
    }

    // clone from amount, fee rate is applied to that for fees
    const feeDetails = {...swapDetails.from};
    // round down to get atomic value
    const adjustedAmount = feeRate.mul(feeDetails.atomicAmount.toString()).toPrecision(0, RoundingMode.RoundDown);
    feeDetails.atomicAmount = BigInt(adjustedAmount);

    const [fromAmount, toAmount, feesAmount] = await Promise.all([
        createPooledAmount(swapDetails.from),
        createPooledAmount(swapDetails.to),
        createPooledAmount(feeDetails),
    ]);

    const entity = new Swap({
        id: "abc",
        height,
        timestamp: blockTimestamp,
        fromAccount: swapDetails.from.accountId,
        toAccount: swapDetails.to.accountId,
        from: fromAmount,
        to: toAmount,
        fees: feesAmount,
        feeRate: BigDecimal(feeRate.toString())
    });

    return entity;
}
