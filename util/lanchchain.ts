import { Pinecone } from "@pinecone-database/pinecone";
import { getVectorStore } from "./vectorstore";
import { getPineconeClient } from "./pinecone-client";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";
import { streamingModel } from "./streamingModel";
import { QA_TEMPLATE, STANDALONE_QUESTION_TEMPLATE } from "./template";
import {
  StreamingTextResponse,
  LangChainStream,
  experimental_StreamData,
  COMPLEX_HEADER,
} from "ai";
import { nonStreamingModel } from "./nonStreamingModel";
import { string } from "zod";

interface callChainArgs {
  question: string;
  chatHistory: string;
  pdfId: string;
  userId: string;
}
export async function callChain({
  question,
  chatHistory,
  pdfId,
  userId,
}: callChainArgs) {
  try {
    const { stream, handlers } = LangChainStream({
      experimental_streamData: true,
    });
    // const data = new experimental_StreamData();
    const pineconeClient = await getPineconeClient();
    const vectorStore = await getVectorStore(pineconeClient);
    const chain = ConversationalRetrievalQAChain.fromLLM(
      streamingModel,
      vectorStore.asRetriever({
        filter: { userId: userId, pdfId: pdfId },
      }),
      {
        qaChainOptions: {
          prompt: PromptTemplate.fromTemplate(QA_TEMPLATE),
          verbose: true,
          type: "stuff",
        },
        returnSourceDocuments: true,
        questionGeneratorChainOptions: {
          template: STANDALONE_QUESTION_TEMPLATE,
          llm: nonStreamingModel,
        },
      }
    );

    chain
      .call(
        {
          question: question,
          chat_history: chatHistory,
        },
        [handlers]
      )
      .then(async (res) => {
        console.log(res);
        // const sourceDocuments = res?.sourceDocuments;
        // const firstTwoDocuments = sourceDocuments?.slice(0, 2);
        // const pageContents = firstTwoDocuments.map(
        //   ({ pageContent }: { pageContent: string }) => pageContent
        // );
        // data.append({
        //   text: pageContents,
        // });
        // data.append({ done: true });
        // data.close();
        // console.log(pageContents, "data");
      });

    return new StreamingTextResponse(
      stream,
      { status: 200, headers: { [COMPLEX_HEADER]: "true" } }
      // data
    );
  } catch (error) {
    console.log(error);
    return Response.json("Error from server");
  }
}
