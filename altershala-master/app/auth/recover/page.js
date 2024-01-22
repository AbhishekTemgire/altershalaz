"use client"
import { useState } from "react";
import { useAuthStore } from "../../store/store";
import toast, { Toaster } from "react-hot-toast";
import { generateOTP, verifyOTP } from "../../helper/helper";
import { useRouter } from "next/navigation";
import ProtectRoute from "@/app/middleware/auths";

const Recover = () => {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState("");
  const router = useRouter();

  async function sendOTP() {
    if (!username) {
      return toast.error("Please provide Username in Verify Username.");
    }

    try {
      const generatedOTP = await generateOTP(username);
      console.log(generatedOTP);

      if (generatedOTP) {
        toast.success("OTP has been sent to your email!");
      } else {
        toast.error("Problem while generating OTP!");
      }
    } catch (error) {
      toast.error("Problem while generating OTP!");
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const { status } = await verifyOTP({ username, code: OTP });

      if (status === 201) {
        toast.success("Verify Successfully!");
        return router.push("/auth/resetpassword");
      }
    } catch (error) {
      toast.error("Wrong OTP! Check email again!");
    }
  }


  if (typeof window !== "undefined") {
    return (
      <ProtectRoute>
        <form onSubmit={onSubmit}>
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-lg m-0 sm:m-2 bg-white shadow sm:rounded-lg flex justify-center flex-1">
              <div className="lg:w-1/2 lg:w-6/12 p-2 sm:p-2">
                <div className="mt-10 flex flex-col items-center">
                  <h1 className="text-2xl xl:text-3xl font-extrabold">
                    Enter 6 digit OTP sent to your email address.
                  </h1>
                  <div className="w-full flex-1 mt-8">
                    <div>
                      <div className="my-12 border-b text-center"></div>

                      <div className="mx-auto max-w-xs">
                        <input
                          onChange={(e) => setOTP(e.target.value)}
                          autoComplete="off"
                          type="text"
                          id="otp"
                          placeholder="OTP"
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        />
                        <div className="flex">
                          <button
                            onClick={sendOTP}
                            className="mt-5 mr-3 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                          >
                            <span className="">Send Otp</span>
                          </button>
                          <button
                            type="submit"
                            className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                          >
                            <span className="">Verify Otp</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ProtectRoute>
    );
  } else {
    return null; 
  }
};

export default Recover;
