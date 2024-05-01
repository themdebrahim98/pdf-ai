import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "./config";
import delay from "./delay";

let pineconeClientInstance: Pinecone | null = null;

// Create pineconeIndex if it doesn't exist
async function createIndex(client: Pinecone, indexName: string) {
  try {
    await client.createIndex({
      name: "my-index",
      dimension: 1536,
      metric: "cosine",
      pods: 1,
      replicas: 2,
      podType: "p1.x1",
    });
    console.log(
      `Waiting for ${env.INDEX_INIT_TIMEOUT} seconds for index initialization to complete...`
    );
    // await delay(env.INDEX_INIT_TIMEOUT);
    console.log("Index created !!");
  } catch (error) {
    console.error("error ", error);
    throw new Error("Index creation failed");
  }
}

// Initialize index and ready to be accessed.
async function initPineconeClient() {
  try {
    const pineconeClient = new Pinecone({
      apiKey: env.PINECONE_API_KEY,
      environment: env.PINECONE_ENVIRONMENT,
    });

    const indexName = env.PINECONE_INDEX_NAME;

    const existingIndexes = await pineconeClient.listIndexes();
    console.log(existingIndexes, "existing indexes");
    const allExistingIndexes = existingIndexes.map((elm) => elm.name);
    if (!allExistingIndexes.includes(indexName)) {
      createIndex(pineconeClient, indexName);
    } else {
      console.log("Your index already exists. nice !!");
    }

    return pineconeClient;
  } catch (error) {
    console.error("error", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

export async function getPineconeClient() {
  if (!pineconeClientInstance) {
    pineconeClientInstance = await initPineconeClient();
  }

  return pineconeClientInstance;
}
