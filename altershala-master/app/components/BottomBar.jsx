import React from "react";
import "../../public/globals.css";
import Link from "next/link";
import { BiBell, BiEdit, BiNews } from "react-icons/bi";
import { TbSettings2 } from "react-icons/tb";
import { HiOutlineBookmarkAlt } from "react-icons/hi";

const BottomBar = ({ children }) => {
  return (
    <div>
      <div className="h-[80px] select-none  bg-[#fff] max-media:block hidden  items-center justify-center border-t fixed bottom-0 w-full z-30">
        <div className="bottombar flex select-none  w-full flex-row justify-around items-center ">
          <Link href="/dashboard/">
            <div className="bg-gray-100  hover:bg-[#1e1e1e] hover:text-[#ffff]  cursor-pointer my-4 p-3 rounded-[10px] inline-block">
              <BiNews size={20} />
            </div>
          </Link>
          <Link href="/dashboard/">
            <div className="bg-gray-100 hover:bg-[#1e1e1e] hover:text-[#ffff]  cursor-pointer my-4 p-3 rounded-[10px] inline-block">
              <BiBell size={20} />
            </div>
          </Link>

          <Link href="/dashboard/writepost" title="Write Post">
            <div className="bg-gray-100 hover:bg-[#1e1e1e] hover:text-[#ffff]  cursor-pointer my-4 p-3 rounded-[10px] inline-block">
              <BiEdit size={20} />
            </div>
          </Link>
          <Link href="/dashboard/writepost" title="Write Post">
            <div className="bg-gray-100 hover:bg-[#1e1e1e] hover:text-[#ffff]  cursor-pointer my-4 p-3 rounded-[10px] inline-block">
              <HiOutlineBookmarkAlt size={20} />
            </div>
          </Link>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default BottomBar;
