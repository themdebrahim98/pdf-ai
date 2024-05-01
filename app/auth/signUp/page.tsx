"use client";
import Head from "next/head";
import { use, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { app } from "@/app/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  selectUserValue,
} from "@/app/globalRedux/store";
import {
  login,
  loginFailure,
  signUp,
  signUpFailure,
  signUpSuccess,
} from "@/app/globalRedux/features/user/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupWithEmilandPassword } from "@/lib/auth";
export default function SignUp() {
  const router = useRouter();
  const reduxstateValue = useSelector(selectUserValue);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const auth = getAuth(app);
  const dispatch = useDispatch<AppDispatch>();

  const { email, password, username } = formData;
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    dispatch(signUp());
    e.preventDefault();
    await signupWithEmilandPassword(
      email,
      password,
      formData.username,
      dispatch,
      router
    );
    // router.push("/dashboard");
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then(async (userCredential) => {
    //     // Signed up
    //     const user = userCredential.user;
    //     dispatch(signUpSuccess(user));
    //     try {
    //       dispatch(login());
    //       const userCredential = await signInWithEmailAndPassword(
    //         auth,
    //         email,
    //         password
    //       );
    //       const user = userCredential.user;
    //       console.log(userCredential);
    //       await updateProfile(user, {
    //         displayName: formData.username,
    //       });
    //       dispatch(loginSuccess(user));
    //       router.push("/dashboard");
    //     } catch (error: any) {
    //       dispatch(loginFailure());
    //       alert(error.message);
    //       console.log(error);
    //     }
    //     // ...
    //   })
    //   .catch((error: any) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(error);
    //     dispatch(signUpFailure());
    //     alert(error.message);
    //     // ..
    //   });
    // You can perform further actions here, like dispatching to Redux or making API calls with the form data
    // console.log(formData);
  };

  return (
    <div className="flex-1 flex justify-center items-center  bg-orange-100">
      <Head>
        <title>Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=" p-8 rounded-lg shadow-md max-w-md w-full bg-orange-200">
        <h1 className="text-3xl mb-6 text-center font-bold text-gray-800">
          Sign Up
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              className=" text-black w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className=" text-black w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className=" text-black w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            disabled={reduxstateValue.isLoading}
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-500 transition duration-300"
          >
            {reduxstateValue.isLoading ? "Signup..." : "Signup"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login">
              <button className="text-blue-600 hover:underline">Login</button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
