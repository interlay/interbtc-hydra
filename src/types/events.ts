import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v1 from './v1'
import * as v10 from './v10'
import * as v15 from './v15'
import * as v17 from './v17'
import * as v3 from './v3'
import * as v4 from './v4'
import * as v6 from './v6'

export class BtcRelayStoreMainChainHeaderEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'btcRelay.StoreMainChainHeader')
  }

  /**
   *  new chain height, block_header_hash, relayer_id
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('btcRelay.StoreMainChainHeader') === 'f968eb148e0dc7739feb64d5c72eea0de823dbf44259d08f9a6218f8117bf19a'
  }

  /**
   *  new chain height, block_header_hash, relayer_id
   */
  get asV1(): [number, Uint8Array, Uint8Array] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * new chain height, block_header_hash, relayer_id
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('btcRelay.StoreMainChainHeader') === '290531519837049ab1429ea437847c9beb65c88478190b3042d7b5068e32692c'
  }

  /**
   * new chain height, block_header_hash, relayer_id
   */
  get asV3(): [number, v3.H256Le, v3.AccountId32] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV4(): boolean {
    return this.ctx._chain.getEventHash('btcRelay.StoreMainChainHeader') === '3a178b8aa8fda895164a8d649ecb2cd8dfbc42daa449008b2b703520d2768e74'
  }

  get asV4(): {blockHeight: number, blockHash: v4.H256Le, relayerId: v4.AccountId32} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV4
  }

  get asLatest(): {blockHeight: number, blockHash: v4.H256Le, relayerId: v4.AccountId32} {
    deprecateLatest()
    return this.asV4
  }
}

export class EscrowDepositEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'escrow.Deposit')
  }

  get isV6(): boolean {
    return this.ctx._chain.getEventHash('escrow.Deposit') === 'cffee376c25258e64c55b292b2ef7fd293b8dae2b1bded46ae86117b6bef1e06'
  }

  get asV6(): {who: v6.AccountId32, amount: bigint, unlockHeight: number} {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV6
  }

  get asLatest(): {who: v6.AccountId32, amount: bigint, unlockHeight: number} {
    deprecateLatest()
    return this.asV6
  }
}

export class EscrowWithdrawEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'escrow.Withdraw')
  }

  get isV6(): boolean {
    return this.ctx._chain.getEventHash('escrow.Withdraw') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  get asV6(): {who: v6.AccountId32, amount: bigint} {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV6
  }

  get asLatest(): {who: v6.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV6
  }
}

export class IssueCancelIssueEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'issue.CancelIssue')
  }

  get isV1(): boolean {
    return this.ctx._chain.getEventHash('issue.CancelIssue') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  get asV1(): [Uint8Array, Uint8Array, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV4(): boolean {
    return this.ctx._chain.getEventHash('issue.CancelIssue') === 'dd10ea1f015728a5572b75e327aaa9f9728439faeebf53fdb44dfd30dab17474'
  }

  get asV4(): {issueId: v4.H256, requester: v4.AccountId32, griefingCollateral: bigint} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV4
  }

  get asLatest(): {issueId: v4.H256, requester: v4.AccountId32, griefingCollateral: bigint} {
    deprecateLatest()
    return this.asV4
  }
}

