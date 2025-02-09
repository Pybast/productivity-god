import { elizaLogger } from "@elizaos/core";
import {
  Action,
  ActionExample,
  HandlerCallback,
  IAgentRuntime,
  Memory,
  State,
} from "@elizaos/core";

export const goalSuccessAction: Action = {
  name: "PRODUCTIVITY_CURRENT_GOAL_SUCCESS",
  similes: [
    "GOAL_ACHIEVED",
    "TASK_COMPLETED",
    "GOAL_MET",
    "DEADLINE_HIT",
    "TASK_SUCCESS",
    "GOAL_SUCCESS",
    "MISSION_ACCOMPLISHED",
    "PRODUCTIVITY_WIN",
    "COMPLETION_SUCCESS",
    "EXECUTION_DONE",
  ],
  description:
    "Handles a user's successful completion of a goal, rewarding them and reinforcing discipline.",
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
    elizaLogger.info(`Starting PRODUCTIVITY_CURRENT_GOAL_SUCCESS action`);

    if (!state) {
      state = (await runtime.composeState(message)) as State;
    }
    state = await runtime.updateRecentMessageState(state);

    elizaLogger.info(`state: ${JSON.stringify(state)}`);

    elizaLogger.success(`User successfully completed goal`);

    try {
      // TODO: set successful goal in backend
      elizaLogger.success(`Rewarding user for completing goal`);

      if (callback) {
        callback({
          text: `Victory. You executed your goal: {completedGoal} before {deadline}. Your rewards were not slashed. Set your next challenge and keep winning.`,
          content: {
            // goal: completedGoal,
            // deadline: deadline,
            reward: "LP rewards unlocked",
          },
        });

        return true;
      }
    } catch (error) {
      elizaLogger.error("Error handling goal success:", error);

      callback({
        text: `Something went wrong processing your success: ${error.message}`,
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
        content: { text: "I finished my goal" },
      },
      {
        user: "{{agent}}",
        content: {
          text: 'Victory. You executed your goal: "{completedGoal}" before {deadline}. Your rewards are unlocked. Set your next challenge and keep winning.',
          action: "PRODUCTIVITY_CURRENT_GOAL_SUCCESS",
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: { text: "I did it! Task complete!" },
      },
      {
        user: "{{agent}}",
        content: {
          text: 'Execution complete. "{completedGoal}" was done before {deadline}. Your rewards are secured. Time to raise the bar—set a new goal.',
          action: "PRODUCTIVITY_CURRENT_GOAL_SUCCESS",
        },
      },
    ],
  ] as ActionExample[][],
} as Action;
