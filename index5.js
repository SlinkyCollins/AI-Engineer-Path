// RESPONSES API intro
import OpenAI from "openai";
import { checkEnvironment } from "./utils.js";

// Initialize OpenAI client with environment variables
const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
  dangerouslyAllowBrowser: true,
});

checkEnvironment();

// Responses API request with a plain string input
const response = await openai.responses.create({
  model: process.env.AI_MODEL,
  input: "Give me gift suggestions for someone who likes hiphop music.",
});

console.log(response);