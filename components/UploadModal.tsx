"use client";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { fileUpload } from "@/util/pdfUpload";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserValue } from "@/app/globalRedux/store";
import { v4 as uuidv4, v4 } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/app/firebase";
import delay from "@/util/delay";
interface UploadModalProps {
  isOpen: boolean;
  setIsOpen: any;
  toggleModal: () => void;
}

const UploadModal = ({ isOpen, toggleModal, setIsOpen }: UploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isuploading, setisuploading] = useState<boolean>(false);
  const [noOfProcessCompleted, setnoOfProcessCompleted] = useState<number>(0);

  const router = useRouter();
  const reduxStateValue = useSelector(selectUserValue);
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    console.log(file);
  };

  const onOptionChange = (option: string) => {
    let updatedOptions: string[] = [...selectedOptions];

    if (updatedOptions.includes(option)) {
      updatedOptions = updatedOptions.filter((item) => item !== option);
    } else {
      updatedOptions.push(option);
    }

    setSelectedOptions(updatedOptions);
  };

  const onUploadClick = async () => {
    if (!selectedFile) {
      alert("Please select file");
      return;
    }
    // simulateFileUpload();
    try {
      const randomId = v4();
      if (selectedFile) {
        setisuploading(true);
        const path = `resources/${reduxStateValue.user.uid}/${selectedFile.name}-${randomId}.pdf`;
        const fileRef = ref(storage, path);
        const timestamp = new Date().getTime(); // Get the current timestamp
        const metadata = {
          customMetadata: {
            timestamp: timestamp.toString(), // Convert timestamp to string and add it to metadata
          },
        };
        const uploadTask = uploadBytesResumable(
          fileRef,
          selectedFile,
          metadata
        );
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploadsc
            console.log(error);
          },
          async () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("File available at", downloadURL);
                setnoOfProcessCompleted(1);
                setUploadProgress(50);
                try {
                  console.log("waiting");
                  await fileUpload(
                    downloadURL,
                    selectedFile,
                    {
                      userName: reduxStateValue.user.userName,
                      uid: reduxStateValue.user.uid,
                    },
                    selectedFile.name + "-" + randomId
                  );
                  console.log("completed");

                  setUploadProgress(100);
                  setnoOfProcessCompleted(2);
                  await delay(2000);
                  toast.success("Uploaded succsessfully!");
                  setisuploading(false);
                  setSelectedFile(null);
                  setIsOpen(false);
                  setnoOfProcessCompleted(0);
                  toggleModal();
                  setUploadProgress(0);
                  router.push(
                    `/dashboard/documents/${selectedFile.name + "-" + randomId}`
                  );

                  // router.push(`/dashboard/documents/${uuid}`);
                } catch (err) {
                  deleteObject(fileRef)
                    .then(() => {
                      console.log("file deleetd succsessfully");
                      toast.error("PDF processed failed!");
                      setisuploading(false);
                      setSelectedFile(null);
                      setIsOpen(false);
                      setnoOfProcessCompleted(0);
                      toggleModal();
                      setUploadProgress(0);
                    })
                    .catch(() => {
                      console.log("not file deleted");
                    });
                  console.log(err);
                  console.log("failed to upload on server");
                }
              }
            );
          }
        );

        // const res = await fileUpload(selectedFile, {
        //   userName: reduxStateValue.user.userName,
        //   uid: reduxStateValue.user.uid,
        // });
        // const body = await res.json();
        // console.log(body);
        // if (res.ok) {
        //   toast.success("Uploaded succsessfully!");
        //   setisuploading(false);
        //   setIsOpen(false);
        //   router.push(`/dashboard/documents/${body.uuid}`);
      } else {
        toast.error("File not uploaded!");
        setisuploading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const notify = () => toast("Uploaded Succsessfully!");
  return (
    <div>
      {/* Modal */}
      <div>
        <ToastContainer />
      </div>
      {isOpen && (
        <div className="center mb-8 ">
          <div className="relative w-full max-w-xl my-6 p-2">
            <div className="bg-white rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-start justify-between p-5 ">
                <h3 className="text-xl font-semibold">Upload Document</h3>
                <button
                  onClick={toggleModal}
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                >
                  <span>×</span>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">
                <label
                  htmlFor="fileInput"
                  className="flex items-center justify-center border border-dashed border-gray-300 rounded-md cursor-pointer h-36"
                >
                  {selectedFile ? (
                    <span className="text-gray-500">{selectedFile.name}</span>
                  ) : (
                    <span className="text-gray-500">
                      Click to select files or drag and drop here
                    </span>
                  )}

                  <input
                    id="fileInput"
                    type="file"
                    name="pdffile"
                    accept=".pdf"
                    onChange={onFileInputChange}
                    className="hidden"
                  />
                </label>
                <div className="my-4 flex flex-col space-y-2">
                  <label className="">
                    <input
                      className="mr-2"
                      type="checkbox"
                      value="OCR Text"
                      checked={selectedOptions.includes("OCR Text")}
                      onChange={() => onOptionChange("OCR Text")}
                    />
                    OCR Text
                  </label>
                  <label>
                    <input
                      className="mr-2"
                      type="checkbox"
                      value="Another Option"
                      checked={selectedOptions.includes("Another Option")}
                      onChange={() => onOptionChange("Another Option")}
                    />
                    Another Option
                  </label>
                </div>
                <button
                  disabled={isuploading}
                  onClick={onUploadClick}
                  // disabled={uploadProgress < 100}
                  className="bg-orange-500  text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  {isuploading ? "Uploading..." : "Upload"}
                </button>

                {isuploading && (
                  <div className="w-full bg-gray-200 mt-4 rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-lg font-semibold">
                        {noOfProcessCompleted === 1 &&
                          noOfProcessCompleted > 0 &&
                          "File uploaded"}
                        {noOfProcessCompleted === 2 && "PDf processed"}
                      </p>
                      <p className="text-lg font-semibold">
                        {noOfProcessCompleted}/2
                      </p>
                    </div>
                    <div className="bg-gray-300 h-4 rounded overflow-hidden">
                      <div
                        className="bg-orange-500 h-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-center mt-2">
                      {uploadProgress}% Complete
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpen && <div className="fixed inset-0 bg-black opacity-25"></div>}
    </div>
  );
};

export default UploadModal;