export class IssueExecuteIssueEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'issue.ExecuteIssue')
  }

  get isV1(): boolean {
    return this.ctx._chain.getEventHash('issue.ExecuteIssue') === '2820d4c58b8c4ec99257547a894db861abc1a572bd87d7a2ba5a25416d6d49df'
  }

  get asV1(): [Uint8Array, Uint8Array, bigint, Uint8Array, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV3(): boolean {
    return this.ctx._chain.getEventHash('issue.ExecuteIssue') === 'a1f3d32d29a387d7b9013ef2d1b13fea592053869403bfdb77f39e02178dbac0'
  }

  get asV3(): [v3.H256, v3.AccountId32, v3.VaultId, bigint, bigint] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV4(): boolean {
    return this.ctx._chain.getEventHash('issue.ExecuteIssue') === '49e3902185f84af75b36ed39680404c296dd95ff77f390f753e7c37a64f2cbe4'
  }

  get asV4(): {issueId: v4.H256, requester: v4.AccountId32, vaultId: v4.VaultId, amount: bigint, fee: bigint} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV6(): boolean {
    return this.ctx._chain.getEventHash('issue.ExecuteIssue') === '2ff5138d78f3f6a2653075dd3a176e19ea3d74dff5322a66842829791cc1bf1c'
  }

  get asV6(): {issueId: v6.H256, requester: v6.AccountId32, vaultId: v6.VaultId, amount: bigint, fee: bigint} {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV15(): boolean {
    return this.ctx._chain.getEventHash('issue.ExecuteIssue') === '59b466a6e015f85e94002e9665fe08f0186b5e846ef923083d28d6a163240ef5'
  }

  get asV15(): {issueId: v15.H256, requester: v15.AccountId32, vaultId: v15.VaultId, amount: bigint, fee: bigint} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV17(): boolean {
    return this.ctx._chain.getEventHash('issue.ExecuteIssue') === '566276893c9ed457216387ebf43f6abe618732a1c66cf1fce9ec1e6549b3e23a'
  }

  get asV17(): {issueId: v17.H256, requester: v17.AccountId32, vaultId: v17.VaultId, amount: bigint, fee: bigint} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {issueId: v17.H256, requester: v17.AccountId32, vaultId: v17.VaultId, amount: bigint, fee: bigint} {
    deprecateLatest()
    return this.asV17
  }
}

export class IssueIssueAmountChangeEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'issue.IssueAmountChange')
  }

  get isV1(): boolean {
    return this.ctx._chain.getEventHash('issue.IssueAmountChange') === '426271b0ff71255c125e9a4ea897d86d39682c8454bbff4c6c9a8d50e0d966a4'
  }

  get asV1(): [Uint8Array, bigint, bigint, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV4(): boolean {
    return this.ctx._chain.getEventHash('issue.IssueAmountChange') === 'd4db9e803afab73bfc3e51de57bb3cab34cbb49ee15550d4984bcbe248bb76fc'
  }

  get asV4(): {issueId: v4.H256, amount: bigint, fee: bigint, confiscatedGriefingCollateral: bigint} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV4
  }

  get asLatest(): {issueId: v4.H256, amount: bigint, fee: bigint, confiscatedGriefingCollateral: bigint} {
    deprecateLatest()
    return this.asV4
  }
}

export class IssueIssuePeriodChangeEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'issue.IssuePeriodChange')
  }

  get isV16(): boolean {
    return this.ctx._chain.getEventHash('issue.IssuePeriodChange') === 'e4e1ffe21a95b5f4c933e4d40a2443e9cc2637c056d780de97e2e7ad5f6a7f59'
  }

  get asV16(): {period: number} {
    assert(this.isV16)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV16
  }

  get asLatest(): {period: number} {
    deprecateLatest()
    return this.asV16
  }
}

export class IssueRequestIssueEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'issue.RequestIssue')
  }

  get isV1(): boolean {
    return this.ctx._chain.getEventHash('issue.RequestIssue') === 'ef06c322f93c1464c44b998ba5b001d4b07defc39952ee26eb5dd165e2feb3cc'
  }

  get asV1(): [Uint8Array, Uint8Array, bigint, bigint, bigint, Uint8Array, v1.BtcAddress, Uint8Array] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV3(): boolean {
    return this.ctx._chain.getEventHash('issue.RequestIssue') === 'da8b8369ee4b69f852a27eb4204d9100b66fdba5008f7343b322a11b7ae3e108'
  }

  get asV3(): [v3.H256, v3.AccountId32, bigint, bigint, bigint, v3.VaultId, v3.Address, v3.PublicKey] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV4(): boolean {
    return this.ctx._chain.getEventHash('issue.RequestIssue') === 'e9c053c04240da9f4e2ea2147886c8716c19d1b52338aaa74eb784127a3e8349'
  }

  get asV4(): {issueId: v4.H256, requester: v4.AccountId32, amount: bigint, fee: bigint, griefingCollateral: bigint, vaultId: v4.VaultId, vaultAddress: v4.Address, vaultPublicKey: v4.PublicKey} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV6(): boolean {
    return this.ctx._chain.getEventHash('issue.RequestIssue') === '9910df9068ce728a128a44ed3596fac8d6668c4542edc3d1b0633e7f6f22427e'
  }

  get asV6(): {issueId: v6.H256, requester: v6.AccountId32, amount: bigint, fee: bigint, griefingCollateral: bigint, vaultId: v6.VaultId, vaultAddress: v6.Address, vaultPublicKey: v6.PublicKey} {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV15(): boolean {
    return this.ctx._chain.getEventHash('issue.RequestIssue') === 'be2b62a770052ad3efd867964c7b393dc73d5a0d8e1e478ae5a5a98e49d5a24c'
  }

  get asV15(): {issueId: v15.H256, requester: v15.AccountId32, amount: bigint, fee: bigint, griefingCollateral: bigint, vaultId: v15.VaultId, vaultAddress: v15.Address, vaultPublicKey: v15.PublicKey} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV17(): boolean {
    return this.ctx._chain.getEventHash('issue.RequestIssue') === '769ffeb97beaff8fe740f3751c457b8fc376b93ebf99b41c29772f70804e3b37'
  }

  get asV17(): {issueId: v17.H256, requester: v17.AccountId32, amount: bigint, fee: bigint, griefingCollateral: bigint, vaultId: v17.VaultId, vaultAddress: v17.Address, vaultPublicKey: v17.PublicKey} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {issueId: v17.H256, requester: v17.AccountId32, amount: bigint, fee: bigint, griefingCollateral: bigint, vaultId: v17.VaultId, vaultAddress: v17.Address, vaultPublicKey: v17.PublicKey} {
    deprecateLatest()
    return this.asV17
  }
}

