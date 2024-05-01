interface User {
  userName: string | null;
  uid: string | null;
}
export const fileUpload = async (
  fileUrl: string,
  file: File,
  user: User,
  pdfId: string
) => {
  try {
    const formData = new FormData();
    formData.append("pdfFile", file);
    formData.append("fileUrl", fileUrl);
    formData.append("userName", user.userName as string);
    formData.append("uid", user.uid as string);
    formData.append("pdfId", pdfId);

    const res = await fetch("/api/fileupload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Something went wrong on server");
    }

    console.log("check");
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
