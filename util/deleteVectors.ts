import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "@/util/config";

export const deleteVector = async () => {
  try {
    const pineconeClient = new Pinecone({
      apiKey: env.PINECONE_API_KEY,
      environment: env.PINECONE_ENVIRONMENT,
    });
    const index = pineconeClient.index(env.PINECONE_INDEX_NAME);
    await index.deleteAll();
    console.log("deleted");
  } catch (err) {
    console.log(err);
    throw err;
  }
};
