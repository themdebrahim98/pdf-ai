import { ChatOpenAI } from "langchain/chat_models/openai";
import { env } from "./config";
const nonStreamingModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: env.OPENAI_API_KEY,
  temperature: 0,
});

export { nonStreamingModel };
