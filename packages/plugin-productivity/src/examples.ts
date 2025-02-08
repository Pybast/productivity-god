import { ActionExample } from "@elizaos/core";

export const getMarsRoverExamples: ActionExample[][] = [
  [
    {
      user: "{{user1}}",
      content: {
        text: "I wonder what mars looks like today?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Let me fetch a picture from a mars rover.",
        action: "NASA_GET_MARS_ROVER_PHOTO",
      },
    },
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "Can you fetch a random picture of Mars?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Let me fetch a picture from a mars rover.",
        action: "NASA_GET_MARS_ROVER_PHOTO",
      },
    },
  ],
];

export const getAPODExamples: ActionExample[][] = [
  [
    {
      user: "{{user1}}",
      content: {
        text: "What's the nasa Astronomy picture of the day?",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Let me get the nasa image of the day.",
        action: "NASA_GET_APOD",
      },
    },
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "I love space.",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Oh really, then let me get the nasa image of the day to make your day even better.",
        action: "NASA_GET_APOD",
      },
    },
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "I am in love with space and space travel.",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Space is beautiful, dark, scary, and vast. Would you like to see a current photo of space from NASA?",
      },
    },
    {
      user: "{{user1}}",
      content: {
        text: "yes",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Here is the NASA Astronomy Picture of the Day.",
        action: "NASA_GET_APOD",
      },
    },
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "Space is beautiful, dark, scary, and unfathomably vast.",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Indeed! Would you like to see a current photo from the NASA astronomy database?",
      },
    },
    {
      user: "{{user1}}",
      content: {
        text: "yes",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Here is the NASA Astronomy Picture of the Day.",
        action: "NASA_GET_APOD",
      },
    },
  ],
  [
    {
      user: "{{user1}}",
      content: {
        text: "I'm a big fan of space and astronomy.",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Would you like to see the Nasa Astronomy Picture of the Day?",
      },
    },
    {
      user: "{{user1}}",
      content: {
        text: "yes",
      },
    },
    {
      user: "{{agent}}",
      content: {
        text: "Here is the NASA Astronomy Picture of the Day.",
        action: "NASA_GET_APOD",
      },
    },
  ],
];
