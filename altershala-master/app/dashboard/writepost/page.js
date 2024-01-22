import React from "react";
import dynamic from "next/dynamic";

const WritePost_Page = dynamic(() => import("./writepost"), {
  ssr: false, 
});

const Page = () => {
  return <WritePost_Page/>;
};

export default Page;
