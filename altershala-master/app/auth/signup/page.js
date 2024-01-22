"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../helper/helper";
import { generateOTPemail, verifyOTPemail} from "../../helper/helper";
const Page = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");


  const router = useRouter();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    const errors = {};

    if (!password) {
      errors.password = "Password is required!";
    } else if (password.includes(" ")) {
      errors.password = "Password cannot contain spaces!";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long!";
    } else if (!specialChars.test(password)) {
      errors.password = "Password must contain at least one special character!";
    }

    return errors;
  };

  async function sendOTP() {
    if (!email) {
      return toast.error("Please provide Email...");
    }

    try {
      const generatedOTP = await generateOTPemail(email);
      if (generatedOTP) {
        toast.success("OTP has been sent to your email!");
      } else {
        toast.error("Problem while generating OTP!");
      }
    } catch (error) {
      toast.error("Problem while generating OTP!");
    }
  }

  async function verifyOTP() {
    if (!OTP) {
      return toast.error("Please provide OTP...");
    }
    try {
      const { status } = await verifyOTPemail({ email, code: OTP });

      if (status === 201) {
        toast.success("Verify Successfully!");
      }
    } catch (error) {
      toast.error("Wrong OTP! Check email again!");
    }
  }
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Please enter username...!");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter an email address...!");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address...!");
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter a password...!");
      return;
    }

    const passwordErrors = isValidPassword(password);

    if (Object.keys(passwordErrors).length > 0) {
      for (const key in passwordErrors) {
        toast.error(passwordErrors[key]);
      }
      return;
    }

    try {
      if (!OTP) {
        return sendOTP(); // Send OTP if it's not provided
      }

      const { status } = await verifyOTPemail({ email, code: OTP });

      if (status === 201) {
        await registerUser({
          username,
          email,
          password,
        });

        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);

        toast.success("User Created successfully...!");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("User Email Address is already Exist...!");
      } else {
        toast.error("An error occurred:", error);
      }
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-lg m-0 sm:m-1 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 lg:w-6/12 p-2 sm:p-2">
            {/* <div>
              <img src="/clipart891042.png" className="w-10 mx-auto" />
            </div> */}
            <div className="mt-5 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Register</h1>
              <div className="w-full flex-1 mt-5">
                <div className="flex flex-col items-center mt-5">
                  <Link href="/auth/login" className="ml-0 w-full max-w-xs">
                    {" "}
                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                      Already have an account?
                    </button>
                  </Link>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or Create new account
                  </div>
                </div>
                <form onSubmit={handleFormSubmit}>
                  <div className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white  mb-5"
                      type="text"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className='flex '>
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="demo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {/* <button className="relative inline-flex items-center justify-center p-0.5  ml-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br bg-indigo-100 text-gray-800"
                    //  onClick={sendOTP}
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75   rounded-md group-hover:bg-opacity-0 font-semibold">
                          Verify
                        </span>
                      </button> */}
                    </div>
                    <div className="flex">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="text"
                      placeholder="OTP"
                      value={OTP}
                      onChange={(e) => setOTP(e.target.value)}
                    />
                    {/* <button className="relative inline-flex items-center justify-center p-0.5  ml-2 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br bg-indigo-100 text-gray-800 mt-5"
                  //  onClick={verifyOTP}
                    >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 font-semibold">
                          Verify
                        </span>
                      </button> */}
                    </div>
                   
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="mt-5 mb-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Register</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
