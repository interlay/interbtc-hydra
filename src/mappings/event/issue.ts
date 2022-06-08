import { EventHandlerContext, toHex } from "@subsquid/substrate-processor";
import Debug from "debug";
import { LessThanOrEqual } from "typeorm";
import {
    Issue,
    IssueCancellation,
    IssueExecution,
    IssueRequest,
    IssueStatus,
    Refund,
    RelayedBlock,
    VolumeType,
} from "../../model";
import {
    IssueCancelIssueEvent,
    IssueExecuteIssueEvent,
    IssueRequestIssueEvent,
    RefundExecuteRefundEvent,
    RefundRequestRefundEvent,
} from "../../types/events";
import { address, currencyId, encodeVaultId } from "../encoding";
import { blockToHeight, getVaultId, updateCumulativeVolumes } from "../_utils";

const debug = Debug("interbtc-mappings:issue");

export async function requestIssue(ctx: EventHandlerContext): Promise<void> {
    const rawEvent = new IssueRequestIssueEvent(ctx);
    let e;
    if (rawEvent.isV6) e = rawEvent.asV6;
    else if (rawEvent.isV8) e = rawEvent.asV8;
    else throw Error("Unknown event version");

    const vaultId = await getVaultId(ctx.store, e.vaultId);
    if (vaultId === undefined) {
        debug(
            `WARNING: no vault ID found for issue request ${toHex(
                e.issueId
            )}, with encoded account-wrapped-collateral ID of ${encodeVaultId(
                e.vaultId
            )} (at parachain absolute height ${ctx.block.height}`
        );
        return;
    }

    const issue = new Issue({
        id: toHex(e.issueId),
        griefingCollateral: e.griefingCollateral,
        userParachainAddress: address.interlay.encode(e.requester),
        vault: vaultId,
        vaultBackingAddress: address.btc.encode(e.vaultAddress),
        vaultWalletPubkey: toHex(e.vaultPublicKey),
        status: IssueStatus.Pending,
    });

    const height = await blockToHeight(
        ctx.store,
        ctx.block.height,
        "RequestIssue"
    );

    const backingBlock = await ctx.store.get(RelayedBlock, {
        order: { backingHeight: "DESC" },
        relations: ["relayedAtHeight"],
        where: {
            relayedAtHeight: {
                absolute: LessThanOrEqual(height.absolute),
            },
        },
    });

    if (backingBlock === undefined) {
        debug(
            `WARNING: no BTC blocks relayed before issue request ${issue.id} (at parachain absolute height ${height.absolute})`
        );
    }

    issue.request = new IssueRequest({
        amountWrapped: e.amount,
        bridgeFeeWrapped: e.fee,
        height: height.id,
        timestamp: new Date(ctx.block.timestamp),
        backingHeight: backingBlock?.backingHeight || 0,
    });

    await ctx.store.save(issue);
}

export async function executeIssue(ctx: EventHandlerContext): Promise<void> {
    const rawEvent = new IssueExecuteIssueEvent(ctx);
    let e;
    if (rawEvent.isV6) e = rawEvent.asV6;
    else if (rawEvent.isV8) e = rawEvent.asV8;
    else throw Error("Unknown event version");

    const id = toHex(e.issueId);

    const issue = await ctx.store.get(Issue, { where: { id } });
    if (issue === undefined) {
        debug(
            "WARNING: ExecuteIssue event did not match any existing issue requests! Skipping."
        );
        return;
    }
    const height = await blockToHeight(
        ctx.store,
        ctx.block.height,
        "ExecuteIssue"
    );
    const amountWrapped = e.amount - e.fee; // potentially clean up event on parachain side?
    const execution = new IssueExecution({
        id: issue.id,
        issue,
        amountWrapped,
        bridgeFeeWrapped: e.fee,
        height,
        timestamp: new Date(ctx.block.timestamp),
    });
    issue.status = IssueStatus.Completed;
    await ctx.store.save(execution);
    await ctx.store.save(issue);

    await updateCumulativeVolumes(
        ctx.store,
        VolumeType.Issued,
        amountWrapped,
        new Date(ctx.block.timestamp),
        currencyId.token.encode(e.vaultId.currencies.collateral),
        currencyId.token.encode(e.vaultId.currencies.wrapped)
    );
}

