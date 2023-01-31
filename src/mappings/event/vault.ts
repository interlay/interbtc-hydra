import { SubstrateBlock } from "@subsquid/substrate-processor";
import {
    CumulativeVolumePerCurrencyPair,
    Vault,
    VolumeType,
} from "../../model";
import { Ctx, EventItem } from "../../processor";
import {
    VaultRegistryDecreaseLockedCollateralEvent,
    VaultRegistryDepositCollateralEvent,
    VaultRegistryIncreaseLockedCollateralEvent,
    VaultRegistryRegisterVaultEvent,
    VaultRegistryWithdrawCollateralEvent,
} from "../../types/events";
import {
    address,
    currencyId,
    encodeLegacyVaultId,
    encodeVaultId,
    legacyCurrencyId,
} from "../encoding";
import EntityBuffer from "../utils/entityBuffer";
import { blockToHeight } from "../utils/heights";
import { updateVaultLockedCollateral } from "../utils/updateVault";

export async function registerVault(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new VaultRegistryRegisterVaultEvent(ctx, item.event);
    let e;
    let vaultId;
    let wrappedToken;
    let collateralToken;
    if (rawEvent.isV6 || rawEvent.isV15) {
        if (rawEvent.isV6) e = rawEvent.asV6;
        else e = rawEvent.asV15;
        vaultId = encodeLegacyVaultId(e.vaultId);
        wrappedToken = legacyCurrencyId.encode(e.vaultId.currencies.wrapped);
        collateralToken = legacyCurrencyId.encode(
            e.vaultId.currencies.collateral
        );
    } else {
        if (rawEvent.isV17) e = rawEvent.asV17;
        else if (rawEvent.isV1020000) e = rawEvent.asV1020000;
        else if (rawEvent.isV1021000) e = rawEvent.asV1021000;
        else {
            ctx.log.warn(`UNKOWN EVENT VERSION: Vault.registerVault`);
            return;
        }

        vaultId = encodeVaultId(e.vaultId);
        wrappedToken = currencyId.encode(e.vaultId.currencies.wrapped);
        collateralToken = currencyId.encode(e.vaultId.currencies.collateral);
    }

    const registrationBlock = await blockToHeight(
        ctx,
        block.height,
        "RegisterVault"
    );

    const collateralAmount: bigint = e.collateral;
    

    entityBuffer.pushEntity(
        Vault.name,
        new Vault({
            id: vaultId,
            accountId: address.interlay.encode(e.vaultId.accountId),
            wrappedToken,
            collateralToken,
            registrationBlock: registrationBlock,
            registrationTimestamp: new Date(block.timestamp),
            collateralAmount,
            
        })
    );
}

export async function increaseLockedCollateral(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new VaultRegistryIncreaseLockedCollateralEvent(
        ctx,
        item.event
    );
    let e;
    let wrappedToken;
    let collateralToken;
    if (rawEvent.isV10 || rawEvent.isV15) {
        if (rawEvent.isV10) e = rawEvent.asV10;
        else e = rawEvent.asV15;
        wrappedToken = legacyCurrencyId.encode(e.currencyPair.wrapped);
        collateralToken = legacyCurrencyId.encode(e.currencyPair.collateral);
    } else {
        if (rawEvent.isV17) e = rawEvent.asV17;
        else if (rawEvent.isV1020000) e = rawEvent.asV1020000;
        else if (rawEvent.isV1021000) e = rawEvent.asV1021000;
        else {
            ctx.log.warn(`UNKOWN EVENT VERSION: Vault.increaseLockedCollateral`);
            return;
        }
        wrappedToken = currencyId.encode(e.currencyPair.wrapped);
        collateralToken = currencyId.encode(e.currencyPair.collateral);
    }

    entityBuffer.pushEntity(
        CumulativeVolumePerCurrencyPair.name,
        new CumulativeVolumePerCurrencyPair({
            id: `Collateral-${item.event.id}`,
            type: VolumeType.Collateral,
            amount: e.total,
            tillTimestamp: new Date(block.timestamp),
            collateralCurrency: collateralToken,
            wrappedCurrency: wrappedToken,
        })
    );
}

