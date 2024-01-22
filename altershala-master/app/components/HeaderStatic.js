"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import babblr from "../assets/babblrblack.png";
import Cookies from "js-cookie";

const HeaderStatic = ({ children }) => {

  const [isTokenAvailable, setIsTokenAvailable] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      setIsTokenAvailable(true);
    }
  }, [token]); 

  return (
    <div className="">
      <div className="header border-b fixed top-0 left-0 right-0 bg-white z-50">
        <nav className="containers md:px-5 px-5 h-[60px] flex items-center justify-between">
          <div className="logo ">
            <Link href="/dashboard">
              <div className="logo w-36 object-cover left-0 flex justify-center items-center overflow-hidden">
                <Image
                  className=" h-60 object-cover object-center overflow-hidden"
                  src={babblr}
                  alt="image"
                 
                />
              </div>
            </Link>
          </div>
       
          {isTokenAvailable ? (
              <div className="nav-list flex flex-row items-center justify-center">
                <ul className=" gap-6 mr-4 flex-row items-center md:flex hidden justify-center text-[14px]">
                  <li>
                    <Link href="/AboutUs">Our story</Link>
                  </li>
                  <li>
                    <Link href="/dashboard/writepost">Write</Link>{" "}
                  </li>
                </ul>
                <li className="text-[14px] flex rounded-[70px] items-center justify-center pr-4 pl-4 pt-1.5 pb-1.5 bg-[#1e1e1e] text-[#fff]">
                  <Link  href="/dashboard">Home</Link>{" "}
                </li>
              </div>
            ) : (
              <div className="nav-list flex flex-row items-center justify-center">
                <ul className=" flex-row gap-6 items-center md:flex hidden justify-center text-[14px]">
                  <li>
                  <Link href="/AboutUs">Our story</Link>
                  </li>
                  <li>
                    <Link href="/auth/login">Write</Link>
                  </li>
                  <li>
                    <Link href="/auth/login">Sign In</Link>
                  </li>
                </ul>
                <button className="btn-start text-[14px] flex rounded-[70px] items-center justify-center pr-4 pl-4 pt-1.5 pb-1.5 bg-[#1e1e1e] text-[#fff]">
                  Get Started
                </button>
              </div>
            )}
        </nav>
      </div>
      <main className="mt-[75px]">{children}</main>
    </div>
  );
};

export default HeaderStatic;
