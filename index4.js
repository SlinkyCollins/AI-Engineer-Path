// STREAMING CHAT COMPLETIONS API intro
import OpenAI from "openai";
import { checkEnvironment } from "./utils.js";

checkEnvironment();

// Initialize an OpenAI client for your provider using env vars
const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
  dangerouslyAllowBrowser: true,
});

// Initialize messages array with system prompt
const messages = [
  {
    role: "system",
    content: `You are the Gift Genie!
    Make your gift suggestions thoughtful and practical.
    The user will describe the gift's recipient. 
    Your response must be under 100 words. 
    Skip intros and conclusions. 
    Only output gift suggestions.`,
  },
  {
    role: "user",
    content: "Suggest some gifts for someone who loves hiphop music",
  },
];

// Send a streaming chat completions request
const stream = await openai.chat.completions.create({
  model: process.env.AI_MODEL,
  messages,
  stream: true,
});

// Log each chunk in formatted JSON as it arrives
for await (const chunk of stream) {
  console.log(chunk.choices[0].delta.content);
}
