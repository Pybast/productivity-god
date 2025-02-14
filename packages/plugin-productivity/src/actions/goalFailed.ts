import { composeContext, elizaLogger, ModelClass } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
  Action,
  ActionExample,
  HandlerCallback,
  IAgentRuntime,
  Memory,
  State,
} from "@elizaos/core";
import { slashUser } from "../services";
import { findGoalTemplate } from "../templates";
import { db } from "../db";
import { tasksTable, usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

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

    // state -> context
    const goalContext = composeContext({
      state,
      template: findGoalTemplate,
    });

    // context -> content
    const content = await generateMessageResponse({
      runtime,
      context: goalContext,
      modelClass: ModelClass.SMALL,
    });

    const goalId = content?.id;

    if (goalId === undefined || parseInt(goalId as string) === undefined)
      return;

    const _goal = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.id, parseInt(goalId as string)))
      .limit(1);

    if (!_goal || _goal?.length === 0) return;

    await db
      .update(tasksTable)
      .set({ status: "done" })
      .where(eq(tasksTable.id, parseInt(goalId as string)));

    // TODO define slashing %
    const slashingPercentage = 1;

    const _user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.telegram, state.senderName.toLowerCase()))
      .limit(1);

    if (!_user || _user?.length === 0) return;

    // TODO extract from agent
    const user = _user[0].address;

    // TODO slash user on-chain
    const tx = await slashUser(runtime, user, slashingPercentage);

    try {
      // TODO: Apply slashing mechanism or penalties
      elizaLogger.warn(`Applying consequences for missed goal`);

      if (callback) {
        callback({
          text: `You failed to complete your goal. Your productivity rewards have been slashed by ${slashingPercentage}%. Learn from this—set a new goal and execute.\nHere is the slashing transaction: ${tx}`,
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