export async function cancelIssue(ctx: EventHandlerContext): Promise<void> {
    // const [id, _userParachainAddress, _griefingCollateral] =
    //     new IssueCrate.CancelIssueEvent(event).params;
    const rawEvent = new IssueCancelIssueEvent(ctx);
    let e;
    if (rawEvent.isV6) e = rawEvent.asV6;
    else throw Error("Unknown event version");

    const issue = await ctx.store.get(Issue, {
        where: { id: toHex(e.issueId) },
    });
    if (issue === undefined) {
        debug(
            "WARNING: CancelIssue event did not match any existing issue requests! Skipping."
        );
        return;
    }
    const height = await blockToHeight(
        ctx.store,
        ctx.block.height,
        "CancelIssue"
    );
    const cancellation = new IssueCancellation({
        id: issue.id,
        issue,
        height,
        timestamp: new Date(ctx.block.timestamp),
    });
    issue.status = IssueStatus.Cancelled;
    await ctx.store.save(cancellation);
    await ctx.store.save(issue);
}

export async function requestRefund(ctx: EventHandlerContext): Promise<void> {
    // const [id, _issuer, amountPaid, _vault, btcAddress, issueId, btcFee] =
    //     new RefundCrate.RequestRefundEvent(event).params;
    const rawEvent = new RefundRequestRefundEvent(ctx);
    let e;
    if (rawEvent.isV6) e = rawEvent.asV6;
    else if (rawEvent.isV8) e = rawEvent.asV8;
    else throw Error("Unknown event version");

    const id = toHex(e.refundId);
    const issue = await ctx.store.get(Issue, {
        where: { id: toHex(e.issueId) },
    });
    if (issue === undefined) {
        debug(
            "WARNING: RequestRefund event did not match any existing issue requests! Skipping."
        );
        return;
    }
    const height = await blockToHeight(
        ctx.store,
        ctx.block.height,
        "RequestRefund"
    );
    const refund = new Refund({
        id,
        issue,
        issueID: issue.id,
        btcAddress: address.btc.encode(e.btcAddress),
        amountPaid: e.amount,
        btcFee: e.fee,
        requestHeight: height,
        requestTimestamp: new Date(ctx.block.timestamp),
    });
    issue.status = IssueStatus.RequestedRefund;
    await ctx.store.save(refund);
    await ctx.store.save(issue);
}

export async function executeRefund(ctx: EventHandlerContext): Promise<void> {
    // const [id] = new RefundCrate.ExecuteRefundEvent(event).params;
    const rawEvent = new RefundExecuteRefundEvent(ctx);
    let e;
    if (rawEvent.isV6) e = rawEvent.asV6;
    else if (rawEvent.isV8) e = rawEvent.asV8;
    else throw Error("Unknown event version");

    const refund = await ctx.store.get(Refund, {
        where: { id: toHex(e.refundId) },
    });
    if (refund === undefined) {
        debug(
            "WARNING: ExecuteRefund event did not match any existing refund requests! Skipping."
        );
        return;
    }
    const issue = await ctx.store.get(Issue, {
        where: { id: refund.issueID },
    });
    if (issue === undefined) {
        debug(
            "WARNING: ExecuteRefund event did not match any existing issue requests! Skipping."
        );
        return;
    }
    refund.executionHeight = await blockToHeight(
        ctx.store,
        ctx.block.height,
        "ExecuteRefund"
    );
    refund.executionTimestamp = new Date(ctx.block.timestamp);
    issue.status = IssueStatus.Completed;
    await ctx.store.save(refund);
    await ctx.store.save(issue);
}
