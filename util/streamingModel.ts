import { ChatOpenAI } from "langchain/chat_models/openai";
import { env } from "./config";
const streamingModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: env.OPENAI_API_KEY,
  streaming: true,
  maxTokens: -1,
  verbose: true,
});

export { streamingModel };
