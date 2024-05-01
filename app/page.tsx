"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, selectUserValue } from "./globalRedux/store";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import {
  logOut,
  loginSuccessWithGoogle,
} from "./globalRedux/features/user/userSlice";
import Link from "next/link";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const auth = getAuth();
  const user = useSelector(selectUserValue);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        if (!user.user?.uid) {
          // Redirect to login if not logged in
          router.push("/");
        } else {
          dispatch(logOut());
        }
      } else {
        // Update user state if logged in
        dispatch(loginSuccessWithGoogle(currentUser));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <div className=" flex-grow flex flex-col justify-center items-center bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to PDF.ai</h1>
        <p className="mt-2 text-lg text-gray-600">
          Effortlessly Manage Your PDFs
        </p>
      </header>

      <main className="flex flex-col items-center space-y-8">
        <section className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            View & Edit PDFs
          </h2>
          <p className="text-gray-600">
            Upload, view, and make modifications to your PDF files with ease.
          </p>
          <a className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md inline-block transition duration-300">
            Get Started
          </a>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Organize & Collaborate
          </h2>
          <p className="text-gray-600">
            Organize your documents and collaborate with teams effortlessly.
          </p>
          <a className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md inline-block transition duration-300">
            Explore Features
          </a>
        </section>
      </main>

      <footer className="mt-auto text-gray-600 text-center py-4">
        © 2023 PDF.ai. All rights reserved.
      </footer>
    </div>
  );
}
