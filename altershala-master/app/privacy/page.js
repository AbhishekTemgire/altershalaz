import React from "react";
import Privacy from "../components/privacy";
import HeaderStatic from "../components/HeaderStatic"; 
const Page = () => {
  return (
    <div className="flex flex-col ">
      <HeaderStatic />  
      <div className="flex-grow p-8">
        <Privacy />
      </div>
    </div>
  );
};

export default Page;