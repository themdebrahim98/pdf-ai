"use client";
import { useState, useEffect, useRef } from "react";
import ProfileDropDown from "./ProfileDropDown";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineTool,
  AiOutlineArrowUp,
} from "react-icons/ai";

import { IoLogOutOutline, IoCodeSlashOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/globalRedux/store";
const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userDropDrownRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user.value.user);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropDrownRef.current &&
        !userDropDrownRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const authenticatedLists = (
    <ul className="flex space-x-6 text-black items-center first-of-type:font-semibold">
      {/* is login */}
      {true && (
        <li>
          <button
            onClick={() => {}}
            className="flex items-center justify-between bg-orange-500 text-white font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out"
          >
            <FaRegArrowAltCircleUp className="mr-2" />
            <span>Upload </span>
          </button>
        </li>
      )}
      <li>
        <Link
          href="/dashboard/documents"
          className="hover: underline-offset-8 hover:underline  transition-all duration-50 "
        >
          Documents
        </Link>
      </li>
      <li>
        <a
          href="#"
          className="hover: underline-offset-8 hover:underline  transition-all duration-50"
        >
          ✨Upgrade
        </a>
      </li>
      <li>
        <a
          href="#"
          className="hover: underline-offset-8 hover:underline  transition-all duration-50"
        >
          Tools
        </a>
      </li>

      <li>
        <ProfileDropDown
          userDropDrownRef={userDropDrownRef}
          toggleUserMenu={toggleUserMenu}
          isUserMenuOpen={isUserMenuOpen}
        />
        {/* ) : (
      <button className="hover: underline-offset-8 hover:underline  transition-all duration-50">
        Get started
      </button>
    )} */}
      </li>
    </ul>
  );

  const notAuthenticatedlists = (
    <ul className="flex space-x-6 text-black items-center first-of-type:font-semibold">
      {/* is login */}

      <li>
        <Link
          href="/dashboard/documents"
          className="hover: underline-offset-8 hover:underline  transition-all duration-50 "
        >
          Pricing
        </Link>
      </li>
      <li>
        <a
          href="#"
          className="hover: underline-offset-8 hover:underline  transition-all duration-50"
        >
          Use cases
        </a>
      </li>
      <li>
        <Link
          href="/auth/login"
          className="hover: underline-offset-8 hover:underline  transition-all duration-50"
        >
          Get started
        </Link>
      </li>
    </ul>
  );

  return (
    <div className="flex flex-col space-y-0 sticky top-0  z-50">
      <nav className=" bg-orange-50  py-4 sticky top-0 z-50">
        <div className="  px-6 md:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-black text-2xl font-semibold">
                Logo
              </Link>
            </div>
            <div className="hidden md:block">{authenticatedLists}</div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-black focus:outline-none"
              >
                {isOpen ? (
                  <IoMdClose className=" text-2xl font-extrabold" />
                ) : (
                  <GiHamburgerMenu className=" text-2xl font-extrabold" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden mt-2 transition-all duration-100 ease-in ">
          <div className="flex flex-col space-y-4 bg-white w-screen  shadow-lg py-4">
            <a
              href="#"
              className=" py-2 px-4  text-gray-700 hover:bg-gray-100 flex items-center text-md"
            >
              <CiSettings className="mr-2 text-lg" />
              Settings
            </a>
            <a
              href="#"
              className=" py-2 px-4  text-gray-700 hover:bg-gray-100 flex items-center text-md"
            >
              <IoCodeSlashOutline className="mr-2 text-lg" />
              Developer
            </a>
            <a
              href="#"
              className=" py-2 px-4  text-gray-700 hover:bg-gray-100 flex items-center text-md"
            >
              {/* <AiOutlineArrowUp className="mr-2 text-lg" /> */}✨ Upgrade
            </a>
            <a
              href="#"
              className=" py-2 px-4  text-gray-700 hover:bg-gray-100 flex items-center text-md"
            >
              <AiOutlineTool className="mr-2 text-lg" />
              Tools
            </a>
            <a
              href="#"
              className=" py-2 px-4  text-gray-700 hover:bg-gray-100 flex items-center text-md"
            >
              <IoLogOutOutline className="mr-2 text-lg" />
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardNavbar;