export class OracleFeedValuesEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'oracle.FeedValues')
  }

  /**
   *  Event emitted when exchange rate is set
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('oracle.FeedValues') === '3b4b93a6dae57862d440fff55bea297ee17d31135418d17f57328cacdf0a0c7e'
  }

  /**
   *  Event emitted when exchange rate is set
   */
  get asV1(): [Uint8Array, [v1.OracleKey, bigint][]] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Event emitted when exchange rate is set
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('oracle.FeedValues') === '150be353c3897d92d2f59dd0cf42f8e94e7733485ffced2934e1fe7fabc7d63b'
  }

  /**
   * Event emitted when exchange rate is set
   */
  get asV3(): [v3.AccountId32, [v3.Key, v3.FixedU128][]] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Event emitted when exchange rate is set
   */
  get isV4(): boolean {
    return this.ctx._chain.getEventHash('oracle.FeedValues') === '482aee6c657d0b3c7f63bde1b0b37398fc9c0f8c86ae00d1a2b92472ba0e857b'
  }

  /**
   * Event emitted when exchange rate is set
   */
  get asV4(): {oracleId: v4.AccountId32, values: [v4.Key, v4.FixedU128][]} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Event emitted when exchange rate is set
   */
  get isV6(): boolean {
    return this.ctx._chain.getEventHash('oracle.FeedValues') === 'f16b568d293186bb4f58786837ea9fcb8f319058b4d8f2d493bf4608c02af411'
  }

  /**
   * Event emitted when exchange rate is set
   */
  get asV6(): {oracleId: v6.AccountId32, values: [v6.Key, v6.FixedU128][]} {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Event emitted when exchange rate is set
   */
  get isV15(): boolean {
    return this.ctx._chain.getEventHash('oracle.FeedValues') === 'd9737bee3d7f81120cc278add05171ccee95498f161d512210a7510b4950f7d3'
  }

  /**
   * Event emitted when exchange rate is set
   */
  get asV15(): {oracleId: v15.AccountId32, values: [v15.Key, v15.FixedU128][]} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Event emitted when exchange rate is set
   */
  get isV17(): boolean {
    return this.ctx._chain.getEventHash('oracle.FeedValues') === 'a69282ccd8a5eae74ab42e55b767eebed71035da539edf78068263113d72072e'
  }

  /**
   * Event emitted when exchange rate is set
   */
  get asV17(): {oracleId: v17.AccountId32, values: [v17.Key, v17.FixedU128][]} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {oracleId: v17.AccountId32, values: [v17.Key, v17.FixedU128][]} {
    deprecateLatest()
    return this.asV17
  }
}

