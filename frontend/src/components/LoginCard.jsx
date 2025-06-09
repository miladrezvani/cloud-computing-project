import React, { useState } from "react";
import { loginUser } from "../service";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const LoginCard = () => {
  const [usernameORemail, setUsernameORemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const isLogin = {
    user_token: Cookies.get("user_token"),
  };

  if (isLogin.user_token) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container mx-auto w-full max-w-xs mt-64 mb-40">
      <form className="bg-blue-gray-900 shadow-md  px-8 pt-6 pb-8 mb-4 rounded-md">
        <h1 className="text-blue-800 text-5xl font-bold mb-4 mx-auto text-center">
          Sign in
        </h1>
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-bold mb-2">
            Username or Email
          </label>
          <input
            className="bg-gray-300 shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-gray-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
            id="username"
            type="text"
            placeholder="Username"
            pattern="[0-9a-zA-Z ]{6,}"
            required
            onChange={(e) => {
              if (e.target.value.length >= 6) {
                setUsernameORemail(e.target.value);
              }
            }}
          />
          <span className="mt-1 hidden text-sm text-red-400">
            Username must be at least 6 characters long
          </span>
        </div>
        <div className="mb-6">
          <label className="block text-gray-100 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className=" bg-gray-300 shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:bg-white focus:border-gray-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
            id="password"
            type="password"
            placeholder="*********"
            required
            pattern="[0-9a-zA-Z]{8,}"
            onChange={(e) => {
              if (e.target.value.length >= 8) {
                setPassword(e.target.value);
              }
            }}
          />
          <span className="mt-1 hidden text-sm text-red-400">
            Password must be at least 8 characters.
          </span>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              const res = loginUser({ usernameORemail, password });

              res.catch((item) => {
                if (item.status === 401) {
                  setShowError(true);
                }
              });
              res.then((item) => {
                if (item.status === 200) {
                  navigate(0);
                }
              });
            }}
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/signup"
          >
            Sign Up
          </a>
        </div>
        {showError && (
          <span className="mt-1 block text-sm text-red-400 text-center mx-auto">
            Wrong credentials.
          </span>
        )}
      </form>
    </div>
  );
};

export default LoginCard;
