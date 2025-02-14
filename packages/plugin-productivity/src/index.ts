import { Plugin } from "@elizaos/core";
import { setGoalAction } from "./actions/setGoal";
import { goalFailedAction } from "./actions/goalFailed";
import { goalSuccessAction } from "./actions/goalSuccess";
import { getValueAtStakeAction } from "./actions/getValueAtStake";
import { productivityUserProvider } from "./providers/user.provider";

export const productivityGodPlugin: Plugin = {
  name: "productivity-god",
  description:
    "Productivity plugin for Eliza allowing tracking of user's goals and slashing of DeFi rewards in case of failure.",
  actions: [
    setGoalAction,
    goalFailedAction,
    // goalSuccessAction,
    // getValueAtStakeAction,
  ],
  evaluators: [],
  providers: [productivityUserProvider],
};
export default productivityGodPlugin;
