import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/20/solid";

const Footer = () => {
  return (
    <footer className="container mx-auto w-full bg-blue-gray-800 p-8">
      <div className="flex flex-col flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
        <ul className=" flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Link
              to="/aboutus"
              className="text-gray-100 hover:text-slate-500 focus:text-slate-500 text-sm"
            >
              About Us
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-100 hover:text-slate-500 focus:text-slate-500 text-sm"
            >
              License
            </a>
          </li>
          <li>
            <Link
              to={"/movies"}
              className="text-gray-100 hover:text-slate-500 focus:text-slate-500 text-sm"
            >
              Movies
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-100 hover:text-slate-500 focus:text-slate-500 text-sm"
            >
              Contact Us
            </a>
          </li>
        </ul>
        <p className="flex flex-row mb-4 text-sm text-center text-gray-100 md:mb-0 border-t border-slate-200 mt-4 pt-4">
          made with
          <div className="w-5 text-blue-700">
            <HeartIcon />
          </div>
          by Milad Rezvani.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
