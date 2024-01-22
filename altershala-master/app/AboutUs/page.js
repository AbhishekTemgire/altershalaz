import React from "react";
import AboutUs from "../components/AboutUs";
import HeaderStatic from "../components/HeaderStatic"; 

const Page = () => {
  return (
    <div className="flex flex-col ">
      <HeaderStatic /> 
      <div className="flex-grow p-8">
        <AboutUs />
      </div>
    </div>
  );
};

export default Page;
