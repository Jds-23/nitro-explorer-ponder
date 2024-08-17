import { createConfig } from "@ponder/core";
import { http } from "viem";

import { AssetForwarderAbi } from "./abis/AssetForwarderAbi";

export default createConfig({
  networks: {
    arbitrum: {
      chainId: 42161,
      transport: http(process.env.PONDER_RPC_URL_42161),
    },
  },
  contracts: {
    AssetForwarder: {
      abi: AssetForwarderAbi,
      address: "0xEF300Fb4243a0Ff3b90C8cCfa1264D78182AdaA4",
      network: "arbitrum",
      startBlock: 167321449,
    },
  },
});