export class RedeemCancelRedeemEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'redeem.CancelRedeem')
  }

  get isV1(): boolean {
    return this.ctx._chain.getEventHash('redeem.CancelRedeem') === '89a9db7040ea8c8edb842cad6a713f9fbd227582910735d3b562ea8f2be62f16'
  }

  get asV1(): [Uint8Array, Uint8Array, Uint8Array, bigint, v1.RedeemRequestStatus] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV3(): boolean {
    return this.ctx._chain.getEventHash('redeem.CancelRedeem') === '573ff84888e6c6e2434a4b05bac34ec6f9aae9929e23acc6da1aa4fe42d59a7e'
  }

  get asV3(): [v3.H256, v3.AccountId32, v3.VaultId, bigint, v3.RedeemRequestStatus] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV4(): boolean {
    return this.ctx._chain.getEventHash('redeem.CancelRedeem') === 'ff228821848b6261f9fd58719f6ae2add2e429b150385f2203137b8b46dc25c9'
  }

  get asV4(): {redeemId: v4.H256, redeemer: v4.AccountId32, vaultId: v4.VaultId, slashedAmount: bigint, status: v4.RedeemRequestStatus} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV6(): boolean {
    return this.ctx._chain.getEventHash('redeem.CancelRedeem') === '65667d182147765266d9fde5bea213fc219a68bbfe9ee55aab26e99c43c2bd35'
  }

  get asV6(): {redeemId: v6.H256, redeemer: v6.AccountId32, vaultId: v6.VaultId, slashedAmount: bigint, status: v6.RedeemRequestStatus} {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV15(): boolean {
    return this.ctx._chain.getEventHash('redeem.CancelRedeem') === '2bcc8077005e6b218259975e52323959dc8afc6d8c7badbecbf2a61537bb5268'
  }

  get asV15(): {redeemId: v15.H256, redeemer: v15.AccountId32, vaultId: v15.VaultId, slashedAmount: bigint, status: v15.RedeemRequestStatus} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV17(): boolean {
    return this.ctx._chain.getEventHash('redeem.CancelRedeem') === '046a69f6b3ee0b3f2ab566a61e763c659684c61891baeb681e8bbd95a6268e50'
  }

  get asV17(): {redeemId: v17.H256, redeemer: v17.AccountId32, vaultId: v17.VaultId, slashedAmount: bigint, status: v17.RedeemRequestStatus} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {redeemId: v17.H256, redeemer: v17.AccountId32, vaultId: v17.VaultId, slashedAmount: bigint, status: v17.RedeemRequestStatus} {
    deprecateLatest()
    return this.asV17
  }
}

export class RedeemExecuteRedeemEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'redeem.ExecuteRedeem')
  }

  get isV1(): boolean {
    return this.ctx._chain.getEventHash('redeem.ExecuteRedeem') === 'ddfb1e4049cf47af7a60ff62354633676032a50a91925f2082c4eb3bde2768b6'
  }

  get asV1(): [Uint8Array, Uint8Array, bigint, bigint, Uint8Array, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV3(): boolean {
    return this.ctx._chain.getEventHash('redeem.ExecuteRedeem') === 'd486dad84db93a7d3f91da2a18ae04af2545639363cda745a17ebed7036d2e9c'
  }

  get asV3(): [v3.H256, v3.AccountId32, v3.VaultId, bigint, bigint, bigint] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV4(): boolean {
    return this.ctx._chain.getEventHash('redeem.ExecuteRedeem') === '71f10f3ec25532086f50343d63093a00e72db186ef2e33b65255616f082d200f'
  }

  get asV4(): {redeemId: v4.H256, redeemer: v4.AccountId32, vaultId: v4.VaultId, amount: bigint, fee: bigint, transferFee: bigint} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV6(): boolean {
    return this.ctx._chain.getEventHash('redeem.ExecuteRedeem') === 'd866cd3743541e2d758c4af7f6b19a93f53432d1e291ab5f972f51278e09e9be'
  }

  get asV6(): {redeemId: v6.H256, redeemer: v6.AccountId32, vaultId: v6.VaultId, amount: bigint, fee: bigint, transferFee: bigint} {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV15(): boolean {
    return this.ctx._chain.getEventHash('redeem.ExecuteRedeem') === '1add2e320d4e7879c83a5b61c78afbb40f3b06b1529861420c662d5e8f47074f'
  }

  get asV15(): {redeemId: v15.H256, redeemer: v15.AccountId32, vaultId: v15.VaultId, amount: bigint, fee: bigint, transferFee: bigint} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV17(): boolean {
    return this.ctx._chain.getEventHash('redeem.ExecuteRedeem') === 'd63793fdce1f0d01145e4515a95523737b88c284bd133a8238d7707855f20a21'
  }

  get asV17(): {redeemId: v17.H256, redeemer: v17.AccountId32, vaultId: v17.VaultId, amount: bigint, fee: bigint, transferFee: bigint} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {redeemId: v17.H256, redeemer: v17.AccountId32, vaultId: v17.VaultId, amount: bigint, fee: bigint, transferFee: bigint} {
    deprecateLatest()
    return this.asV17
  }
}

export class RedeemRedeemPeriodChangeEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'redeem.RedeemPeriodChange')
  }

  get isV16(): boolean {
    return this.ctx._chain.getEventHash('redeem.RedeemPeriodChange') === 'e4e1ffe21a95b5f4c933e4d40a2443e9cc2637c056d780de97e2e7ad5f6a7f59'
  }

  get asV16(): {period: number} {
    assert(this.isV16)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV16
  }

  get asLatest(): {period: number} {
    deprecateLatest()
    return this.asV16
  }
}

