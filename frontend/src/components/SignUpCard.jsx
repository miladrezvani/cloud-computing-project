import React from "react";
import { useState, useEffect } from "react";
import { createUser } from "../service";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const SignUpCard = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [fail, setFail] = useState("invisible");
  const [showError, setShowError] = useState(false);

  const isLogin = {
    user_token: Cookies.get("user_token"),
  };

  if (isLogin.user_token) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="container mx-auto w-full max-w-lg bg-blue-gray-900 p-5 mt-44 rounded-md shadow-md">
      <h1 className="text-blue-800 text-5xl font-bold mb-4 mx-auto text-center">
        Sign Up
      </h1>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2">
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-300 text-gray-700 border  py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
            id="grid-first-name"
            type="text"
            placeholder="Jane"
            pattern="[0-9a-zA-Z ]{3,}"
            required
            onChange={(e) => {
              if (e.target.value.length >= 3) {
                setFirst_name(e.target.value);
              }
            }}
          />
          <span className="mt-1 hidden text-sm text-red-400">
            First name must be at least 3 characters long
          </span>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2">
            Last Name
          </label>
          <input
            className="appearance-none mb-3 block w-full bg-gray-300 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
            id="grid-last-name"
            type="text"
            pattern="[0-9a-zA-Z ]{3,}"
            required
            placeholder="Doe"
            onChange={(e) => {
              if (e.target.value.length >= 3) {
                setLastname(e.target.value);
              }
            }}
          />
          <span className="mt-1 hidden text-sm text-red-400">
            Last name must be at least 3 characters long
          </span>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2">
            UserName
          </label>
          <input
            className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
            id="grid-username"
            type="text"
            placeholder="JaneDoe123"
            pattern="[0-9a-zA-Z ]{6,}"
            required
            onChange={(e) => {
              if (e.target.value.length >= 6) {
                setUsername(e.target.value);
              }
            }}
          />
          <span className="mt-1 hidden text-sm text-red-400">
            Username must be at least 6 characters long
          </span>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2">
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
            id="grid-email"
            type="email"
            placeholder="JaneDoe123@gmail.com"
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            required
            onChange={(e) => {
              if (e.target.value.length >= 6) {
                setEmail(e.target.value);
              }
            }}
          />
          <span className="mt-1 hidden text-sm text-red-400">
            Please enter a valid email address.
          </span>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2">
            Password
          </label>
          <input
            className="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
            id="grid-password"
            type="password"
            required
            pattern="[0-9a-zA-Z]{8,}"
            placeholder="*********"
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
        <button
          className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-40 focus:outline-none focus:shadow-outline justify-center items-center mx-auto mt-5 sm:px-52"
          type="button"
          onClick={() => {
            if (
              first_name != "" &&
              last_name != "" &&
              username != "" &&
              email != ""
            ) {
              const res = createUser({
                first_name,
                last_name,
                username,
                email,
                password,
              });

              res.catch((item) => {
                if (item.status === 403) {
                  setShowError(true);
                }
              });

              res.then((item) => {
                if (item.status === 200) {
                  navigate(0);
                }
              });
            }
          }}
        >
          Sign Up
        </button>
        {showError && (
          <span className="mt-1 block text-sm text-red-400 text-center mx-auto">
            User already exists.
          </span>
        )}
      </div>
    </form>
  );
};

export default SignUpCard;
