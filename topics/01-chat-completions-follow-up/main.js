// CHAT COMPLETIONS API intro for user and assistant conversation with follow-up user message to refine suggestions based on the assistant's initial response
import { checkEnvironment } from "../../shared/utils.js"
import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL,
    dangerouslyAllowBrowser: true
})

checkEnvironment();

const messages = [
    {
        role: "user",
        content: "Suggest some gifts for someone who loves hiphop music. Make these suggestions thoughtful and practical. Your response must be under 100 words. Skip intros and conclusions. Only output gift suggestions."
    }
]

const firstResponse = await openai.chat.completions.create({
    model: process.env.AI_MODEL,
    messages
})

console.log(firstResponse.choices[0].message.content)
const firstAssistantMessage = firstResponse.choices[0].message
messages.push(firstAssistantMessage)

messages.push({
    role: "user",
    content: "More budget friendly. Less than $40."
})

const secondResponse = await openai.chat.completions.create({
    model: process.env.AI_MODEL,
    messages
})
console.log("Budget friendly suggestions:");
console.log(secondResponse.choices[0].message.content)