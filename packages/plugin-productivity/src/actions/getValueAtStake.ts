import { elizaLogger } from "@elizaos/core";
import {
  Action,
  ActionExample,
  HandlerCallback,
  IAgentRuntime,
  Memory,
  State,
} from "@elizaos/core";

export const getValueAtStakeAction: Action = {
  name: "PRODUCTIVITY_GET_VALUE_AT_STAKE",
  similes: [
    "CHECK_STAKE",
    "VALUE_AT_STAKE",
    "CHECK_REWARDS",
    "REWARD_BALANCE",
    "PENALTY_CHECK",
    "STAKED_AMOUNT",
    "SLASHED_AMOUNT",
    "PRODUCTIVITY_EARNINGS",
    "GET_PRODUCTIVITY_VALUE",
    "SEE_TOTAL_PROVIDED",
  ],
  description:
    "Fetches and displays the user's total provided value, reward amount, and slashed amount.",
  validate: async (runtime: IAgentRuntime) => {
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback: HandlerCallback
  ) => {
    elizaLogger.info(`Starting PRODUCTIVITY_GET_VALUE_AT_STAKE action`);

    if (!state) {
      state = (await runtime.composeState(message)) as State;
    }
    state = await runtime.updateRecentMessageState(state);

    elizaLogger.info(`state: ${JSON.stringify(state)}`);

    try {
      // TODO: Fetch actual on-chain values for the user

      const totalProvided = "1000 USDC"; // Example value
      const rewardAmount = "120 USDC"; // Example reward
      const slashedAmount = "30 USDC"; // Example penalty

      elizaLogger.info(
        `User's stake details - Total Provided: ${totalProvided}, Rewards: ${rewardAmount}, Slashed: ${slashedAmount}`
      );

      if (callback) {
        callback({
          text: `Here's your productivity stake breakdown:\n\n🏦 **Total Provided:** ${totalProvided}\n💰 **Earned Rewards:** ${rewardAmount}\n🔥 **Slashed Amount:** ${slashedAmount}\n\nExecute or pay—the choice is yours.`,
          content: {
            totalProvided,
            rewardAmount,
            slashedAmount,
          },
        });

        return true;
      }
    } catch (error) {
      elizaLogger.error("Error fetching value at stake:", error);

      callback({
        text: `Error fetching your stake details: ${error.message}`,
        content: { error: error.message },
      });

      return false;
    }

    return;
  },
  examples: [
    [
      {
        user: "{{user1}}",
        content: { text: "How much have I earned?" },
      },
      {
        user: "{{agent}}",
        content: {
          text: "Here's your productivity stake breakdown:\n\n🏦 **Total Provided:** {totalProvided}\n💰 **Earned Rewards:** {rewardAmount}\n🔥 **Slashed Amount:** {slashedAmount}\n\nExecute or pay—the choice is yours.",
          action: "PRODUCTIVITY_GET_VALUE_AT_STAKE",
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: { text: "Show me my stake details" },
      },
      {
        user: "{{agent}}",
        content: {
          text: "Here's your current stake status:\n🏦 **Total Provided:** {totalProvided}\n💰 **Rewards Earned:** {rewardAmount}\n🔥 **Slashed:** {slashedAmount}\n\nStay disciplined—maximize rewards, minimize losses.",
          action: "PRODUCTIVITY_GET_VALUE_AT_STAKE",
        },
      },
    ],
  ] as ActionExample[][],
} as Action;
