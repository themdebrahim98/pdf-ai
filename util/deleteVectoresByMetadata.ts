import { getPineconeClient } from "./pinecone-client";

export const deleteVectorsByMeteadata = async () => {
  const pineconeClient = await getPineconeClient();
  const index = pineconeClient.index("my-index");
  const ns = index.namespace("abc");
  // await index._deleteMany({
  //   deleteRequest: {
  //     filter: {
  //     genre: { $eq: "documentary" },
  //     year: 2019,
  //   }
  // });
};
