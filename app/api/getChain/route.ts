import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PromptTemplate } from "langchain/prompts";
import { BufferMemory } from "langchain/memory";
import { env } from "@/util/config";

const openAIApiKey = env.OPENAI_API_KEY;

const handler = async (req: Request) => {
  // Document loader
  const loader = new PDFLoader(`./public/resume.pdf`);
  const data = await loader.load();

  // Split Data
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splitDocs = await textSplitter.splitDocuments(data);

  //Vector Store
  const embeddings = new OpenAIEmbeddings({ openAIApiKey });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  //Retreaval

  const model = new ChatOpenAI({
    modelName: "gpt-4",
    openAIApiKey,
    streaming: true,
  });
  const template = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Always say "thanks for asking!" at the end of the answer.
{context}
Question: {question}
Helpful Answer:`;
  // Buffer Memory to keep chat history
  const memory = new BufferMemory({
    memoryKey: "chat_history",
    returnMessages: true,
  });
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    prompt: PromptTemplate.fromTemplate(template),
  });

  // const response = await chain.call({
  //   query: "who is the author of this pdf document?",
  // });
  // console.log(response);

  // const followupResult = await chain.call({
  //   query: "Who is author of this resume?",
  // });
  // console.log(followupResult);
  return Response.json(
    { message: "File reader running", chain: chain },
    { status: 200 }
  );
};

export { handler as GET, handler as POST };
