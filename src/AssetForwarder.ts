import { ponder } from "@/generated";
import { bytesToHex, concatHex, encodeAbiParameters, isAddress, keccak256, padHex, parseAbiParameters, sliceHex, toBytes, toHex } from "viem";
import { stringToBytes32 } from "./utils";



ponder.on("AssetForwarder:CommunityPaused", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("AssetForwarder:DepositInfoUpdate", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("AssetForwarder:FundsDeposited", async ({ event, context }) => {
  const { FundsDeposited, Transfer } = context.db;

  // context.contracts.AssetForwarder.address
  const {
    amount,
    depositId,
    depositor,
    destAmount,
    destChainIdBytes,
    destToken,
    partnerId,
    recipient,
    srcToken
  } = event.args;
  //   bytes32 messageHash = keccak256(
  //     abi.encode(
  //         relayData.amount,
  //         relayData.srcChainId,
  //         relayData.depositId,
  //         relayData.destToken,
  //         relayData.recipient,
  //         address(this)
  //     )
  // );
  const srcChainIdBytes = stringToBytes32(context.network.chainId.toString());
  if (destToken === "0x") {
    return;
  }
  if (BigInt(29110) === depositId) {
    console.log([amount, srcChainIdBytes, depositId, destToken, recipient, "0x0Fa205c0446cD9EeDCc7538c9E24BC55AD08207f"])
  }
  const messageHash = keccak256(encodeAbiParameters(
    parseAbiParameters('uint256, bytes32, uint256, address, address, address'),
    [destAmount, srcChainIdBytes, depositId, destToken, recipient, "0x0Fa205c0446cD9EeDCc7538c9E24BC55AD08207f"]
  ))
  await FundsDeposited.create({
    id: `${context.network.chainId}-${depositId}`,
    data: {
      amount: amount,
      depositId,
      depositor,
      destAmount,
      destChainIdBytes,
      destToken,
      partnerId,
      recipient,
      srcToken,
      hash: event.transaction.hash
    }
  });
  await Transfer.create({
    id: messageHash,
    data: {
      srcId: `${context.network.chainId}-${depositId}`,
    }
  });
});

ponder.on("AssetForwarder:FundsPaid", async ({ event, context }) => {
  const { FundsPaid, Transfer } = context.db;

  const {
    forwarder,
    messageHash,
    nonce
  } = event.args;
  await FundsPaid.create({
    id: `${context.network.chainId}-${nonce}`,
    data: {
      forwarder,
      messageHash,
      nonce,
      hash: event.transaction.hash
    }
  });

  const transfer = await Transfer.findUnique({
    id: messageHash
  });
  if (!transfer) {
    return;
  }
  await Transfer.update({
    id: messageHash,
    data: {
      destId: `${context.network.chainId}-${nonce}`
    }
  });
});

ponder.on(
  "AssetForwarder:FundsDepositedWithMessage",
  async ({ event, context }) => {
    console.log(event.args);
  },
);
