import React, { useEffect, useState } from "react";
import placeHolder from "../assets/images/Profile.jpeg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { getUserID, logoutUser } from "../service";
import Cookies from "js-cookie";

const Navbar = () => {
  const [user, setUser] = useState();
  const [link, setLink] = useState();

  useEffect(() => {
    const res = getUserID();
    res.then((item) => {
      setLink(item.data);
    });
    setUser(Cookies.get("user_token"));
  }, []);

  return (
    <nav className=" bg-blue-gray-900 border-b border-blue-gray-200/75 shadow-lg mb-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-200">
            IMDB
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src={placeHolder}
                alt="user photo"
              />
            </MenuButton>

            <MenuItems
              transition
              className="absolute text-center right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-blue-gray-800 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {user == undefined ? (
                  <div>
                    <MenuItem>
                      <Link
                        to={"/signup"}
                        className="block px-4 py-2 text-sm text-gray-200 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        SignUp
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to={"/login"}
                        className="block px-4 py-2 text-sm text-gray-200 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Login
                      </Link>
                    </MenuItem>
                  </div>
                ) : (
                  <div>
                    <MenuItem>
                      <Link
                        to={`/user/${link}/`}
                        className="block px-4 py-2 text-sm text-gray-200 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                      >
                        Account
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        className="block w-full px-4 py-2 text-sm text-gray-200 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        to={"/"}
                        onClick={() => {
                          logoutUser();
                          setUser(undefined);
                        }}
                      >
                        Sign out
                      </Link>
                    </MenuItem>
                  </div>
                )}
              </div>
            </MenuItems>
          </Menu>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-blue-gray-900 rounded-lg bg-blue-gray-900 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-blue-gray-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                To="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="block py-2 px-3 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="block py-2 px-3 text-gray-200 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
