export const getNewGoalTemplate = `Respond with a JSON object containing the information for the user\'s goal'.
Extract the goal from the most recent message. If no single specific goal and deadline is provided, respond with an error.

The response must include:
- goal: The goal
- deadline: The deadline

Example response:
\`\`\`json
{
    "goal": "Write an email to my boss",
    "deadline": "2025-02-09T08:00Z"
}
\`\`\`
{{recentMessages}}
Extract the goal from the most recent message.
Respond with a JSON markdown block containing the goal.`;

// maybe handle the case where another goal is already tracked?

export const findGoalTemplate = `Find the goal that the user is currently referring and respond with a JSON object with the goal's informations.
Extract the goal from the most recent message and the ids of each pending goals from the goals provider. If no specific goal matches, respond with an error.
The id should be an integer.

The response must include:
- goal: The goal
- id: The ID of the goal

Example response:
\`\`\`json
{
    "goal": "Write an email to my boss",
    "id": "id"
}
\`\`\`
{{recentMessages}}
Extract the goal from the most recent message and the id from the goal provider.
Respond with a JSON markdown block containing the goal and id.`;
