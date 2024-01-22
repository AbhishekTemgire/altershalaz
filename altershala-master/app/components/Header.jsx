import Link from "next/link";
import React from "react";

const Header = ({ children }) => {
  return (
    <div className="w-[100%]">
      <div className=" bg-[#f4f4f0] w-[100%]  justify-center flex">
        <nav className="flex container  bg-[#f4f4f0] justify-between items-center p-4">
          <div className="">
            <h1 className="text-2xl cursor-pointer font-semibold">
              AlterShala
            </h1>
          </div>
          <div className="sm:block hidden ">
            <ul className="flex md:gap-7 cursor-pointer gap-5 items-center">
              <li className="block hover:font-medium hover:delay-100 transition transform translate-x-0 translate-y-0 md:w-24">
                <Link href="">Home</Link>
              </li>
              <li className="block hover:font-medium hover:delay-100 transition transform translate-x-0 translate-y-0 md:w-24">
                <Link href="">About Us</Link>
              </li>
              <li className="block hover:font-medium hover:delay-100 transition transform translate-x-0 translate-y-0 md:w-24">
                <Link href="">Contact</Link>
              </li>
              <li className="block hover:font-medium hover:delay-100 transition transform translate-x-0 translate-y-0 md:w-24">
                <Link href="">Features</Link>
              </li>
            </ul>
          </div>
          <button className="bg-[#1e1e1e] text-white rounded-full text-sm py-1.5 px-4">
            Start Free
          </button>
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Header;
