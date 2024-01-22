"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { verifyPassword } from "../../helper/helper"; // Import your helper functions
import { validateLoginData, validateLogins } from "../../helper/validate"; // Import your helper functions
import Link from "next/link";
import Cookies from "js-cookie";

function LoginPage ()  {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: validateLogins,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      try {
        const response = await verifyPassword({
          username: values.username,

          password: values.password,
        });

        const { message, token } = response.data;

        if (message === "Login successful" && token) {
          Cookies.set("token", token, { expires: 1, path: "/" });

          router.push("/dashboard");
      
        }
      } catch (error) {
        toast.error("Password does not match");
      }
    },
  });

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-lg m-0 sm:m-2 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 lg:w-6/12 p-2 sm:p-2">
            {/* <div>
              <img
                src="/clipart891042.png"
                className="w-10 mx-auto"
              />
            </div> */}
            <div className="mt-10 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">LogIn</h1>
              <div className="w-full flex-1 mt-8">
                

                <div className="flex flex-col items-center mt-5">
                  <Link href="/auth/signup" className="ml-0 w-full max-w-xs">
                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                     
                    Don&apos;t have an account?
                    </button>
                  </Link>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or Login with e-mail
                  </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="demo1234"
                      {...formik.getFieldProps("username")}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      {...formik.getFieldProps("password")}
                    />
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
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
                      {/* <span className="ml-3" disabled={isSubmitting}>
                        {" "}
                        {isSubmitting ? "Logging in..." : "Login"}
                      </span> */}
                    </button>
                    <div className="mt-4 flex justify-between font-semibold text-sm">
                      <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                        <input className="mr-1" type="checkbox" />
                        <span>Remember Me</span>
                      </label>
                      <Link
                        className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                        href="/auth/verifyEmail"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-8 lg:m-8 w-full bg-contain bg-center bg-no-repeat"
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

export default LoginPage;
