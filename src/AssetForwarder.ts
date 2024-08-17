import { ponder } from "@/generated";

ponder.on("AssetForwarder:CommunityPaused", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("AssetForwarder:DepositInfoUpdate", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on("AssetForwarder:FundsDeposited", async ({ event, context }) => {
  console.log(event.args);
});

ponder.on(
  "AssetForwarder:FundsDepositedWithMessage",
  async ({ event, context }) => {
    console.log(event.args);
  },
);
