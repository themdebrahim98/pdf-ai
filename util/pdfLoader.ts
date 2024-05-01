import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
export async function getChunkedDocsFromPDF(
  fileUrl: any,
  userName: string,
  pdfId: string,
  uid: string
) {
  try {
    const loader = new PDFLoader(fileUrl);
    const data = (await loader.load()).map((doc) => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        userId: uid,
        pdfId: pdfId,
      },
    }));

    // Split Data
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(data);
    return splitDocs;
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }
}