export class RedeemRequestRedeemEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'redeem.RequestRedeem')
  }

  get isV1(): boolean {
    return this.ctx._chain.getEventHash('redeem.RequestRedeem') === '81823d5f002d4abd37440214d62ca6d45cf6ac6c990c7ec75cdf943033cb1aa4'
  }

  get asV1(): [Uint8Array, Uint8Array, bigint, bigint, bigint, Uint8Array, v1.BtcAddress, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV3(): boolean {
    return this.ctx._chain.getEventHash('redeem.RequestRedeem') === '00f0390f090638413071af8a3513fa634f5bbd7998c02463b97c202d60cdebab'
  }

  get asV3(): [v3.H256, v3.AccountId32, bigint, bigint, bigint, v3.VaultId, v3.Address, bigint] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV4(): boolean {
    return this.ctx._chain.getEventHash('redeem.RequestRedeem') === '423aeee4c7ec57cfdce2842172b18028dc0e5a2872fad702678fab4f0fa3f6f4'
  }

  get asV4(): {redeemId: v4.H256, redeemer: v4.AccountId32, vaultId: v4.VaultId, amount: bigint, fee: bigint, premium: bigint, btcAddress: v4.Address, transferFee: bigint} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV6(): boolean {
    return this.ctx._chain.getEventHash('redeem.RequestRedeem') === 'e3bde9efd5b43fb6a668be1e1f03cf5597d32f17243cc0c8dc3caf80e9d481a7'
  }

  get asV6(): {redeemId: v6.H256, redeemer: v6.AccountId32, vaultId: v6.VaultId, amount: bigint, fee: bigint, premium: bigint, btcAddress: v6.Address, transferFee: bigint} {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV15(): boolean {
    return this.ctx._chain.getEventHash('redeem.RequestRedeem') === '4d144a1c040e0d84dc42a910a9062493a167635c8cc57caa9564f0944d4f1fd5'
  }

  get asV15(): {redeemId: v15.H256, redeemer: v15.AccountId32, vaultId: v15.VaultId, amount: bigint, fee: bigint, premium: bigint, btcAddress: v15.Address, transferFee: bigint} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV17(): boolean {
    return this.ctx._chain.getEventHash('redeem.RequestRedeem') === '90a5e843b2f541203e4741dc0f7e19b922501aae7a1358ea8926a4ab6207281a'
  }

  get asV17(): {redeemId: v17.H256, redeemer: v17.AccountId32, vaultId: v17.VaultId, amount: bigint, fee: bigint, premium: bigint, btcAddress: v17.Address, transferFee: bigint} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {redeemId: v17.H256, redeemer: v17.AccountId32, vaultId: v17.VaultId, amount: bigint, fee: bigint, premium: bigint, btcAddress: v17.Address, transferFee: bigint} {
    deprecateLatest()
    return this.asV17
  }
}

export class RefundExecuteRefundEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'refund.ExecuteRefund')
  }

  /**
   *  refund_id, issuer, vault, amount, fee
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('refund.ExecuteRefund') === 'a5dc8bda10a27e8070d75f51229df149f3485d4ec223fbdec3c9f1f1e95b2101'
  }

  /**
   *  refund_id, issuer, vault, amount, fee
   */
  get asV1(): [Uint8Array, Uint8Array, Uint8Array, bigint, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * refund_id, issuer, vault, amount, fee
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('refund.ExecuteRefund') === 'a1f3d32d29a387d7b9013ef2d1b13fea592053869403bfdb77f39e02178dbac0'
  }

  /**
   * refund_id, issuer, vault, amount, fee
   */
  get asV3(): [v3.H256, v3.AccountId32, v3.VaultId, bigint, bigint] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV4(): boolean {
    return this.ctx._chain.getEventHash('refund.ExecuteRefund') === '2c132655cffdfc25cb8e674859162c7c19af6fd57f9d0b2c28bbd8e2a28cfc96'
  }

  get asV4(): {refundId: v4.H256, issuer: v4.AccountId32, vaultId: v4.VaultId, amount: bigint, fee: bigint} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV6(): boolean {
    return this.ctx._chain.getEventHash('refund.ExecuteRefund') === '5307d86ae098aebf2ffe2d835bcf6c810a7f63f3918204d07245e2d61fef7286'
  }

  get asV6(): {refundId: v6.H256, issuer: v6.AccountId32, vaultId: v6.VaultId, amount: bigint, fee: bigint} {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV15(): boolean {
    return this.ctx._chain.getEventHash('refund.ExecuteRefund') === '94bc6f77689dd648726d95cd7f3205478aa99084d6afc894c75c0a2a5b010e7a'
  }

  get asV15(): {refundId: v15.H256, issuer: v15.AccountId32, vaultId: v15.VaultId, amount: bigint, fee: bigint} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV17(): boolean {
    return this.ctx._chain.getEventHash('refund.ExecuteRefund') === '94fee728180908c2c66a2421de1de144cc68556c47258a94f0ce5938f3b582a6'
  }

  get asV17(): {refundId: v17.H256, issuer: v17.AccountId32, vaultId: v17.VaultId, amount: bigint, fee: bigint} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {refundId: v17.H256, issuer: v17.AccountId32, vaultId: v17.VaultId, amount: bigint, fee: bigint} {
    deprecateLatest()
    return this.asV17
  }
}

