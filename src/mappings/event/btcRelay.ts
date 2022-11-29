import { reverseEndiannessHex } from "@interlay/interbtc-api";
import { SubstrateBlock, toHex } from "@subsquid/substrate-processor";
import { RelayedBlock } from "../../model";
import { Ctx, EventItem } from "../../processor";
import { BtcRelayStoreMainChainHeaderEvent } from "../../types/events";
import { address } from "../encoding";
import EntityBuffer from "../utils/entityBuffer";
import { blockToHeight } from "../utils/heights";

export async function storeMainChainHeader(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new BtcRelayStoreMainChainHeaderEvent(ctx, item.event);
    let e;

    if (rawEvent.isV4) e = rawEvent.asV4;
    else {
        e = rawEvent.asV1019000;
        if (!rawEvent.isV1019000)
            ctx.log.warn(`UNKOWN EVENT VERSION: BTCRelay.storeMainChainHeader`);
    }

    const relayedAtHeight = await blockToHeight(
        ctx,
        block.height,
        "StoreMainChainHeader"
    );

    await entityBuffer.pushEntity(
        RelayedBlock.name,
        new RelayedBlock({
            id: e.blockHeight.toString(),
            relayedAtHeight,
            timestamp: new Date(block.timestamp),
            blockHash: reverseEndiannessHex(toHex(e.blockHash.content)),
            backingHeight: e.blockHeight,
            relayer: address.interlay.encode(e.relayerId),
        })
    );
}
