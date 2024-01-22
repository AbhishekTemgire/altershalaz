import React, { useState } from "react";

import { FaUser, FaUsers } from "react-icons/fa";

import ProfileCard from "./ProfileCard";

import Link from "next/link";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import dynamic from "next/dynamic";

const MainContainer = ({


  setShowProfile,

  setShowFollower,
}) => {
  const [showProfileContent, setShowProfileContent] = useState(true);

  const [activeTab, setActiveTab] = useState("Profile");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);

    if (tabName === "Profile") {
      setShowProfile(true);

      setShowFollower(false);
    } else if (tabName === "Followers") {
      setShowFollower(true);

      setShowProfile(false);

      setShowProfileContent(false); // Hide profile content when Followers tab is clicked
    }
  };
  const token = Cookies.get("token");

  const decodedToken = jwtDecode(token);

  const username = decodedToken.username;

  return (
    <div className="w-full mx-auto px-4">
      <div className="mt-8 bg-gradient-to-b from-green-700 to-blue-700 shadow-md rounded-xl overflow-hidden">
        {/* Image, Name, Role */}

        <div className="flex flex-col md:flex-row lg:flex-row items-center ml-2 mt-5 md:mt-10 lg:mt-10 md:ml-6 lg:ml-6">
          {/* Image */}

          <div
            className="w-24 h-24 ml-2 mt-4 md:mt-10 rounded-full bg-slate-600 text-center relative overflow-hidden"
            style={{ cursor: "pointer" }}
           
          >
         
      
           
                <a>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/babblr-blog.appspot.com/o/user.png?alt=media&token=21a2ba4c-49bf-45ab-a088-e395951f4b0e"
                    alt="Default Image"
                    className="w-full h-full object-cover absolute"
                  />
                </a>
              
           
          </div>

          {/* Name and Role */}

          <div className="text-white mt-2 md:mt-4 ml-2 md:ml-4 md:text-center lg:text-left pt-2 md:pt-6">
            <p className="text-xl font-bold text-left md:text-center lg:text-left">
              {username}
            </p>

            {/* <p className="text-sm text-center lg:text-left pb-2">Developer</p> */}
          </div>
        </div>

        {/* Divider */}

        <div className="bg-gradient-to-b from-green-700 to-blue-700 h-0.5"></div>

        {/* Profile and Followers Tabs */}

        <div className="bg-white border-b border-gray-200">
          <div className="flex justify-between text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <div className="flex-grow">
              <a
                href="#"
                className={`inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
                  activeTab === "Profile"
                    ? "text-blue-600 border-b-4 border-gray-600"
                    : ""
                }`}
                onClick={() => handleTabClick("Profile")}
              >
                <svg
                  className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                Profile
              </a>
            </div>

            <div className="flex-grow">
              <a
                href="#"
                className={`inline-flex items-center justify-center p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group ${
                  activeTab === "Followers"
                    ? "text-blue-600 border-b-4 border-gray-600"
                    : ""
                }`}
                aria-current="page"
                onClick={() => handleTabClick("Followers")}
              >
                <svg
                  className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                Followers
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render ProfileCard based on the showProfileContent state */}

      {showProfileContent && <ProfileCard />}
    </div>
  );
};

export default dynamic(() => Promise.resolve(MainContainer), { ssr: false });

