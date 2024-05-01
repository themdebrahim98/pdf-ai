export const getBuffer = async (req: Request) => {
  const formData = await req.formData();
  const fileUrl = formData.get("fileUrl") as string;
  const userName = formData.get("userName");
  const uid = formData.get("uid");
  const file = formData.get("pdfFile") as File;
  const pdfId = formData.get("pdfId");

  // const arrayBuffer = await file.arrayBuffer();
  // const buffer = Buffer.from(arrayBuffer);

  return { fileUrl, userName, uid, file, pdfId };

  // if (!file) {
  //   return Response.json("File Not found on server!");
  // }
  // return
  // const arrayBuffer = await file.arrayBuffer();
  // const buffer = Buffer.from(arrayBuffer);
  // return { buffer, file };
};
