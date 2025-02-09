import { Plugin } from "@elizaos/core";
import { setGoalAction } from "./actions/setGoal";

export * as actions from "./actions";

export const productivityGodPlugin: Plugin = {
  name: "productivity-god",
  description:
    "Productivity plugin for Eliza allowing tracking of user's goals and slashing of DeFi rewards in case of failure.",
  actions: [setGoalAction],
  evaluators: [],
  providers: [],
};
export default productivityGodPlugin;
