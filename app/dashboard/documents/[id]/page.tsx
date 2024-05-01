"use client";
import { storage } from "@/app/firebase";
import { selectUserValue } from "@/app/globalRedux/store";
import Chat from "@/components/Chat";
import PDFViewer from "@/components/PdfViewer";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PdfViewerWithChat = ({ params }: { params: { id: string } }) => {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const reduxStateValue = useSelector(selectUserValue);

  useEffect(() => {
    const fileRef = ref(
      storage,
      `resources/${reduxStateValue.user.uid}/${params.id}.pdf`
    );

    getDownloadURL(fileRef)
      .then((url) => {
        setFileUrl(url);
      })
      .catch((err: any) => {
        console.log(err, "error downloading file URL from firebase");
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 flex-grow md:grid-rows-1 grid-rows-2">
      {/* Left column for PDF viewer */}
      <div className="overflow-y-scrol p-2 md:row-span-2 row-span-1  h-full ">
        <div className="h-full w-full">
          {error ? (
            <p className="bg-red-400 items-center">Error: {error}</p>
          ) : isLoading ? (
            <p>Loading...</p>
          ) : (
            <PDFViewer pdfUrl={fileUrl} />
          )}
        </div>
      </div>

      {/* Right column for chat application */}
      <div className="overflow-y-scrol p-2  ">
        <div className="h-full w-full">
          <Chat pdfId={params.id} />
        </div>
      </div>
    </div>
  );
};

export default PdfViewerWithChat;
