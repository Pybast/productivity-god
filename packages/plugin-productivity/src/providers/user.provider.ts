import { Provider, IAgentRuntime, Memory, State } from "@elizaos/core";
import { db } from "../db";
import { tasksTable, usersTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { writeFileSync } from "fs";
import util from "util";
import { dappLink } from "../environment";

export const productivityUserProvider: Provider = {
  get: async (runtime: IAgentRuntime, message: Memory, state?: State) => {
    try {
      const user = (
        await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.telegram, state.senderName.toLowerCase()))
          .limit(1)
      )[0];

      if (user === undefined)
        return `This user has not connected to the dapp yet, we need to send him to ${dappLink}`;

      const tasks = await db
        .select()
        .from(tasksTable)
        .where(
          and(
            eq(tasksTable.userId, user.id),
            eq(tasksTable.status, "in progress")
          )
        );

      // Format comprehensive context
      return `
      Here are the "in progress" goals of the user
      ${tasks
        .filter((t) => t.status === "pending" && t.deadline > new Date())
        .map((t) => `  - ${t.description} - deadline: ${t.deadline}`)
        .join("\n")}

      Here are the "overdue" goals of this user, you should ask the user what is the progress for each of them
      ${tasks
        .filter((t) => t.status === "pending" && t.deadline <= new Date())
        .map((t) => `  - ${t.description} - deadline: ${t.deadline}`)
        .join("\n")}
      `.trim();
    } catch (error) {
      console.error("Provider error:", error);
      return "Context temporarily unavailable";
    }
  },
};
