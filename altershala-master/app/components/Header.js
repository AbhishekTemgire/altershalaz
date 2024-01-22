"use client";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

import React, { Fragment, useState } from "react";

import { BiDotsVerticalRounded, BiSearch, BiSupport } from "react-icons/bi";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";

import { FaSearch } from "react-icons/fa";

import { logout } from "../middleware/auths";
import { useRouter } from "next/navigation";
import { Cookie } from "next/font/google";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useSearch } from "../context/SearchContext";
import ProfileImage from "../context/useProfileImage";
import toast from "react-hot-toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ children }) => {
  const { updateSearchTerm } = useSearch();
  const [inputValue, setInputValue] = useState("");

  const { searchTerm, setSearchTerm } = useSearch();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const token = Cookies.get("token");

  const decodedToken = jwtDecode(token);

  const username = decodedToken.username;


  return (
    <div className=" fixed   max-media:w-[100%]   max-media:left-0     top-0 left-[80px] right-0 bg-white z-50">
      <div className="h-[80px] bg-white w-full items-center justify-between flex flex-row border-b">
      <div className="relative  flex max-media:ml-3    ml-10 border rounded-full items-center">
          <input
            className="py-2.5 pr-12 pl-4 text-xs text-[#1e1e1e] md:w-96 w-45 bg-none rounded-full focus:outline-none focus:ring-1 focus:ring-[#4169E1] focus:border-transparent"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <BiSearch className="text-gray-500 w-6 h-6" />
          </div>
        </div>
   
   
        <div className="profile flex flex-row gap-4 h-full justify-end mr-5 items-center">
          <h1 className="font-medium select-none text-center max-media:hidden">
            {username || "loading"}
          </h1>

          <Menu as="div" className="relative  inline-block text-left">
            <div>
              <Menu.Button className=" flex justify-center items-centerrounded-full bg-white ">
                <div className="flex items-center  gap-2 flex-row">
                  <div className=" shadow-sm ring-1 ring-inset rounded-full ring-gray-300 hover:bg-gray-50">
                    <ProfileImage
                      username={username}
                      className="h-8 w-8 m-1 rounded-full object-cover object-center"
                    />
                  </div>
                </div>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/dashboard/profile"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",

                          "block px-4 py-2 text-sm"
                        )}
                      >
                        <span className="flex gap-2 items-center">
                          {" "}
                          Account settings
                        </span>
                      </Link>
                    )}
                  </Menu.Item>
                 

                  <form method="POST" action="#">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/">
                          <button
                            type="submit"
                            onClick={handleLogout}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",

                              "block w-full px-4 py-2 text-left text-sm"
                            )}
                          >
                            <span className="flex gap-2 items-center">
                              {" "}
                              Sign Out
                            </span>
                          </button>
                        </Link>
                      )}
                    </Menu.Item>
                  </form>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Header;