export class RefundRequestRefundEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'refund.RequestRefund')
  }

  /**
   *  refund_id, issuer, amount_without_fee, vault, btc_address, issue_id, fee
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('refund.RequestRefund') === 'ed413badb4cd87f6a259310edd3b54d092b05b33452ff90edc880cbb9914be43'
  }

  /**
   *  refund_id, issuer, amount_without_fee, vault, btc_address, issue_id, fee
   */
  get asV1(): [Uint8Array, Uint8Array, bigint, Uint8Array, v1.BtcAddress, Uint8Array, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * refund_id, issuer, amount_without_fee, vault, btc_address, issue_id, fee, transfer_fee
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('refund.RequestRefund') === '0f79a5d0eef44e058d656d8bd600756f93b1bdf9f2d55608d3d45aaed652da82'
  }

  /**
   * refund_id, issuer, amount_without_fee, vault, btc_address, issue_id, fee, transfer_fee
   */
  get asV3(): [v3.H256, v3.AccountId32, bigint, v3.VaultId, v3.Address, v3.H256, bigint, bigint] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV4(): boolean {
    return this.ctx._chain.getEventHash('refund.RequestRefund') === 'bfb860ed9117ca9a41216457ae1d2e4a5ca16c6f9354be56bf692bc8559630bb'
  }

  get asV4(): {refundId: v4.H256, issuer: v4.AccountId32, amount: bigint, vaultId: v4.VaultId, btcAddress: v4.Address, issueId: v4.H256, fee: bigint, transferFee: bigint} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV6(): boolean {
    return this.ctx._chain.getEventHash('refund.RequestRefund') === '938eaa1668e8dedad5231eed40eb143b041df37e15f9e538ffc7cee3feca65de'
  }

  get asV6(): {refundId: v6.H256, issuer: v6.AccountId32, amount: bigint, vaultId: v6.VaultId, btcAddress: v6.Address, issueId: v6.H256, fee: bigint, transferFee: bigint} {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV15(): boolean {
    return this.ctx._chain.getEventHash('refund.RequestRefund') === 'e6581c6458a83c164c3a8c899a2d06bdb47c7ef1e436cc660d12424793eeb20b'
  }

  get asV15(): {refundId: v15.H256, issuer: v15.AccountId32, amount: bigint, vaultId: v15.VaultId, btcAddress: v15.Address, issueId: v15.H256, fee: bigint, transferFee: bigint} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV17(): boolean {
    return this.ctx._chain.getEventHash('refund.RequestRefund') === '77f94c96c50a3d1a974b0cbb518779a172d929745367f4e917ac7bfd71df8750'
  }

  get asV17(): {refundId: v17.H256, issuer: v17.AccountId32, amount: bigint, vaultId: v17.VaultId, btcAddress: v17.Address, issueId: v17.H256, fee: bigint, transferFee: bigint} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {refundId: v17.H256, issuer: v17.AccountId32, amount: bigint, vaultId: v17.VaultId, btcAddress: v17.Address, issueId: v17.H256, fee: bigint, transferFee: bigint} {
    deprecateLatest()
    return this.asV17
  }
}

export class SecurityUpdateActiveBlockEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'security.UpdateActiveBlock')
  }

  get isV1(): boolean {
    return this.ctx._chain.getEventHash('security.UpdateActiveBlock') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  get asV1(): number {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV4(): boolean {
    return this.ctx._chain.getEventHash('security.UpdateActiveBlock') === '7eefc4ef9a2f34cfee29738715aa72fe2a31ffd39b1d2a62f1cef547b70ed1fd'
  }

  get asV4(): {blockNumber: number} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV4
  }

  get asLatest(): {blockNumber: number} {
    deprecateLatest()
    return this.asV4
  }
}

export class TokensTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'tokens.Transfer')
  }

  /**
   *  Transfer succeeded. \[currency_id, from, to, value\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('tokens.Transfer') === '687592af47ed25da7cb1782c7d3ab850f2643203e3a3d46a2f3f2413ed94da71'
  }

  /**
   *  Transfer succeeded. \[currency_id, from, to, value\]
   */
  get asV1(): [v1.CurrencyId, Uint8Array, Uint8Array, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded. \[currency_id, from, to, value\]
   */
  get isV6(): boolean {
    return this.ctx._chain.getEventHash('tokens.Transfer') === 'fdaae151bb8b36a8d8ad740d8c981614f3554e661a6028bab9b8ca624adaac32'
  }

  /**
   * Transfer succeeded. \[currency_id, from, to, value\]
   */
  get asV6(): [v6.CurrencyId, v6.AccountId32, v6.AccountId32, bigint] {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV10(): boolean {
    return this.ctx._chain.getEventHash('tokens.Transfer') === 'b10834d910d905da35363fe42f3bbd9db5dfbc13064a482a7c8c57bb3c9a8e68'
  }

  /**
   * Transfer succeeded.
   */
  get asV10(): {currencyId: v10.CurrencyId, from: v10.AccountId32, to: v10.AccountId32, amount: bigint} {
    assert(this.isV10)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV15(): boolean {
    return this.ctx._chain.getEventHash('tokens.Transfer') === '41417e5ccc760096c9529f3ff9dcfe27e94b23a733432b671ed451e2ff362dcc'
  }

  /**
   * Transfer succeeded.
   */
  get asV15(): {currencyId: v15.CurrencyId, from: v15.AccountId32, to: v15.AccountId32, amount: bigint} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV17(): boolean {
    return this.ctx._chain.getEventHash('tokens.Transfer') === '7e7dbd0d1749f3d1ce62a6cb731a143be6c8c24d291fdd7dc24892ff941ffe3b'
  }

  /**
   * Transfer succeeded.
   */
  get asV17(): {currencyId: v17.CurrencyId, from: v17.AccountId32, to: v17.AccountId32, amount: bigint} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {currencyId: v17.CurrencyId, from: v17.AccountId32, to: v17.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV17
  }
}

export class VaultRegistryDecreaseLockedCollateralEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'vaultRegistry.DecreaseLockedCollateral')
  }

  get isV10(): boolean {
    return this.ctx._chain.getEventHash('vaultRegistry.DecreaseLockedCollateral') === 'be9cf79f2b95aaa0202d8d1315c938807e1b08b7c78db73bafafd265384acc68'
  }

  get asV10(): {currencyPair: v10.VaultCurrencyPair, delta: bigint, total: bigint} {
    assert(this.isV10)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV15(): boolean {
    return this.ctx._chain.getEventHash('vaultRegistry.DecreaseLockedCollateral') === '013307983c6902ec09af3b8afd9dc1ae6163a72a56585cec1235ec83322aedbb'
  }

  get asV15(): {currencyPair: v15.VaultCurrencyPair, delta: bigint, total: bigint} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV17(): boolean {
    return this.ctx._chain.getEventHash('vaultRegistry.DecreaseLockedCollateral') === '1b67d1d86e1332ee8bb03735b995c67676bbcedc0903eb4d04ca74c4d4a61280'
  }

  get asV17(): {currencyPair: v17.VaultCurrencyPair, delta: bigint, total: bigint} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {currencyPair: v17.VaultCurrencyPair, delta: bigint, total: bigint} {
    deprecateLatest()
    return this.asV17
  }
}

