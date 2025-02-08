export const getCurrentWeatherTemplate = `Respond with a JSON object containing the information for the user\'s task'.
Extract the task from the most recent message. If no single specific task is provided, respond with an error.

The response must include:
- task: The task

Example response:
\`\`\`json
{
    "task": "Write an email to my boss before 10 am tomorrow"
}
\`\`\`
{{recentMessages}}
Extract the tasks from the most recent message.
Respond with a JSON markdown block containing the task.`;
