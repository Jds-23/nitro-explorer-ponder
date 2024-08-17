import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  FundsDeposited: p.createTable({
    id: p.string(),
    amount: p.bigint(),
    depositId: p.bigint(),
    depositor: p.string(),
    destAmount: p.bigint(),
    destChainIdBytes: p.string(),
    destToken: p.string(),
    partnerId: p.bigint(),
    recipient: p.string(),
    srcToken: p.string(),
    hash: p.string(),
  }),
  FundsPaid: p.createTable({
    id: p.string(),
    hash: p.string(),
    forwarder: p.string(),
    messageHash: p.string(),
    nonce: p.bigint(),
  }),
  Transfer: p.createTable({
    id: p.string(),
    srcId: p.string().references("FundsDeposited.id"),
    src: p.one("srcId"),
    destId: p.string().references("FundsDeposited.id").optional(),
    dest: p.one("destId"),
  }),
}));
