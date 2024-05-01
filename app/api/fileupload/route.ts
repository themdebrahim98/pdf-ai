import { pdfProcessingAndSaveAsVectoreStore } from "@/util/pdfProcessing";
import { getBuffer } from "@/util/uploadedBuffer";

const handler = async (req: Request) => {
  try {
    const { userName, uid, fileUrl, file, pdfId } = (await getBuffer(req)) as {
      userName: string;
      uid: string;
      fileUrl: string;
      file: File;
      pdfId: string;
    };
    await pdfProcessingAndSaveAsVectoreStore(
      fileUrl,
      userName,
      uid,
      file,
      pdfId
    );
    return Response.json(
      { message: "File uploaded and processed succsessfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return Response.json({ message: error.message }, { status: 500 });
  }
};

export { handler as GET, handler as POST };
