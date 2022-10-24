import { SubstrateBlock } from "@subsquid/substrate-processor";
import { LessThanOrEqual } from "typeorm";
import { Height, IssuePeriod, RedeemPeriod } from "../../model";
import { Ctx } from "../../processor";
import {
    IssueIssuePeriodStorage,
    RedeemRedeemPeriodStorage,
} from "../../types/storage";
import { blockToHeight } from "./heights";

export async function getCurrentIssuePeriod(
    ctx: Ctx,
    block: SubstrateBlock
): Promise<IssuePeriod> {
    const height = await blockToHeight(ctx, block.height);
    const latest = await ctx.store.get(IssuePeriod, {
        where: {
            height: { absolute: LessThanOrEqual(block.height) },
        },
        order: { timestamp: "DESC" },
    });
    if (latest !== undefined) return latest;

    // else fetch from storage
    return await setInitialIssuePeriod(ctx, block, height);
}

export async function getCurrentRedeemPeriod(ctx: Ctx, block: SubstrateBlock) {
    const height = await blockToHeight(ctx, block.height);
    const latest = await ctx.store.get(RedeemPeriod, {
        where: {
            height: { absolute: LessThanOrEqual(block.height) },
        },
        order: { timestamp: "DESC" },
    });
    if (latest !== undefined) return latest;

    // else fetch from storage
    return await setInitialRedeemPeriod(ctx, block, height);
}

async function setInitialIssuePeriod(
    ctx: Ctx,
    block: SubstrateBlock,
    height: Height
) {
    const rawIssuePeriodStorage = new IssueIssuePeriodStorage(ctx, block);
    let value;
    if (rawIssuePeriodStorage.isV1)
        value = await rawIssuePeriodStorage.getAsV1();
    else throw Error("Unknown storage version");
    if (!rawIssuePeriodStorage.isExists)
        throw new Error("Issue period does not exist");

    const issuePeriod = new IssuePeriod({
        id: `initial-${block.timestamp.toString()}`,
        height,
        timestamp: new Date(block.timestamp),
        value,
    });

    await ctx.store.save(issuePeriod);
    return issuePeriod;
}

export async function updateRedeemPeriodFromStorage(
    ctx: Ctx,
    block: SubstrateBlock,
    height: Height
): Promise<void> {
    const rawRedeemPeriodStorage = new RedeemRedeemPeriodStorage(ctx, block);
    let chainValue: number;
    if (rawRedeemPeriodStorage.isV1) {
        chainValue = await rawRedeemPeriodStorage.getAsV1();
    } else if (rawRedeemPeriodStorage.isV16) {
        chainValue = await rawRedeemPeriodStorage.getAsV16();
    } else {
        // log error/warning?
        return;
    }

    // find latest stored period
    const storedPeriods = await ctx.store.find(RedeemPeriod);
    const lastPeriod = storedPeriods
        .sort((a, b) => a.height.absolute - b.height.absolute)
        .pop();

    if (lastPeriod === undefined || chainValue != lastPeriod.value) {
        const redeemPeriod = new RedeemPeriod({
            id: `initial-${block.timestamp.toString()}`,
            height,
            timestamp: new Date(block.timestamp),
            value: chainValue,
        });

        ctx.store.save(redeemPeriod);
    } else {
        // log error/warning?
    }
}

async function setInitialRedeemPeriod(
    ctx: Ctx,
    block: SubstrateBlock,
    height: Height
) {
    const rawRedeemPeriodStorage = new RedeemRedeemPeriodStorage(ctx, block);
    let value;
    if (rawRedeemPeriodStorage.isV1)
        value = await rawRedeemPeriodStorage.getAsV1();
    else throw Error("Unknown storage version");
    if (!rawRedeemPeriodStorage.isExists)
        throw new Error("Redeem period does not exist");

    const redeemPeriod = new RedeemPeriod({
        id: `initial-${block.timestamp.toString()}`,
        height,
        timestamp: new Date(block.timestamp),
        value,
    });

    ctx.store.save(redeemPeriod);
    return redeemPeriod;
}
