// pages/Login.js
"use client";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { app } from "@/app/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { loginWithFacebook, loginWithGoogle } from "@/lib/auth";
import Link from "next/link";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, selectUserValue } from "@/app/globalRedux/store";
import {
  login,
  loginFailure,
  loginSuccessWithGoogle,
} from "@/app/globalRedux/features/user/userSlice";
import { FaFacebook } from "react-icons/fa6";
const Login = () => {
  const reduxUserValue = useSelector(selectUserValue);
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (reduxUserValue.user.uid) {
      router.push("/dashboard");
    }
  }, [reduxUserValue.user.uid, dispatch]);

  const handleEmailLogin = async (e: any) => {
    try {
      e.preventDefault();
      dispatch(login());
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (credential.user.emailVerified) {
        dispatch(loginSuccessWithGoogle(credential.user));
        toast.success("Successfully logged in!", {
          position: "top-center",
          autoClose: 1500,
        });
        router.push("/dashboard");
      } else {
        toast.success("Please verify your email!", {
          position: "top-center",
        });
        dispatch(loginFailure());
      }
    } catch (error: any) {
      dispatch(loginFailure());
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      dispatch(login());
      await loginWithGoogle(router, dispatch);
    } catch (error: any) {
      dispatch(loginFailure());
      console.error("Google Login Error:", error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await loginWithFacebook(router, dispatch);
    } catch (error: any) {
      console.error("Facebook Login Error:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center flex-1 bg-orange-100">
      <div className="bg-orange-200 p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-3xl mb-6 text-center font-semibold text-gray-800">
          Login
        </h2>
        <form onSubmit={handleEmailLogin}>
          {/* Email and password fields */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border text-black border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {/* Login button */}
          <button
            disabled={reduxUserValue.isLoading}
            type="submit"
            className=" text-black w-full bg-orange-600  py-2 rounded-md hover:bg-orange-500 transition duration-300"
          >
            {reduxUserValue.isLoading
              ? "Login..."
              : "Login with Email/Password"}
          </button>
        </form>
        {/* Social login buttons */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">Or login with:</p>
          <div className="flex justify-center mt-2 space-y-2 flex-col items-center gap-2">
            <div
              className="flex justify-between bg-slate-100 items-center px-4 py-2 rounded-md cursor-pointer w-full"
              onClick={handleGoogleLogin}
            >
              <p className="text-black">Sign in with Google</p>
              <FcGoogle className="text-2xl" />
            </div>
            <div
              className="flex justify-between bg-slate-100 items-center px-4 py-2 rounded-md cursor-pointer w-full"
              onClick={handleFacebookLogin}
            >
              <p className="text-black">Sign in with Facebook</p>
              <FaFacebook className="text-2xl text-blue-700" />
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>

          <Link href="/auth/signUp">
            <button className="text-blue-600 hover:underline">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
