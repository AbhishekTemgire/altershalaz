import React from "react";
import dynamic from "next/dynamic";


const Profile = dynamic(() => import("./profilepage"), {
  ssr: false, 
});

const Page = () => {
  return <Profile/>;
};

export default Page;
