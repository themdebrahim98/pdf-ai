import { storage } from "@/app/firebase";
import { deleteVector } from "@/util/deleteVectors";
import { getPineconeClient } from "@/util/pinecone-client";
import { ref, deleteObject } from "firebase/storage";
const handler = async (req: Request, res: Response) => {
  try {
    const { userId, pdfName } = await req.json();
    //Vectors will be deleted in future
    //here
    //Vectors will be deleted in future
    //file deleted
    const desertRef = ref(storage, `resources/${userId}/${pdfName}`);
    await deleteObject(desertRef);
    console.log("file deleted");
    //file deleted
    return Response.json("File deleted", { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return Response.json(
      { message: "Something went wrong on server", error: error },
      { status: 500 }
    );
  }
};

export { handler as POST, handler as GET };
