import { callChain } from "@/util/lanchchain";
import { Message } from "ai";
export const runtime = "edge";
const formatMessage = (message: Message) => {
  return `${message.role === "user" ? "Human" : "Assistant"} : ${
    message.content
  } `;
};
const handler = async (req: Request) => {
  try {
    const body = await req.json();
    const { pdfId, userId, userName } = body;

    const messages = body.messages || [];
    const formattedPrevMessages = messages.slice(0, -1).map(formatMessage);
    const question = messages[messages.length - 1].content;
    if (!question) {
      return Response.json("Error: No question on the request", {
        status: 400,
      });
    }
    const streamingTextResponse = callChain({
      question: question,
      chatHistory: formattedPrevMessages.join("\n"),
      pdfId,
      userId,
    });
    // console.log(res, "getans");
    return streamingTextResponse;
  } catch (error: any) {
    console.log(error.message);
    return Response.json("Error: Something went wrong on server", {
      status: 500,
    });
  }
};

export { handler as POST, handler as GET };
