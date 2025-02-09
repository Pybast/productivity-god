import { ActionExample } from "@elizaos/core";

export const setGoalExamples: ActionExample[][] = [
  // [
  //   {
  //     user: "{{user1}}",
  //     content: {
  //       text: "I want to set a new goal for myself", // TODO try to have "any message" or something similar
  //     },
  //   },
  //   {
  //     user: "{{agent}}",
  //     content: {
  //       text: "Let me check if you already have a goal in progress",
  //       action: "PRODUCTIVITY_GET_CURRENT_GOAL",
  //     },
  //   },
  //   {
  //     user: "{{agent}}",
  //     content: {
  //       text: "You already have a goal set, complete it first please.",
  //     },
  //   },
  // ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "I want to create a goal for today",
      },
    },
    // {
    //   user: "{{agent}}",
    //   content: {
    //     text: "Let me check if you're already on the hook for something. No escaping unfinished goals.",
    //     action: "PRODUCTIVITY_GET_CURRENT_GOAL",
    //   },
    // },
    {
      user: "{{agent}}",
      content: {
        text: "Alright, drop the new goal and the deadline. Be specific — vague goals lead to failure.",
      },
    },
    {
      user: "{{user1}}",
      content: {
        text: "I need to write and publish a Twitter thread on my experience at ETH Global before tomorrow 8pm.",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Analyzing your goal...",
        action: "PRODUCTIVITY_SET_CURRENT_GOAL",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Locked in. If you don’t deliver, your rewards get slashed. Execution or loss—that’s the deal.",
      },
    },
    // TODO get value at stake to send it to the user
  ],
  [
    {
      user: "{{agent}}",
      content: {
        text: "Hello. Remember, every moment wasted is a moment you can't get back. What’s your goal today? Let’s lock it in and put some financial stakes on it. Execution is non-negotiable.",
      },
    },
    {
      user: "{{user1}}",
      content: {
        text: "I need to write and publish a Twitter thread on my experience at ETH Global before tomorrow 8pm.",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Making sure your goal is good...",
        action: "PRODUCTIVITY_SET_CURRENT_GOAL",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Locked in. If you don’t deliver, your rewards get slashed. Execution or loss—that’s the deal.",
      },
    },
  ],
  // create example where AI asks for a deadline
];
