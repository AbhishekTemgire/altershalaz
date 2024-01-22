"use client";

import { useState } from "react";

import Link from "next/link";

import { MdOutlineManageAccounts } from "react-icons/md";

import { BsCreditCard2Front } from "react-icons/bs";

import { FiShare2 } from "react-icons/fi";
import dynamic from "next/dynamic";

 function Layout({ children }) {
  const [activeTab, setActiveTab] = useState("Profile");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="container px-5 pt-8 h-screen overflow-y-scroll">
      <div>
        <h1 className="font-semibold text-2xl">Account</h1>
      </div>

      <ul className="flex mt-10 mb-8 font-medium text-gray-500 overflow-x-auto sm:flex-no-wrap">
        <li className="text-lg font-medium ml-6">
          <Link
            href="/dashboard/profile"
             onClick={() => handleTabClick("Profile")}
            className={`flex items-center space-x-2 text-gray-600 ${
              activeTab === "Profile" ? "font-semibold " : ""
            }`}
          >
            <MdOutlineManageAccounts size={28} className="text-gray-600" />

            <span>Profile</span>
          </Link>

          {activeTab === "Profile" && (
            <div
              className="w-full border-b-2 border-gray-500 mt-1 transition-all"
              style={{
                width: activeTab === "Profile" ? "100%" : "0%",

                opacity: activeTab === "Profile" ? 1 : 0,
              }}
            ></div>
          )}
        </li>

        <li className="text-lg font-medium ml-6">
          <Link
            href="/dashboard/profile/editprofile"
            onClick={() => handleTabClick("Edit Profile")}
            className={`flex items-center space-x-2 text-gray-600 ${
              activeTab === "Edit Profile" ? "font-semibold " : ""
            } `}
          >
            <BsCreditCard2Front size={28} className="text-gray-600" />

            <span>Edit Profile</span>
          </Link>

          {activeTab === "Edit Profile" && (
            <div
              className="w-full border-b-2 border-gray-500 mt-1 transition-all"
              style={{
                width: activeTab === "Edit Profile" ? "100%" : "0%",

                opacity: activeTab === "Edit Profile" ? 1 : 0,
              }}
            ></div>
          )}
        </li>

        {/* <li className="text-lg font-medium ml-6 gap-x-5">

          <Link

            href="/dashboard/profile/setting"

            className="flex transition-colors hover:underline active:underline hover:text-gray-950"

          >

            <BsShieldLock size={28} className="mr-2" />

            Security

          </Link>

        </li> */}
      </ul>

      <main> {children}</main>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
