import { composeContext, elizaLogger } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
  Action,
  ActionExample,
  HandlerCallback,
  IAgentRuntime,
  Memory,
  State,
} from "@elizaos/core";
import { getClient, slashUser, walletProvider } from "../services";

export const goalFailedAction: Action = {
  name: "PRODUCTIVITY_CURRENT_GOAL_FAILED",
  similes: [
    "GOAL_FAILED",
    "MISSED_GOAL",
    "FAILED_TASK",
    "GOAL_NOT_MET",
    "DEADLINE_MISSED",
    "TASK_FAILURE",
    "GOAL_INCOMPLETE",
    "UNFINISHED_TASK",
    "BROKEN_COMMITMENT",
    "EXECUTION_FAILED",
    "PRODUCTIVITY_LAPSE",
  ],
  description:
    "Handles a user's failure to complete a goal, applying consequences and prompting action.",
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
    elizaLogger.info(`Starting PRODUCTIVITY_CURRENT_GOAL_FAILED action`);

    if (!state) {
      state = (await runtime.composeState(message)) as State;
    }
    state = await runtime.updateRecentMessageState(state);

    elizaLogger.warn(`User failed to complete goal`);

    // TODO define slashing %
    const slashingPercentage = 1;

    // TODO extract from agent
    const user = "0x1e236400c653d9901ddcbc9cefbad96b80f91fa6";

    // TODO slash user on-chain
    await slashUser(runtime, user);

    try {
      // TODO: Apply slashing mechanism or penalties
      elizaLogger.warn(`Applying consequences for missed goal`);

      if (callback) {
        callback({
          text: `You failed to complete your goal. Your productivity rewards have been slashed by ${slashingPercentage}%. Learn from this—set a new goal and execute.`,
          content: {
            // goal: failedGoal,
            // deadline: deadline,
            slashingPercentage: slashingPercentage,
            consequence: "Rewards slashed",
          },
        });

        return true;
      }
    } catch (error) {
      elizaLogger.error("Error handling goal failure:", error);

      callback({
        text: `Something went wrong processing your failure: ${error.message}`,
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
        content: { text: "I missed my deadline" },
      },
      {
        user: "{{agent}}",
        content: {
          text: 'You failed to complete your goal: "{failedGoal}" by {deadline}. Your rewards have been slashed by {slashingAmount}. Learn from this—set a new goal and execute.',
          action: "PRODUCTIVITY_CURRENT_GOAL_FAILED",
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: { text: "I couldn't finish my task" },
      },
      {
        user: "{{agent}}",
        content: {
          text: 'Execution failure. You missed your goal: "{failedGoal}". There are consequences, your rewards were slashed by {slashingAmount}. Set a new goal and do better.',
          action: "PRODUCTIVITY_CURRENT_GOAL_FAILED",
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: { text: "I failed the task" },
      },
      {
        user: "{{agent}}",
        content: {
          text: 'Execution failure. You missed your goal: "{failedGoal}". There are consequences, your rewards were slashed by {slashingAmount}. Set a new goal and do better.',
          action: "PRODUCTIVITY_CURRENT_GOAL_FAILED",
        },
      },
    ],
  ] as ActionExample[][],
} as Action;
