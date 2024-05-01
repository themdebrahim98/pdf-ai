import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteVector } from "@/util/deleteVectors";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  selectPdfValue,
  selectUserValue,
} from "@/app/globalRedux/store";
import { toast } from "react-toastify";
import {
  LoadingState,
  deletePDF,
  pdfDelete,
} from "@/app/globalRedux/features/user/pdfSlice";
import Loader from "./Loader";

interface FileComponentProps {
  fileName: string;
  onEdit: () => void;
  onDelete: () => void;
  id: any;
}

const FileComponent = ({
  fileName,
  onEdit,
  onDelete,
  id,
}: FileComponentProps) => {
  const router = useRouter();
  const reduxStateValue = useSelector(selectUserValue);
  const reduxPdfValue = useSelector(selectPdfValue);
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = async (fileName: string, userId: string) => {
    try {
      const actionResult = await dispatch(
        deletePDF({
          fileName: fileName,
          userId: userId,
        })
      );

      if (deletePDF.fulfilled.match(actionResult)) {
        // Successful deletion
        toast.success("File deleted successfully!");
        // dispatch(pdfDelete(fileName));
      } else if (deletePDF.rejected.match(actionResult)) {
        // Failed deletion
        const error =
          actionResult.error.message ||
          "Something went wrong during file deletion";
        toast.error(error);
        throw new Error(error);
      }
    } catch (error: any) {
      console.error("Error occurred during file deletion:", error.message);
      alert("Error occurred during file deletion: " + error.message);
    }
  };

  return (
    <div className=" bg-gray-200 rounded-lg shadow-md p-4 flex items-center justify-between mb-4  hover:bg-white/20">
      <div
        className="flex items-center"
        onClick={() => {
          router.push(`documents/${id}`);
        }}
      >
        <Link href="/asdklbh">
          <span className="text-lg">{fileName}</span>/
        </Link>
      </div>
      <div className="flex items-center">
        <button
          onClick={() =>
            handleDelete(fileName, reduxStateValue.user.uid as string)
          }
          className="text-red-500 focus:outline-none hover:text-red-600"
        >
          <FaTrash className="inline-block w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FileComponent;
