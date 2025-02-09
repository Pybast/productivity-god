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
