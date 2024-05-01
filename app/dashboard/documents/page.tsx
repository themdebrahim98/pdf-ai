"use client";
import FileComponent from "@/components/FileComponent";
import UploadModal from "@/components/UploadModal";
import React, { useEffect, useState } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { AiOutlineFilePdf } from "react-icons/ai";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  selectPdfValue,
  selectUserValue,
} from "@/app/globalRedux/store";
import {
  LoadingState,
  fetchPDFs,
} from "@/app/globalRedux/features/user/pdfSlice";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
interface FileType {
  fileName: string;
  url: string;
}
function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [allFiles, setallFiles] = useState<any>([
    // { name: "abcd.pdf" },
    // { name: "abcd.pdf" },
    // { name: "abcd.pdf" },
  ]);
  const dispatch = useDispatch<AppDispatch>();
  const [pdfList, setPdfList] = useState<FileType[]>([]);
  const reduxStateValue = useSelector(selectUserValue);
  const reduxPdfValue = useSelector(selectPdfValue);

  const listRef = ref(storage, `resources/${reduxStateValue.user.uid}`);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // console.log("ok");
    dispatch(fetchPDFs(listRef));
  }, [dispatch]);

  if (reduxPdfValue.deleteError) {
    toast.error("Something went wrong");
    return;
  }
  if (reduxPdfValue.loadingDelete === LoadingState.Pending) {
    return <Loader />;
  }
  return (
    <div className=" w-full flex-1 ">
      <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 ">
        <h1 className="text-3xl text-left mb-8 font-semibold">
          Your Documents
        </h1>
        <div
          className={`flex justify-center mb-8 ${
            reduxPdfValue.pdfList.length <= 0 && " mt-32"
          } items-center flex-col`}
        >
          {pdfList.length <= 0 && (
            <>
              <div className="text-7xl">
                <AiOutlineFilePdf />
              </div>
              <span className="  text-x font-semibold">No PDF documents</span>
              <p className="mb-5">Get started by uploading new documents</p>
              <button
                onClick={toggleModal}
                className="flex items-center bg-orange-500 text-black font-bold py-3 px-6 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out"
              >
                <FaRegArrowAltCircleUp className="mr-2" />
                <span>Upload New Document</span>
              </button>
            </>
          )}
        </div>
        {/* If no files */}

        {isOpen && (
          <UploadModal
            isOpen={isOpen}
            toggleModal={toggleModal}
            setIsOpen={setIsOpen}
          />
        )}

        {reduxPdfValue.fetchError && ((<h1>Something went worng</h1>) as any)}
        {console.log(reduxPdfValue)}
        {reduxPdfValue.loadingFetch === LoadingState.Pending && <Loader />}
        {reduxPdfValue.loadingFetch === LoadingState.Fulfilled && (
          <div className="grid grid-cols-1 md:grid-cols-auto gap-8">
            {reduxPdfValue.pdfList.map((file: any, id: any) => {
              return (
                <FileComponent
                  key={id}
                  fileName={file.fileName}
                  onDelete={() => {
                    console.log("deleted");
                  }}
                  onEdit={() => {
                    console.log("edited");
                  }}
                  id={file.fileName.replace(/\.pdf(?!.*\.pdf)/, "")}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
