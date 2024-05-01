import { getChunkedDocsFromPDF } from "@/util/pdfLoader";
import { getPineconeClient } from "@/util/pinecone-client";
import { embedAndStoreDocs } from "@/util/vectorstore";
let vectorStore: any;
export const pdfProcessingAndSaveAsVectoreStore = async (
  fileUrl: any,
  userName: string,
  uid: string,
  file: File,
  pdfId: string
) => {
  try {
    console.log("Getting pinecone client");
    const pineconeClient = await getPineconeClient();
    console.log("Preparing chunks from PDF file");
    const docs = await getChunkedDocsFromPDF(file, userName, pdfId, uid);
    console.log(`Loading ${docs.length} chunks into pinecone...`);
    await embedAndStoreDocs(pineconeClient, docs);
    console.log("Data embedded and stored in pine-cone index");
  } catch (error: any) {
    console.error("Init client script failed ", error);
    throw new Error(error.message);
  }
};
