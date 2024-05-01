import { ToastContainer, toast } from "react-toastify";
const succsessNotify = () =>
  toast.success("Successfully completed !", {
    position: toast.POSITION.TOP_RIGHT,
  });
const copyNotify = () => {
  console.log("ok");
  toast.success("Successfully copied !", {
    position: toast.POSITION.TOP_RIGHT,
  });
};
const errorNotify = (err: string) =>
  toast.error("Something went wrong!", {
    position: toast.POSITION.TOP_RIGHT,
  });

export { succsessNotify, errorNotify, copyNotify };
