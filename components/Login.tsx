// pages/login.js
import Head from "next/head";

export default function Login() {
  return (
    <div className=" flex-grow flex justify-center items-center pb-8 bg-gray-100">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl mb-6 text-center font-bold text-gray-800">
          Login
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
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
              id="password"
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <div className="text-center text-gray-600 text-sm">
            Or continue with
          </div>
          <button
            type="button"
            className="flex justify-center items-center w-full bg-white border border-gray-300 py-2 rounded-md hover:border-gray-400 focus:outline-none focus:border-gray-400 transition duration-300"
          >
            <img
              src="/google-icon.svg"
              alt="Google Icon"
              className="w-4 h-4 mr-2"
            />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}
