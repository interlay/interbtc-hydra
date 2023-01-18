import { Entity, Store } from "@subsquid/typeorm-store";
import { Height, Issue, Redeem, Vault } from "../model";
import { VaultId as VaultIdV15 } from "../types/v15";
import { VaultId as VaultIdV17 } from "../types/v17";
import { VaultId as VaultIdV6 } from "../types/v6";
import { VaultId as VaultIdV1020000 } from "../types/v1020000";
import { currencyId, encodeLegacyVaultId, encodeVaultId } from "./encoding";
import {
    Token,
    NativeToken,
    ForeignAsset,
    Currency,
    LendToken,
} from "../model";
import {
    Bitcoin,
    Currency as tCurrency,
    InterBtc,
    Interlay,
    KBtc,
    Kintsugi,
    Kusama,
    Polkadot
} from "@interlay/monetary-js";
import { BitcoinNetwork,  CurrencyIdentifier} from "@interlay/interbtc-api/src/types";
import { appendFile } from "fs";
require('dotenv/config')

export type eventArgs = {
    event: { args: true };
};
export type eventArgsData = {
    data: eventArgs;
};

const parachainBlocksPerBitcoinBlock = 100; // TODO: HARDCODED - find better way to set?

export async function getVaultIdLegacy(
    store: Store,
    vaultId: VaultIdV15 | VaultIdV6
) {
    return store.get(Vault, {
        where: { id: encodeLegacyVaultId(vaultId) },
    });
}

export async function getVaultId(store: Store, vaultId: VaultIdV1020000) {
    return store.get(Vault, {
        where: { id: encodeVaultId(vaultId) },
    });
}

export async function isRequestExpired(
    store: Store,
    request: Issue | Redeem,
    latestBtcBlock: number,
    latestActiveBlock: number,
    period: number
): Promise<boolean> {
    const requestHeight = await store.get(Height, {
        where: { id: request.request.height },
    });
    if (requestHeight === undefined) return false; // no active blocks yet

    const btcPeriod = Math.ceil(period / parachainBlocksPerBitcoinBlock);

    return (
        request.request.backingHeight + btcPeriod < latestBtcBlock &&
        requestHeight.active + period < latestActiveBlock
    );
}

// const currencyMap = {
//     [Token.DOT]: Polkadot,
//     [Token.INTR]: InterBtc,
//     [Token.KSM]: Kusama,
//     [Token.KINT]: Kintsugi,
//     [Token.IBTC]: InterBtc,
//     [Token.KBTC]: KBtc
// }
// export async function convertAmountToHuman(currency: Currency, amount: BigInt ) : BigInt {
//     if (currency.isTypeOf === "NativeToken") {
//         return amount.valueOf() / (BigInt(10) ** BigInt(currencyMap[currency.token].decimals));
//     }
//     // need to fetch on-chain data for Foreign Asset and Lend Token
//     const PARACHAIN_ENDPOINT = process.env.CHAIN_ENDPOINT;
//     const BITCOIN_NETWORK = process.env.BITCOIN_NETWORK as BitcoinNetwork;
//     const interBTC = await createInterBtcApi(PARACHAIN_ENDPOINT!, BITCOIN_NETWORK!);
//     if (currency.isTypeOf === "ForeignAsset") {
//         return await interBTC.assetRegistry.getForeignAsset(currency.asset);
//     } else if (currency.isTypeOf === "LendToken") {
//        return await interBTC.loans.getUnderlyingCurrencyFromLendTokenId(currency.lendTokenId);
//     } 
    
//     console.error(`No handling implemented for currency type`);
// }

export async function convertAmountToHuman(currency: Currency, amount: BigInt ) : BigInt {
    var id;
    if (currency.isTypeOf === "NativeToken") {
        id = currency.token;
    }
    else if (currency.isTypeOf === "ForeignAsset") {
        id = currency.asset;
    }
    else if (currency.isTypeOf === "LendToken") {
        id = currency.lendTokenId;
    }
    
}


