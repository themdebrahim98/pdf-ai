import React from "react";
import {
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineTool,
  AiOutlineArrowUp,
} from "react-icons/ai";

import { IoLogOutOutline, IoCodeSlashOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, selectUserValue } from "@/app/globalRedux/store";
import { logOut } from "@/app/globalRedux/features/user/userSlice";
import { signOutAcc } from "@/lib/auth";
function ProfileDropDown({
  toggleUserMenu,
  isUserMenuOpen,
  userDropDrownRef,
}: {
  toggleUserMenu: () => void;
  isUserMenuOpen: boolean;
  userDropDrownRef: any;
}) {
  const router = useRouter();
  const reduxStateValue = useSelector(selectUserValue);
  const dispatch = useDispatch<AppDispatch>();
  const handleItemClick = () => {
    // Close the dropdown menu when an item is clicked
    toggleUserMenu();
  };

  const handleLogout = async () => {
    try {
      await signOutAcc();
      dispatch(logOut());
      toggleUserMenu();
      toast.success("Logout succsessfully!", {
        position: "top-center",
        autoClose: 1500,
      });
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div className="hidden md:block" ref={userDropDrownRef}>
      <div className="relative inline-block text-left">
        <button
          onClick={toggleUserMenu}
          type="button"
          className="focus:outline-none text-lg rounded-full bg-white p-2 hover:bg-gray-200"
          id="user-menu"
          aria-expanded="true"
          aria-haspopup="true"
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
        >
          {/* User icon */}
          <AiOutlineUser />
        </button>

        {/* Dropdown menu, show/hide based on dropdown state */}
        {isUserMenuOpen && (
          <div className=" origin-top-right absolute right-0 mt-2 w-72 py-2 rounded-md bg-white shadow-xl transition-all duration-75  z-10">
            <p
              className=" flex gap-x-3 py-2 px-4 text-black hover:bg-gray-100  items-center text-md cursor-pointer rounded-md transition duration-300"
              onClick={handleItemClick}
            >
              <AiOutlineUser />
              {reduxStateValue.user.userName}
            </p>

            <Link
              href="/dashboard/settings"
              className="py-2 px-4 text-gray-700 hover:bg-gray-100 flex items-center text-md"
              onClick={handleItemClick}
            >
              <CiSettings className="mr-2 text-lg" />
              Settings
            </Link>
            <a
              href="#"
              className="py-2 px-4 text-gray-700 hover:bg-gray-100 flex items-center text-md"
              onClick={handleItemClick}
            >
              <IoCodeSlashOutline className="mr-2 text-lg" />
              Developer
            </a>
            <a
              href="#"
              className="py-2 px-4 text-gray-700 hover:bg-gray-100 flex items-center text-md"
              onClick={handleItemClick}
            >
              ✨ Upgrade
            </a>
            <a
              href="#"
              className="py-2 px-4 text-gray-700 hover:bg-gray-100 flex items-center text-md"
              onClick={handleItemClick}
            >
              <AiOutlineTool className="mr-2 text-lg" />
              Tools
            </a>
            <a
              href="#"
              className="py-2 px-4 text-gray-700 hover:bg-gray-100 flex items-center text-md"
              onClick={handleItemClick}
            >
              <AiOutlineTool className="mr-2 text-lg" />
              Pricing
            </a>
            <a
              href="#"
              className="py-2 px-4 text-gray-700 hover:bg-gray-100 flex items-center text-md"
              onClick={handleItemClick}
            >
              <AiOutlineTool className="mr-2 text-lg" />
              Use cases
            </a>
            <a
              href="#"
              className="py-2 px-4 text-gray-700 hover:bg-gray-100 flex items-center text-md"
              onClick={handleLogout}
            >
              <IoLogOutOutline className="mr-2 text-lg" />
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDropDown;
