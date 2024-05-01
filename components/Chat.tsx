"use client";
import { FaQuestionCircle } from "react-icons/fa";
import { MdOutlineMotionPhotosPause } from "react-icons/md";
import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useChat } from "ai/react";
import BubbleMessage from "./BubbleMessage";
import { scrollToBottom } from "@/util/scroll";
import { errorNotify } from "@/util/alert";
import { useSelector } from "react-redux";
import { selectUserValue } from "@/app/globalRedux/store";
import { IoIosSend } from "react-icons/io";
export default function Chat({ pdfId }: { pdfId: string }) {
  const [isUserManuallyScrolling, setIsUserManuallyScrolling] = useState(false);
  const reduxStateValue = useSelector(selectUserValue);
  const containerRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } =
    useChat({
      api: "/api/getans",
      initialMessages: [
        { role: "assistant", content: "How can I help you?", id: "#17#" },
      ],
      body: {
        pdfId: pdfId,
        userId: reduxStateValue.user.uid,
        userName: reduxStateValue.user.userName,
      },
      onError(error) {
        console.log(error);
        errorNotify(error.message);
      },
    });

  useEffect(() => {
    if (messages.length > 1 && !isUserManuallyScrolling) {
      scrollToBottom(containerRef);
    }
  }, [messages, isUserManuallyScrolling]);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const atBottom =
          Math.ceil(scrollTop) + clientHeight + 100 >= scrollHeight;

        if (atBottom) {
          setIsUserManuallyScrolling(false);
          console.log("Fething more message...");
        } else {
          setIsUserManuallyScrolling(true);
        }
      };

      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto"; // Reset the height on each input change
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content

      // If you want to limit the maximum height of the textarea, you can add a condition here

      // For example:
      const maxHeight = 250; // Define your maximum height
      if (textarea.scrollHeight > maxHeight) {
        textarea.style.overflowY = "scroll";
        textarea.style.height = `${maxHeight}px`;
      } else {
        textarea.style.overflowY = "hidden";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, [input]);
  return (
    <div className="relative w-full rounded-md shadow-xl flex flex-col gap-y-8 h-full">
      <div
        ref={containerRef}
        className="overflow-y-auto h-[200px] flex-grow ring-2 p-2"
      >
        {messages.map((m, idx) => (
          <BubbleMessage content={m.content} role={m.role} key={idx} />
        ))}
      </div>

      <div className="sticky bottom-0  mb-6 bg-orange-200 px-2 py-4 rounded-md">
        <div className="flex items-center justify-between gap-x-6">
          <div className="bg-slate-200 rounded-full p-2">
            <FaQuestionCircle />
          </div>
          <form className="w-full mx-auto max-w-4xl items-center">
            <div className="flex relative items-stretch justify-center rounded-md overflow-hidden m-0 overflow-y-auto h-full">
              <textarea
                ref={textareaRef}
                className="flex-1 overflow-y-auto text-left p-3 resize-none border-none  shadow-md py-4 px-4 dark:text-black focus:outline-none"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                rows={1}
              />
              <div className=" absolute top-2 right-0">
                <div className=" text-2xl p-2">
                  {!isLoading ? (
                    <div
                      onClick={(e: any) => {
                        handleSubmit(e);
                      }}
                      className=" cursor-pointer"
                    >
                      <IoIosSend />{" "}
                    </div>
                  ) : (
                    <div className=" animate-spin duration-75 transition-all cursor-pointer">
                      <MdOutlineMotionPhotosPause />
                    </div>
                  )}
                </div>
                {/* <button
                  disabled={isLoading}
                  type="submit"
                  className={`flex items-center w-[100px] justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ring-slate-300 ring-2 focus:outline-none ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  } ${
                    isLoading &&
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {isLoading ? "Loading..." : "Send"}
                </button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
