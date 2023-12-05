import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import axios from "axios";
import { MdEmail } from "react-icons/md";

export default function ForgotPassword() {
  // const [reset, setReset] = useState(false);
  const [emailReset, setEmailReset] = useState("");
  const [loading, isLoading] = useState(false);

  const navigate = useNavigate();

  const backLogin = () => {
    navigate("/login");
  };
  

  const sendReset = async (e) => {
    e.preventDefault();
    // const param = {
    //     email: emailReset
    // }
    const formData = new FormData();
    formData.append("email", emailReset);

    try {
      isLoading(true);
      const response = await axios.post(
        "https://metatechvn.store/reset",
        formData,        
      );
      console.log("okoko", response);
      if (
        response.data.message
      ) {
        toast.success(response.data.message);
        isLoading(false);
        navigate("/reset");
      }
    } catch (error) {
      console.log("sda", error);
    } finally {
      isLoading(false);
    }
  };

  return (
    <div className="h-screen   slab lg:flex lg:items-center">
      <div className="w-[60%] h-[100%] lg:block hidden bg-[#D9D9D9]"></div>
      <div className="w-[40%] h-[100%] absolute right-0 top-0">
        <div className="bg-black flex flex-col w-[100%] h-[100%] z-30 opacity-75 ">
          <form className="" onSubmit={sendReset}>
            <div className="flex flex-col">
              <div
                className="text-8xl text-white text-center items-center mt-56"
                style={{ fontFamily: "Starborn" }}
              >
                Funny Face
              </div>
              <div className="flex flex-col items-center text-left  mx-16">
                <div className="text-white mt-20 lg:w-[400px] lg:h-[35px] w-[300px] h-[35px]">
                  <div className="text-4xl text-left">Forgot Password</div>
                  <p className="text-2xl mt-12 text-left">
                    Don't worry, we've sent you the password reset link via
                    email.
                  </p>
                </div>
                <div className="mt-24">
                  <div className="input_group">
                    <div className="border_input ">
                      <div className="input_login flex justify-items-center items-center">
                        <MdEmail className="text-white text-2xl items-start mr-2" />
                        <input
                          type="text"
                          value={emailReset}
                          placeholder="Email"
                          className="lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] text-white text-2xl"
                          onChange={(e) => setEmailReset(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 ml-4 w-full">
                    <button
                      type="submit"
                      className=" rounded-lg mr-[16px] w-[450px] h-[35px] text-white text-4xl bg-[#1DB954]"
                      disabled={loading}
                      // onClick={resetPassword}
                    >
                      {loading ? 'Loading...' : 'Continue'}
                    </button>
                    {/* <p className="text-3xl text-white mt-12">
                      Do you want to{" "}
                      <b className="cursor-pointer" onClick={showReset}>
                        reset password?
                      </b>
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="flex mt-5 w-full m-auto mx-auto justify-center">
            <div className="mr-2 cursor-pointer" onClick={backLogin}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.07 6.42993L4 12.4999L10.07 18.5699"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12.5H4.17004"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-white text-3xl">
              Forgot Password
            </div>
            {/* <div
                  className="text-[#1DB954] text-2xl cursor-pointer"
                  onClick={redirect}
                >
                  Log in
                </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