export class VaultRegistryIncreaseLockedCollateralEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'vaultRegistry.IncreaseLockedCollateral')
  }

  get isV10(): boolean {
    return this.ctx._chain.getEventHash('vaultRegistry.IncreaseLockedCollateral') === 'be9cf79f2b95aaa0202d8d1315c938807e1b08b7c78db73bafafd265384acc68'
  }

  get asV10(): {currencyPair: v10.VaultCurrencyPair, delta: bigint, total: bigint} {
    assert(this.isV10)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV15(): boolean {
    return this.ctx._chain.getEventHash('vaultRegistry.IncreaseLockedCollateral') === '013307983c6902ec09af3b8afd9dc1ae6163a72a56585cec1235ec83322aedbb'
  }

  get asV15(): {currencyPair: v15.VaultCurrencyPair, delta: bigint, total: bigint} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV17(): boolean {
    return this.ctx._chain.getEventHash('vaultRegistry.IncreaseLockedCollateral') === '1b67d1d86e1332ee8bb03735b995c67676bbcedc0903eb4d04ca74c4d4a61280'
  }

  get asV17(): {currencyPair: v17.VaultCurrencyPair, delta: bigint, total: bigint} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {currencyPair: v17.VaultCurrencyPair, delta: bigint, total: bigint} {
    deprecateLatest()
    return this.asV17
  }
}

export class VaultRegistryRegisterVaultEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'vaultRegistry.RegisterVault')
  }

  get isV1(): boolean {
    return this.ctx._chain.getEventHash('vaultRegistry.RegisterVault') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  get asV1(): [Uint8Array, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * vault_id, collateral, currency_id
   */
  get isV3(): boolean {
    return this.ctx._chain.getEventHash('vaultRegistry.RegisterVault') === '4a277edde21dc22e91d2dc0f66237b50fa032b22bbe1217a53b1d3b6a542455f'
  }

  /**
   * vault_id, collateral, currency_id
   */
  get asV3(): [v3.VaultId, bigint] {
    assert(this.isV3)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV4(): boolean {
    return this.ctx._chain.getEventHash('vaultRegistry.RegisterVault') === 'e7b0c0fa9c6583c77269fade548405e48dcd74c2d2936924cc4d69b586e89abf'
  }

  get asV4(): {vaultId: v4.VaultId, collateral: bigint} {
    assert(this.isV4)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV6(): boolean {
    return this.ctx._chain.getEventHash('vaultRegistry.RegisterVault') === '5904f13017c5e67059776b0b8a1753f7ef6b3058be145bf32edc2074727f0f31'
  }

  get asV6(): {vaultId: v6.VaultId, collateral: bigint} {
    assert(this.isV6)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV15(): boolean {
    return this.ctx._chain.getEventHash('vaultRegistry.RegisterVault') === '4cbc2ca3411358adf016c880b9989dfbc8726729eb8f2cc0de2e27a21b93ab8b'
  }

  get asV15(): {vaultId: v15.VaultId, collateral: bigint} {
    assert(this.isV15)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isV17(): boolean {
    return this.ctx._chain.getEventHash('vaultRegistry.RegisterVault') === 'f1a397e34fa2b35cf9f2efc2cd39d51e3a638ef819dd4554b3d4e5af26e5b4d1'
  }

  get asV17(): {vaultId: v17.VaultId, collateral: bigint} {
    assert(this.isV17)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV17
  }

  get asLatest(): {vaultId: v17.VaultId, collateral: bigint} {
    deprecateLatest()
    return this.asV17
  }
}
