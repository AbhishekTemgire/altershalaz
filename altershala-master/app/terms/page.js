import React from "react";
import Terms from "../components/terms";
import HeaderStatic from "../components/HeaderStatic"; 

const Page = () => {
  return (
    <div className="flex flex-col ">
      <HeaderStatic /> 
      <div className="flex-grow p-8">
        <Terms />
      </div>
    </div>
  );
};

export default Page;