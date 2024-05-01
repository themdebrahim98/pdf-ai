import { copyNotify, errorNotify } from "@/util/alert";
import copy from "copy-to-clipboard";
import React from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function BubbleMessage({ content, role }: any) {
  const isUser = role === "user";
  const alignmentClass = isUser ? "justify-end" : "justify-start";
  const bubbleColorClass = isUser ? "bg-blue-500 text-white" : "bg-gray-200";
  const handleCopy = () => {
    copy(content) ? copyNotify() : errorNotify("Not coppied!");
  };
  return (
    <div
      className={`flex w-full  ${alignmentClass} last-of-type:pb-[100px] pb-5 `}
    >
      <ToastContainer />
      <div
        className={`rounded-lg py-2 px-16 max-w-full break-words ${bubbleColorClass} relative`}
      >
        <div className="absolute top-1 right-2 cursor-pointer text-md rounded-full bg-gray-300 hover:bg-gray-400 p-2 ">
          <AiOutlineCopy
            className="text-gray-600"
            onClick={() => {
              handleCopy();
            }}
          />
        </div>
        <p className="whitespace-pre-wrap text-black">{content}</p>
      </div>
    </div>
  );
}

export default BubbleMessage;
