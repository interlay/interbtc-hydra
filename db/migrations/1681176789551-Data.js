module.exports = class Data1681176789551 {
    name = 'Data1681176789551'

    async up(db) {
        await db.query(`CREATE TABLE "height" ("id" character varying NOT NULL, "absolute" integer NOT NULL, "active" integer NOT NULL, CONSTRAINT "PK_90f1773799ae13708b533416960" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_fe03a1fb7b771bdb2e4bb27623" ON "height" ("absolute") `)
        await db.query(`CREATE TABLE "vault" ("id" character varying NOT NULL, "account_id" text NOT NULL, "collateral_token" jsonb NOT NULL, "wrapped_token" jsonb NOT NULL, "registration_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "registration_block_id" character varying, "last_activity_id" character varying, CONSTRAINT "PK_dd0898234c77f9d97585171ac59" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_da62235e5f15fa78c3afc5fb3e" ON "vault" ("account_id") `)
        await db.query(`CREATE INDEX "IDX_8d7190b650d4a59bb459e72706" ON "vault" ("registration_block_id") `)
        await db.query(`CREATE INDEX "IDX_ca61dd10e3a7f0aa434c56525b" ON "vault" ("last_activity_id") `)
        await db.query(`CREATE TABLE "relayed_block" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "backing_height" integer NOT NULL, "relayer" text, "relayed_at_height_id" character varying, CONSTRAINT "PK_d3476accc6d016e2c8d639be260" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_12490d1e2a4b809e7d7ab0012e" ON "relayed_block" ("relayed_at_height_id") `)
        await db.query(`CREATE INDEX "IDX_876c16842e82fda65927899ea6" ON "relayed_block" ("backing_height") `)
        await db.query(`CREATE TABLE "issue_period" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "value" integer NOT NULL, "height_id" character varying, CONSTRAINT "PK_acf83254351feaa72070b93855a" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_ca3b923e940fbe3c597ae306b4" ON "issue_period" ("height_id") `)
        await db.query(`CREATE TABLE "issue_payment" ("id" character varying NOT NULL, "btc_tx_id" text NOT NULL, "confirmations" integer NOT NULL, "block_height" integer, "amount" numeric NOT NULL, "issue_id" character varying NOT NULL, CONSTRAINT "REL_1f6fb49d1dd84a72aadace2d16" UNIQUE ("issue_id"), CONSTRAINT "PK_0cc9f8dc537ecf5fa4fbc49ab4d" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_1f6fb49d1dd84a72aadace2d16" ON "issue_payment" ("issue_id") `)
        await db.query(`CREATE TABLE "issue_execution" ("id" character varying NOT NULL, "amount_wrapped" numeric NOT NULL, "bridge_fee_wrapped" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "issue_id" character varying NOT NULL, "height_id" character varying, CONSTRAINT "REL_17af026c038d929c125077dd89" UNIQUE ("issue_id"), CONSTRAINT "PK_13ffeb07d7daefc867ab805e111" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_17af026c038d929c125077dd89" ON "issue_execution" ("issue_id") `)
        await db.query(`CREATE INDEX "IDX_3be4fef6a0445542a129fd77ea" ON "issue_execution" ("height_id") `)
        await db.query(`CREATE TABLE "issue_cancellation" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "issue_id" character varying NOT NULL, "height_id" character varying, CONSTRAINT "REL_7d5b640028a9cd5a6984fe7d9d" UNIQUE ("issue_id"), CONSTRAINT "PK_b10189e5800b6ee824138100f1e" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_7d5b640028a9cd5a6984fe7d9d" ON "issue_cancellation" ("issue_id") `)
        await db.query(`CREATE INDEX "IDX_5e4274015579c9823d8a6565e1" ON "issue_cancellation" ("height_id") `)
        await db.query(`CREATE TABLE "refund" ("id" character varying NOT NULL, "issue_id" character varying NOT NULL, "btc_address" text NOT NULL, "amount_paid" numeric NOT NULL, "btc_fee" numeric NOT NULL, "request_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "execution_timestamp" TIMESTAMP WITH TIME ZONE, "request_height_id" character varying, "execution_height_id" character varying, CONSTRAINT "REL_155f5e24f46ccf0389dd0a21d6" UNIQUE ("issue_id"), CONSTRAINT "PK_f1cefa2e60d99b206c46c1116e5" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_155f5e24f46ccf0389dd0a21d6" ON "refund" ("issue_id") `)
        await db.query(`CREATE INDEX "IDX_6f89ed2dbc4f9c865225bf2158" ON "refund" ("request_height_id") `)
        await db.query(`CREATE INDEX "IDX_f0f30338e4f262c6f988bb0480" ON "refund" ("execution_height_id") `)
        await db.query(`CREATE TABLE "issue" ("id" character varying NOT NULL, "request" jsonb NOT NULL, "griefing_collateral" numeric NOT NULL, "user_parachain_address" text NOT NULL, "vault_wallet_pubkey" text NOT NULL, "vault_backing_address" text NOT NULL, "status" character varying(15), "vault_id" character varying, "period_id" character varying, CONSTRAINT "PK_f80e086c249b9f3f3ff2fd321b7" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_b3dcd45bbb9a9459ab7eb1112d" ON "issue" ("vault_id") `)
        await db.query(`CREATE INDEX "IDX_acf83254351feaa72070b93855" ON "issue" ("period_id") `)
        await db.query(`CREATE INDEX "IDX_e7c81e44d6dd168bce123cc31e" ON "issue" ("status") `)
        await db.query(`CREATE TABLE "redeem_period" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "value" integer NOT NULL, "height_id" character varying, CONSTRAINT "PK_19baa2bc29c8e15a4f62d20ba08" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_6edb17bd1988bc14adc36cf74b" ON "redeem_period" ("height_id") `)
        await db.query(`CREATE TABLE "redeem_payment" ("id" character varying NOT NULL, "btc_tx_id" text NOT NULL, "confirmations" integer NOT NULL, "block_height" integer, "redeem_id" character varying NOT NULL, CONSTRAINT "REL_3cc79caec8511c7456001e1ec5" UNIQUE ("redeem_id"), CONSTRAINT "PK_20042e4b1f94c588a6ea2099d3d" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_3cc79caec8511c7456001e1ec5" ON "redeem_payment" ("redeem_id") `)
        await db.query(`CREATE TABLE "redeem_execution" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "redeem_id" character varying NOT NULL, "height_id" character varying, CONSTRAINT "REL_62e67fcde38dc7cb01ae90fa98" UNIQUE ("redeem_id"), CONSTRAINT "PK_566435fc3bd9966b7bcbda1cc21" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_62e67fcde38dc7cb01ae90fa98" ON "redeem_execution" ("redeem_id") `)
        await db.query(`CREATE INDEX "IDX_424eea20ecb35e74113197588b" ON "redeem_execution" ("height_id") `)
        await db.query(`CREATE TABLE "redeem_cancellation" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "slashed_collateral" numeric NOT NULL, "reimbursed" boolean NOT NULL, "redeem_id" character varying NOT NULL, "height_id" character varying, CONSTRAINT "REL_05f6e4f3c974c60fbd7ccb686d" UNIQUE ("redeem_id"), CONSTRAINT "PK_d1961c09cd40e1f2e8195cc9a46" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_05f6e4f3c974c60fbd7ccb686d" ON "redeem_cancellation" ("redeem_id") `)
        await db.query(`CREATE INDEX "IDX_c71906f269d1aeea9dd086f951" ON "redeem_cancellation" ("height_id") `)
        await db.query(`CREATE TABLE "redeem" ("id" character varying NOT NULL, "request" jsonb NOT NULL, "bridge_fee" numeric NOT NULL, "collateral_premium" numeric NOT NULL, "btc_transfer_fee" numeric NOT NULL, "user_parachain_address" text NOT NULL, "user_backing_address" text NOT NULL, "status" character varying(10), "vault_id" character varying, "period_id" character varying, CONSTRAINT "PK_49cd0f39502eb73258b6c51eeb4" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_21e0e6dce8bedbb39f5d38ff39" ON "redeem" ("vault_id") `)
        await db.query(`CREATE INDEX "IDX_19baa2bc29c8e15a4f62d20ba0" ON "redeem" ("period_id") `)
        await db.query(`CREATE TABLE "oracle_update" ("id" character varying NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "oracle_id" text NOT NULL, "type" character varying(13) NOT NULL, "type_key" jsonb, "update_value" numeric NOT NULL, "update_value_human" numeric NOT NULL, "height_id" character varying, CONSTRAINT "PK_198859007c7a88cb0b1e6f9234f" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_b98c119d788456a5f133024aa5" ON "oracle_update" ("height_id") `)
        await db.query(`CREATE TABLE "cumulative_volume" ("id" character varying NOT NULL, "type" character varying(12) NOT NULL, "till_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "amount" numeric NOT NULL, CONSTRAINT "PK_4cddeb1db9f5652b7f55e88e8d6" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "cumulative_volume_per_currency_pair" ("id" character varying NOT NULL, "type" character varying(12) NOT NULL, "till_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "amount" numeric NOT NULL, "amount_human" numeric NOT NULL, "wrapped_currency" jsonb, "collateral_currency" jsonb, CONSTRAINT "PK_b55d48297b58de0876411bb8f82" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "cumulative_dex_trading_volume_per_pool" ("id" character varying NOT NULL, "pool_id" text NOT NULL, "pool_type" character varying(8) NOT NULL, "till_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "amounts" jsonb NOT NULL, CONSTRAINT "PK_c9bb1ee57bff1390d948e3e6f12" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_bd6bc9a6ce9e1fcb81b0650c0f" ON "cumulative_dex_trading_volume_per_pool" ("pool_id") `)
        await db.query(`CREATE INDEX "IDX_a903319c2555960f188406a839" ON "cumulative_dex_trading_volume_per_pool" ("till_timestamp") `)
        await db.query(`CREATE TABLE "cumulative_dex_trading_volume_per_account" ("id" character varying NOT NULL, "account_id" text NOT NULL, "till_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "amounts" jsonb NOT NULL, CONSTRAINT "PK_014a93ec80c000241591ebb7d1e" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_d8cca4aa75481cbef78c0fabae" ON "cumulative_dex_trading_volume_per_account" ("account_id") `)
        await db.query(`CREATE INDEX "IDX_8d4d104d3fdda735ad959c7547" ON "cumulative_dex_trading_volume_per_account" ("till_timestamp") `)
        await db.query(`CREATE TABLE "cumulative_dex_trading_volume" ("id" character varying NOT NULL, "till_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "amounts" jsonb NOT NULL, CONSTRAINT "PK_283cec7156272ed6a2403934d6a" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_17d4754307c61f823d98896a11" ON "cumulative_dex_trading_volume" ("till_timestamp") `)
        await db.query(`CREATE TABLE "cumulative_dex_trade_count_per_account" ("id" character varying NOT NULL, "account_id" text NOT NULL, "till_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "count" numeric NOT NULL, CONSTRAINT "PK_3b45eb895406ab041f12f2965b3" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_f20b922f56a98fd0483e4ba0d6" ON "cumulative_dex_trade_count_per_account" ("account_id") `)
        await db.query(`CREATE INDEX "IDX_5f872c3cc3aa04df58b3288fd9" ON "cumulative_dex_trade_count_per_account" ("till_timestamp") `)
        await db.query(`CREATE TABLE "cumulative_dex_trade_count" ("id" character varying NOT NULL, "till_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "count" numeric NOT NULL, CONSTRAINT "PK_28f693c012e905438b6b1d80d77" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_4086e8663faeb3eabc1f8fb0ea" ON "cumulative_dex_trade_count" ("till_timestamp") `)
        await db.query(`CREATE TABLE "transfer" ("id" character varying NOT NULL, "token" jsonb NOT NULL, "amount" numeric NOT NULL, "amount_human" numeric NOT NULL, "from" text NOT NULL, "to" text NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "height_id" character varying, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_be54ea276e0f665ffc38630fc0" ON "transfer" ("from") `)
        await db.query(`CREATE INDEX "IDX_4cbc37e8c3b47ded161f44c24f" ON "transfer" ("to") `)
        await db.query(`CREATE INDEX "IDX_89d515806f93bf55c6dcc03c45" ON "transfer" ("height_id") `)
        await db.query(`CREATE TABLE "loan_market_activation" ("id" character varying NOT NULL, "token" jsonb NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "market_id" character varying NOT NULL, "height_id" character varying, CONSTRAINT "REL_c9596e4e44c3289adbc6c93ce8" UNIQUE ("market_id"), CONSTRAINT "PK_00c25b431b60a2154827eb4a76b" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_c9596e4e44c3289adbc6c93ce8" ON "loan_market_activation" ("market_id") `)
        await db.query(`CREATE INDEX "IDX_b47d7a0d7b2bbd82490a7010db" ON "loan_market_activation" ("height_id") `)
        await db.query(`CREATE TABLE "loan_market" ("id" character varying NOT NULL, "token" jsonb NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "borrow_cap" numeric NOT NULL, "supply_cap" numeric NOT NULL, "rate_model" jsonb NOT NULL, "close_factor" numeric NOT NULL, "lend_token_id" integer NOT NULL, "state" character varying(11) NOT NULL, "reserve_factor" numeric NOT NULL, "collateral_factor" numeric NOT NULL, "liquidate_incentive" numeric NOT NULL, "liquidation_threshold" numeric NOT NULL, "liquidate_incentive_reserved_factor" numeric NOT NULL, "currency_symbol" text NOT NULL, "height_id" character varying, CONSTRAINT "PK_e015c33030af7b9cabee542c80f" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_38be14a0f173998ffce0f785b8" ON "loan_market" ("height_id") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_20e4b93fc0a70cd45915b76ea8" ON "loan_market" ("lend_token_id") `)
        await db.query(`CREATE TABLE "loan" ("id" character varying NOT NULL, "token" jsonb NOT NULL, "user_parachain_address" text NOT NULL, "amount_borrowed" numeric, "amount_borrowed_usdt" numeric, "amount_borrowed_btc" numeric, "amount_repaid" numeric, "amount_repaid_usdt" numeric, "amount_repaid_btc" numeric, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "comment" text, "currency_symbol" text NOT NULL, "height_id" character varying, CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_9d91bd14c2c870581c9cf6cf5c" ON "loan" ("height_id") `)
        await db.query(`CREATE TABLE "deposit" ("id" character varying NOT NULL, "token" jsonb NOT NULL, "symbol" text NOT NULL, "user_parachain_address" text NOT NULL, "type" text NOT NULL, "amount_deposited" numeric, "amount_deposited_usdt" numeric, "amount_deposited_btc" numeric, "amount_withdrawn" numeric, "amount_withdrawn_usdt" numeric, "amount_withdrawn_btc" numeric, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "comment" text, "currency_symbol" text NOT NULL, "height_id" character varying, CONSTRAINT "PK_6654b4be449dadfd9d03a324b61" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_2737e86cc718982faf56d573df" ON "deposit" ("height_id") `)
        await db.query(`CREATE TABLE "interest_accrual" ("id" character varying NOT NULL, "underlying_currency" jsonb NOT NULL, "currency_symbol" text NOT NULL, "utilization_ratio" numeric NOT NULL, "borrow_rate" numeric NOT NULL, "supply_rate" numeric NOT NULL, "total_borrows" numeric NOT NULL, "total_reserves" numeric NOT NULL, "borrow_index" numeric NOT NULL, "total_borrows_native" numeric, "total_reserves_native" numeric, "borrow_index_native" numeric, "total_borrows_usdt" numeric, "total_reserves_usdt" numeric, "borrow_index_usdt" numeric, "borrow_rate_pct" numeric, "supply_rate_pct" numeric, "exchange_rate" numeric NOT NULL, "exchange_rate_float" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "comment" text, "height_id" character varying, CONSTRAINT "PK_04e314078a0862f6e560cb2f20d" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_694b7e3931d4a1aa01f067f0c4" ON "interest_accrual" ("height_id") `)
        await db.query(`CREATE TABLE "loan_liquidation" ("id" character varying NOT NULL, "amount_repaid" numeric NOT NULL, "amount_repaid_human" numeric NOT NULL, "amount_repaid_token" jsonb NOT NULL, "seized_collateral" numeric NOT NULL, "seized_collateral_human" numeric NOT NULL, "seized_collateral_token" jsonb NOT NULL, "liquidation_cost_btc" numeric NOT NULL, "liquidation_cost_usdt" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_b09b54780f862b217fdf64e885b" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "vault" ADD CONSTRAINT "FK_8d7190b650d4a59bb459e727062" FOREIGN KEY ("registration_block_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "vault" ADD CONSTRAINT "FK_ca61dd10e3a7f0aa434c56525b0" FOREIGN KEY ("last_activity_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "relayed_block" ADD CONSTRAINT "FK_12490d1e2a4b809e7d7ab0012ef" FOREIGN KEY ("relayed_at_height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "issue_period" ADD CONSTRAINT "FK_ca3b923e940fbe3c597ae306b4c" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "issue_payment" ADD CONSTRAINT "FK_1f6fb49d1dd84a72aadace2d167" FOREIGN KEY ("issue_id") REFERENCES "issue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "issue_execution" ADD CONSTRAINT "FK_17af026c038d929c125077dd89e" FOREIGN KEY ("issue_id") REFERENCES "issue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "issue_execution" ADD CONSTRAINT "FK_3be4fef6a0445542a129fd77eab" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "issue_cancellation" ADD CONSTRAINT "FK_7d5b640028a9cd5a6984fe7d9d2" FOREIGN KEY ("issue_id") REFERENCES "issue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "issue_cancellation" ADD CONSTRAINT "FK_5e4274015579c9823d8a6565e14" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "refund" ADD CONSTRAINT "FK_155f5e24f46ccf0389dd0a21d62" FOREIGN KEY ("issue_id") REFERENCES "issue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "refund" ADD CONSTRAINT "FK_6f89ed2dbc4f9c865225bf2158c" FOREIGN KEY ("request_height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "refund" ADD CONSTRAINT "FK_f0f30338e4f262c6f988bb04806" FOREIGN KEY ("execution_height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_b3dcd45bbb9a9459ab7eb1112d2" FOREIGN KEY ("vault_id") REFERENCES "vault"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "issue" ADD CONSTRAINT "FK_acf83254351feaa72070b93855a" FOREIGN KEY ("period_id") REFERENCES "issue_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "redeem_period" ADD CONSTRAINT "FK_6edb17bd1988bc14adc36cf74b9" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "redeem_payment" ADD CONSTRAINT "FK_3cc79caec8511c7456001e1ec5e" FOREIGN KEY ("redeem_id") REFERENCES "redeem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "redeem_execution" ADD CONSTRAINT "FK_62e67fcde38dc7cb01ae90fa987" FOREIGN KEY ("redeem_id") REFERENCES "redeem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "redeem_execution" ADD CONSTRAINT "FK_424eea20ecb35e74113197588be" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "redeem_cancellation" ADD CONSTRAINT "FK_05f6e4f3c974c60fbd7ccb686dd" FOREIGN KEY ("redeem_id") REFERENCES "redeem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "redeem_cancellation" ADD CONSTRAINT "FK_c71906f269d1aeea9dd086f9512" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "redeem" ADD CONSTRAINT "FK_21e0e6dce8bedbb39f5d38ff39e" FOREIGN KEY ("vault_id") REFERENCES "vault"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "redeem" ADD CONSTRAINT "FK_19baa2bc29c8e15a4f62d20ba08" FOREIGN KEY ("period_id") REFERENCES "redeem_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "oracle_update" ADD CONSTRAINT "FK_b98c119d788456a5f133024aa57" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_89d515806f93bf55c6dcc03c45b" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "loan_market_activation" ADD CONSTRAINT "FK_c9596e4e44c3289adbc6c93ce83" FOREIGN KEY ("market_id") REFERENCES "loan_market"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "loan_market_activation" ADD CONSTRAINT "FK_b47d7a0d7b2bbd82490a7010db1" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "loan_market" ADD CONSTRAINT "FK_38be14a0f173998ffce0f785b8f" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "loan" ADD CONSTRAINT "FK_9d91bd14c2c870581c9cf6cf5cf" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "deposit" ADD CONSTRAINT "FK_2737e86cc718982faf56d573dfb" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "interest_accrual" ADD CONSTRAINT "FK_694b7e3931d4a1aa01f067f0c4c" FOREIGN KEY ("height_id") REFERENCES "height"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "height"`)
        await db.query(`DROP INDEX "public"."IDX_fe03a1fb7b771bdb2e4bb27623"`)
        await db.query(`DROP TABLE "vault"`)
        await db.query(`DROP INDEX "public"."IDX_da62235e5f15fa78c3afc5fb3e"`)
        await db.query(`DROP INDEX "public"."IDX_8d7190b650d4a59bb459e72706"`)
        await db.query(`DROP INDEX "public"."IDX_ca61dd10e3a7f0aa434c56525b"`)
        await db.query(`DROP TABLE "relayed_block"`)
        await db.query(`DROP INDEX "public"."IDX_12490d1e2a4b809e7d7ab0012e"`)
        await db.query(`DROP INDEX "public"."IDX_876c16842e82fda65927899ea6"`)
        await db.query(`DROP TABLE "issue_period"`)
        await db.query(`DROP INDEX "public"."IDX_ca3b923e940fbe3c597ae306b4"`)
        await db.query(`DROP TABLE "issue_payment"`)
        await db.query(`DROP INDEX "public"."IDX_1f6fb49d1dd84a72aadace2d16"`)
        await db.query(`DROP TABLE "issue_execution"`)
        await db.query(`DROP INDEX "public"."IDX_17af026c038d929c125077dd89"`)
        await db.query(`DROP INDEX "public"."IDX_3be4fef6a0445542a129fd77ea"`)
        await db.query(`DROP TABLE "issue_cancellation"`)
        await db.query(`DROP INDEX "public"."IDX_7d5b640028a9cd5a6984fe7d9d"`)
        await db.query(`DROP INDEX "public"."IDX_5e4274015579c9823d8a6565e1"`)
        await db.query(`DROP TABLE "refund"`)
        await db.query(`DROP INDEX "public"."IDX_155f5e24f46ccf0389dd0a21d6"`)
        await db.query(`DROP INDEX "public"."IDX_6f89ed2dbc4f9c865225bf2158"`)
        await db.query(`DROP INDEX "public"."IDX_f0f30338e4f262c6f988bb0480"`)
        await db.query(`DROP TABLE "issue"`)
        await db.query(`DROP INDEX "public"."IDX_b3dcd45bbb9a9459ab7eb1112d"`)
        await db.query(`DROP INDEX "public"."IDX_acf83254351feaa72070b93855"`)
        await db.query(`DROP INDEX "public"."IDX_e7c81e44d6dd168bce123cc31e"`)
        await db.query(`DROP TABLE "redeem_period"`)
        await db.query(`DROP INDEX "public"."IDX_6edb17bd1988bc14adc36cf74b"`)
        await db.query(`DROP TABLE "redeem_payment"`)
        await db.query(`DROP INDEX "public"."IDX_3cc79caec8511c7456001e1ec5"`)
        await db.query(`DROP TABLE "redeem_execution"`)
        await db.query(`DROP INDEX "public"."IDX_62e67fcde38dc7cb01ae90fa98"`)
        await db.query(`DROP INDEX "public"."IDX_424eea20ecb35e74113197588b"`)
        await db.query(`DROP TABLE "redeem_cancellation"`)
        await db.query(`DROP INDEX "public"."IDX_05f6e4f3c974c60fbd7ccb686d"`)
        await db.query(`DROP INDEX "public"."IDX_c71906f269d1aeea9dd086f951"`)
        await db.query(`DROP TABLE "redeem"`)
        await db.query(`DROP INDEX "public"."IDX_21e0e6dce8bedbb39f5d38ff39"`)
        await db.query(`DROP INDEX "public"."IDX_19baa2bc29c8e15a4f62d20ba0"`)
        await db.query(`DROP TABLE "oracle_update"`)
        await db.query(`DROP INDEX "public"."IDX_b98c119d788456a5f133024aa5"`)
        await db.query(`DROP TABLE "cumulative_volume"`)
        await db.query(`DROP TABLE "cumulative_volume_per_currency_pair"`)
        await db.query(`DROP TABLE "cumulative_dex_trading_volume_per_pool"`)
        await db.query(`DROP INDEX "public"."IDX_bd6bc9a6ce9e1fcb81b0650c0f"`)
        await db.query(`DROP INDEX "public"."IDX_a903319c2555960f188406a839"`)
        await db.query(`DROP TABLE "cumulative_dex_trading_volume_per_account"`)
        await db.query(`DROP INDEX "public"."IDX_d8cca4aa75481cbef78c0fabae"`)
        await db.query(`DROP INDEX "public"."IDX_8d4d104d3fdda735ad959c7547"`)
        await db.query(`DROP TABLE "cumulative_dex_trading_volume"`)
        await db.query(`DROP INDEX "public"."IDX_17d4754307c61f823d98896a11"`)
        await db.query(`DROP TABLE "cumulative_dex_trade_count_per_account"`)
        await db.query(`DROP INDEX "public"."IDX_f20b922f56a98fd0483e4ba0d6"`)
        await db.query(`DROP INDEX "public"."IDX_5f872c3cc3aa04df58b3288fd9"`)
        await db.query(`DROP TABLE "cumulative_dex_trade_count"`)
        await db.query(`DROP INDEX "public"."IDX_4086e8663faeb3eabc1f8fb0ea"`)
        await db.query(`DROP TABLE "transfer"`)
        await db.query(`DROP INDEX "public"."IDX_be54ea276e0f665ffc38630fc0"`)
        await db.query(`DROP INDEX "public"."IDX_4cbc37e8c3b47ded161f44c24f"`)
        await db.query(`DROP INDEX "public"."IDX_89d515806f93bf55c6dcc03c45"`)
        await db.query(`DROP TABLE "loan_market_activation"`)
        await db.query(`DROP INDEX "public"."IDX_c9596e4e44c3289adbc6c93ce8"`)
        await db.query(`DROP INDEX "public"."IDX_b47d7a0d7b2bbd82490a7010db"`)
        await db.query(`DROP TABLE "loan_market"`)
        await db.query(`DROP INDEX "public"."IDX_38be14a0f173998ffce0f785b8"`)
        await db.query(`DROP INDEX "public"."IDX_20e4b93fc0a70cd45915b76ea8"`)
        await db.query(`DROP TABLE "loan"`)
        await db.query(`DROP INDEX "public"."IDX_9d91bd14c2c870581c9cf6cf5c"`)
        await db.query(`DROP TABLE "deposit"`)
        await db.query(`DROP INDEX "public"."IDX_2737e86cc718982faf56d573df"`)
        await db.query(`DROP TABLE "interest_accrual"`)
        await db.query(`DROP INDEX "public"."IDX_694b7e3931d4a1aa01f067f0c4"`)
        await db.query(`DROP TABLE "loan_liquidation"`)
        await db.query(`ALTER TABLE "vault" DROP CONSTRAINT "FK_8d7190b650d4a59bb459e727062"`)
        await db.query(`ALTER TABLE "vault" DROP CONSTRAINT "FK_ca61dd10e3a7f0aa434c56525b0"`)
        await db.query(`ALTER TABLE "relayed_block" DROP CONSTRAINT "FK_12490d1e2a4b809e7d7ab0012ef"`)
        await db.query(`ALTER TABLE "issue_period" DROP CONSTRAINT "FK_ca3b923e940fbe3c597ae306b4c"`)
        await db.query(`ALTER TABLE "issue_payment" DROP CONSTRAINT "FK_1f6fb49d1dd84a72aadace2d167"`)
        await db.query(`ALTER TABLE "issue_execution" DROP CONSTRAINT "FK_17af026c038d929c125077dd89e"`)
        await db.query(`ALTER TABLE "issue_execution" DROP CONSTRAINT "FK_3be4fef6a0445542a129fd77eab"`)
        await db.query(`ALTER TABLE "issue_cancellation" DROP CONSTRAINT "FK_7d5b640028a9cd5a6984fe7d9d2"`)
        await db.query(`ALTER TABLE "issue_cancellation" DROP CONSTRAINT "FK_5e4274015579c9823d8a6565e14"`)
        await db.query(`ALTER TABLE "refund" DROP CONSTRAINT "FK_155f5e24f46ccf0389dd0a21d62"`)
        await db.query(`ALTER TABLE "refund" DROP CONSTRAINT "FK_6f89ed2dbc4f9c865225bf2158c"`)
        await db.query(`ALTER TABLE "refund" DROP CONSTRAINT "FK_f0f30338e4f262c6f988bb04806"`)
        await db.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_b3dcd45bbb9a9459ab7eb1112d2"`)
        await db.query(`ALTER TABLE "issue" DROP CONSTRAINT "FK_acf83254351feaa72070b93855a"`)
        await db.query(`ALTER TABLE "redeem_period" DROP CONSTRAINT "FK_6edb17bd1988bc14adc36cf74b9"`)
        await db.query(`ALTER TABLE "redeem_payment" DROP CONSTRAINT "FK_3cc79caec8511c7456001e1ec5e"`)
        await db.query(`ALTER TABLE "redeem_execution" DROP CONSTRAINT "FK_62e67fcde38dc7cb01ae90fa987"`)
        await db.query(`ALTER TABLE "redeem_execution" DROP CONSTRAINT "FK_424eea20ecb35e74113197588be"`)
        await db.query(`ALTER TABLE "redeem_cancellation" DROP CONSTRAINT "FK_05f6e4f3c974c60fbd7ccb686dd"`)
        await db.query(`ALTER TABLE "redeem_cancellation" DROP CONSTRAINT "FK_c71906f269d1aeea9dd086f9512"`)
        await db.query(`ALTER TABLE "redeem" DROP CONSTRAINT "FK_21e0e6dce8bedbb39f5d38ff39e"`)
        await db.query(`ALTER TABLE "redeem" DROP CONSTRAINT "FK_19baa2bc29c8e15a4f62d20ba08"`)
        await db.query(`ALTER TABLE "oracle_update" DROP CONSTRAINT "FK_b98c119d788456a5f133024aa57"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_89d515806f93bf55c6dcc03c45b"`)
        await db.query(`ALTER TABLE "loan_market_activation" DROP CONSTRAINT "FK_c9596e4e44c3289adbc6c93ce83"`)
        await db.query(`ALTER TABLE "loan_market_activation" DROP CONSTRAINT "FK_b47d7a0d7b2bbd82490a7010db1"`)
        await db.query(`ALTER TABLE "loan_market" DROP CONSTRAINT "FK_38be14a0f173998ffce0f785b8f"`)
        await db.query(`ALTER TABLE "loan" DROP CONSTRAINT "FK_9d91bd14c2c870581c9cf6cf5cf"`)
        await db.query(`ALTER TABLE "deposit" DROP CONSTRAINT "FK_2737e86cc718982faf56d573dfb"`)
        await db.query(`ALTER TABLE "interest_accrual" DROP CONSTRAINT "FK_694b7e3931d4a1aa01f067f0c4c"`)
    }
}