export async function decreaseLockedCollateral(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new VaultRegistryDecreaseLockedCollateralEvent(
        ctx,
        item.event
    );
    let e;
    let wrappedToken;
    let collateralToken;
    if (rawEvent.isV10 || rawEvent.isV15) {
        if (rawEvent.isV10) e = rawEvent.asV10;
        else e = rawEvent.asV15;
        wrappedToken = legacyCurrencyId.encode(e.currencyPair.wrapped);
        collateralToken = legacyCurrencyId.encode(e.currencyPair.collateral);
    } else {
        if (rawEvent.isV17) e = rawEvent.asV17;
        else if (rawEvent.isV1020000) e = rawEvent.asV1020000;
        else if (rawEvent.isV1021000) e = rawEvent.asV1021000;
        else {
            ctx.log.warn(`UNKOWN EVENT VERSION: Vault.decreaseLockedCollateral`);
            return;
        }

        wrappedToken = currencyId.encode(e.currencyPair.wrapped);
        collateralToken = currencyId.encode(e.currencyPair.collateral);
    }

    entityBuffer.pushEntity(
        CumulativeVolumePerCurrencyPair.name,
        new CumulativeVolumePerCurrencyPair({
            id: `Collateral-${item.event.id}`,
            type: VolumeType.Collateral,
            amount: e.total,
            tillTimestamp: new Date(block.timestamp),
            collateralCurrency: collateralToken,
            wrappedCurrency: wrappedToken,
        })
    );
}

export async function WithdrawCollateral(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new VaultRegistryWithdrawCollateralEvent(
        ctx,
        item.event
    );
    let e;
    let vaultId;
    if (rawEvent.isV6) {
        e = rawEvent.asV6;
        vaultId = encodeLegacyVaultId(e.vaultId);
    }
    else if (rawEvent.isV15) {
        e = rawEvent.asV15;
        vaultId = encodeLegacyVaultId(e.vaultId);
    }
    else if (rawEvent.isV17)  {
        e = rawEvent.asV17
        vaultId = encodeVaultId(e.vaultId);
    }
    else if (rawEvent.isV1020000) {
        e = rawEvent.asV1020000;
        vaultId = encodeVaultId(e.vaultId);
    }
    else { 
        ctx.log.warn(`UNKNOWN EVENT VERSION: Vault.WithdrawCollateralEvent`);
        return;
    }
    console.log(`decrease collat ${vaultId} new colllateral ${e.totalCollateral} `)
    entityBuffer.pushEntity(
        Vault.name,
        await updateVaultLockedCollateral(
            vaultId,
            e.totalCollateral,
            entityBuffer,
            ctx.store,
        )
    );
}


export async function DepositCollateral(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new VaultRegistryWithdrawCollateralEvent(
        ctx,
        item.event
    );
    let e;
    let vaultId;
    if (rawEvent.isV6) {
        e = rawEvent.asV6;
        vaultId = encodeLegacyVaultId(e.vaultId);
    }
    else if (rawEvent.isV15) {
        e = rawEvent.asV15;
        vaultId = encodeLegacyVaultId(e.vaultId);
    }
    else if (rawEvent.isV17)  {
        e = rawEvent.asV17
        vaultId = encodeVaultId(e.vaultId);
    }
    else if (rawEvent.isV1020000) {
        e = rawEvent.asV1020000;
        vaultId = encodeVaultId(e.vaultId);
    }
    else { 
        ctx.log.warn(`UNKNOWN EVENT VERSION: Vault.DepositCollateralEvent`);
        return;
    }
    console.log(`incresase collat ${vaultId} new colllateral ${e.totalCollateral} `)
    entityBuffer.pushEntity(
        Vault.name,
        await updateVaultLockedCollateral(
            vaultId,
            e.totalCollateral,
            entityBuffer,
            ctx.store,
        )
    );
}
