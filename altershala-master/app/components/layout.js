import { Inter } from "next/font/google";
import "../../public/globals.css";
import Link from "next/link";
import Image from "next/image";
import babblr from "../assets/babblrblack.png";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <div className={inter.className}>
      <div className="flex    flex-col">
        <div className="header border-b justify-center flex w-[100%] bg-white z-50">
          <nav className="container md:px-5 px-5 items-center justify-between h-[60px] flex">
            <div className="logo flex justify-center items-center ">
              <Link href="/dashboard">
              <div className="logo w-36 mt-2 object-cover left-0 flex justify-center items-center overflow-hidden">
              <Image className="flex justify-center items-center h-60 object-cover object-center overflow-hidden" src={babblr} alt="" srcset="" />
            </div>
              </Link>
            </div>
            <div className="nav-list gap-4 flex flex-row items-center justify-center">
              <ul className="gap-4 md:flex hidden text-[14px]">
                <li>
                  <Link href="/AboutUs">Our Story</Link>
                </li>
                <li>
                  <Link href="/auth/login">Write</Link>
                </li>
                <li>
                  <Link href="/auth/login">Sign In</Link>
                </li>
              </ul>
              <button
                onClick={() => {
                  window.location.href = "/auth/signup";
                }}
                className="btn-start text-[14px] flex rounded-[70px] items-center justify-center pr-4 pl-4 pt-1.5 pb-1.5 bg-[#1e1e1e] text-[#fff]"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>
        <div className="mt-[30px] h-screen px-5 w-[100%]">{children}</div>
      </div>
    </div>
  );
}
