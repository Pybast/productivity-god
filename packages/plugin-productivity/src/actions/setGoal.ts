import { composeContext, elizaLogger } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
  Action,
  ActionExample,
  HandlerCallback,
  IAgentRuntime,
  Memory,
  ModelClass,
  State,
} from "@elizaos/core";
import { getNewGoalTemplate } from "../templates";
import { setGoalExamples } from "../examples/setGoal.example";
import { db } from "../db";
import { tasksTable, usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const setGoalAction: Action = {
  name: "PRODUCTIVITY_SET_CURRENT_GOAL",
  similes: [
    "SET_GOAL",
    "NEW_GOAL",
    "COMMIT_GOAL",
    "GOAL_SETTING",
    "DEFINE_OBJECTIVE",
    "LOCK_GOAL",
    "DECLARE_TARGET",
    "PLAN_EXECUTION",
    "SET_TASK",
    "GOAL_COMMITMENT",
    "PRODUCTIVITY_OBJECTIVE",
    "TASK_DEADLINE",
  ],
  description: "Set the current goal for a user given a task and a deadline",
  validate: async (runtime: IAgentRuntime) => {
    // await validateProductivityGodConfig(runtime);
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback: HandlerCallback
  ) => {
    elizaLogger.info(`Starting PRODUCTIVITY_SET_CURRENT_GOAL action`);

    // Initialize/update state
    if (!state) {
      state = (await runtime.composeState(message)) as State;
    }
    state = await runtime.updateRecentMessageState(state);

    elizaLogger.info(`state: ${JSON.stringify(state)}`);

    // state -> context
    const goalContext = composeContext({
      state,
      template: getNewGoalTemplate,
    });

    // context -> content
    const content = await generateMessageResponse({
      runtime,
      context: goalContext,
      modelClass: ModelClass.SMALL,
    });

    elizaLogger.info(
      `PRODUCTIVITY_SET_CURRENT_GOAL content is ${JSON.stringify(content)}`
    );

    // parse content
    const hasSpecificGoal =
      content?.goal && content?.deadline && !content?.error;

    elizaLogger.info(`has specific goal: ${hasSpecificGoal}`);

    if (!hasSpecificGoal) {
      return; // TODO handle the error
    }

    // Fetch weather & respond
    try {
      const _user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.telegram, state.senderName.toLowerCase()))
        .limit(1);

      if (!_user || _user?.length === 0) return;

      await db.insert(tasksTable).values({
        userId: _user[0].id,
        description: content.goal as string,
        status: "pending",
        deadline: content.deadline as number,
      });

      // TODO set goal in database
      elizaLogger.success(
        `Successfully set goal in database for ${content.goal}, ${content.deadline}`
      );

      if (callback) {
        callback({
          text: `Your goal was succesfully set, now go for it!`,
          content: content,
        });

        return true;
      }
    } catch (error) {
      elizaLogger.error("Error in GET_CURRENT_WEATHER handler:", error);

      callback({
        text: `Error fetching weather: ${error.message}`,
        content: { error: error.message },
      });

      return false;
    }

    return;
  },
  examples: setGoalExamples as ActionExample[][],
} as Action;
