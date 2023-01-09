import { Entity, Store } from "@subsquid/typeorm-store";
import { Currency, Height, Issue, Redeem, Vault } from "../model";
import { VaultId as VaultIdV15 } from "../types/v15";
import { VaultId as VaultIdV17 } from "../types/v17";
import { VaultId as VaultIdV6 } from "../types/v6";
import { VaultId as VaultIdV1020000 } from "../types/v1020000";
import { encodeLegacyVaultId, encodeVaultId } from "./encoding";
import { ApiPromise, WsProvider } from '@polkadot/api';
import * as process from "process";

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

export function getFirstAndLastFour(str: string) {
    // If the string is less than 8 characters, return it as-is
    if (str.length < 8) {
        return str;
    }

    // Otherwise, return the first four characters plus "..." plus the last four characters
    return str.substring(0, 4) + "..." + str.substring(str.length - 4);
}

type AssetMetadata = {
    decimals: number;
    name: string;
    symbol: string;
}

// This function uses the storage API to obtain the details directly from the
// WSS RPC provider for the correct chain
const cache: { [id: number]: AssetMetadata } = {};

export async function getForeignAsset(id: number): Promise<AssetMetadata> {
    if (id in cache) {
        return cache[id];
    }
    try {
        const wsProvider = new WsProvider(process.env.CHAIN_ENDPOINT);
        const api = await ApiPromise.create({ provider: wsProvider });
        const assets = await api.query.assetRegistry.metadata(id);
        const assetsJSON = assets.toHuman();
        const metadata = assetsJSON as AssetMetadata;
        console.debug(`Foreign Asset (${id}): ${JSON.stringify(metadata)}`);
        cache[id] = metadata;
        return metadata;
    } catch (error) {
        console.error(`Error getting foreign asset metadata: ${error}`);
        throw error;
    }
}

/* This function takes a currency object (could be native, could be foreign) and
an amount (in the smallest unit, e.g. Planck) and returns a human friendly string
with a reasonable accuracy (6 digits after the decimal point for BTC and 2 for
all others)
*/
export async function friendlyAmount(currency: Currency, amount: number): Promise<string> {
    let amountFriendly: number;
    switch(currency.isTypeOf) {
        case 'NativeToken':
            switch (currency.token) {
                case 'KINT':
                case 'KSM':
                    amountFriendly = amount / 10 ** 12;
                    return `${amountFriendly.toFixed(2)} ${currency.token}`;
                case 'INTR':
                case 'DOT':
                    amountFriendly = amount / 10 ** 10;
                    return `${amountFriendly.toFixed(2)} ${currency.token}`;
                case 'KBTC':
                case 'IBTC':
                    amountFriendly = amount / 10 ** 8;
                    return `${amountFriendly.toFixed(6)} ${currency.token}`;
                default:
                    return `Unknown token: ${currency}`
            }
        case 'ForeignAsset':
            const details = await getForeignAsset(currency.asset)
            amountFriendly = amount / 10 ** (details.decimals);
            return `${amountFriendly.toFixed(2)} ${details.symbol}`;
        default:
            return `Unknown asset: ${currency}`
    }
}
