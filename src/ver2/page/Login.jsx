/* eslint-disable no-undef */
/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import axios from "axios";
import anh1 from "../../ver2/components/image/anhlogin1.png";
import anh2 from "../../ver2/components/image/anhlogin2.png";
import anh3 from "../../ver2/components/image/anhlogin3.png";
import anh4 from "../../ver2/components/image/anhlogin4.png";
import anh5 from "../../ver2/components/image/anhlogin5.png";

import "./Login.css";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
// import firebase from "firebase/app";
// import { auth } from "./firebase";

export default function Login() {
  const [email_or_username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const [loading, isLoading] = useState(false);
  
  const [rememberMe, setRememberMe] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    //  toggle isActive state on click
    setIsActive((prevState) => !prevState);
  };

  // dang nhap voi google hoặc facebook
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const rep = await axios.get("https://metatechvn.store/login/user");
      if (rep.data.message) {
        toast.error(rep.data.message);
      } else {
        navigate("/");
        // toast.success("Login success")
        window.location.reload();
        rep.data = JSON.stringify(rep.data);
        localStorage.setItem("user-info", rep.data);
      }
    } catch (error) {
      return toast.error("Login false !!!");
    } finally {
      isLoading(false);
    }
  };

  // const signInWithFacebook = async () => {
  //   const provider = new firebase.auth.FacebookAuthProvider();
  //   await auth.signInWithPopup(provider);
  // };

  // const Images = [anh1, anh2, anh3, anh4];
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/register");
  };
  const forgot = () => {
    navigate("/forgot");
  };
  

  

  const ProceedLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email_or_username", email_or_username);
    formData.append("password", password);

    if (validate()) {
      try {
        const response = await axios.post(
          "https://metatechvn.store/login",
          formData,
        );
        if (response.data.message) {
          toast.error(response.data.message);
        } else {
          navigate("/");
          // toast.success("Login success")
          window.location.reload();
          response.data = JSON.stringify(response.data);
          localStorage.setItem("user-info", response.data);
        }
      } catch (error) {
        // setValidateError("You did something wrong!")
        return toast.error("Account or password is incorrect !!!");
      } finally {
        isLoading(false);
      }
    }
  };

  

  // const showReset = () => {
  //   setReset(true);
  // };
  useEffect(() => {
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";
    setRememberMe(storedRememberMe);
  }, []);
  useEffect(() => {
    localStorage.setItem("rememberMe", rememberMe.toString());
  }, [rememberMe]);
  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const validate = () => {
    let result = true;
    if (email_or_username === "" || email_or_username === null) {
      result = false;
      // toast.warning("Please Enter Username");
      window.document.querySelector(".err_message").innerHTML = "You did some thing wrong!"
      window.document.querySelector(".border_input").style.border = "1px solid #F03E3E"
    }
    if (password === "" || password === null) {
      result = false;
      window.document.querySelector(".err_pass_message").innerHTML = "You did some thing wrong!"
      window.document.querySelector(".border_pass").style.border = "1px solid #F03E3E"
    }
    return result;
  };

  return (
    <div>
      <div className="h-screen bg-no-repeat bg-gradient-to-b from-[#1A542F] to-[#000000]  slab lg:flex lg:items-center">
        <div className="w-[60%] lg:block hidden bg-no-repeat bg-gradient-to-b from-[#1A542F] to-[#000000]">
          <div className="text-white flex flex-col items-center">
            <div className="image-grid">
              <div className="image-item">
                <img src={anh1} alt="anh1"></img>
              </div>
              <div className="image-grid-2">
                <div className="image-item">
                  <img src={anh2} alt="anh2"></img>
                </div>
                <div className="image-item">
                  <img src={anh3} alt="anh3"></img>
                </div>
                <div className="image-item">
                  <img src={anh4} alt="anh4"></img>
                </div>
                <div className="image-item">
                  <img src={anh5} alt="anh5"></img>
                </div>
              </div>
              <div className="image-item image-grid-3">
                <div className="image-item">
                  <img src={anh4} alt="anh4"></img>
                </div>
                <div className="image-item">
                  <img src={anh5} alt="anh5"></img>
                </div>
              </div>
              <div className="image-item image-grid-4">
                <div className="image-item">
                  <img src={anh4} alt="anh4"></img>
                </div>
                <div className="image-item">
                  <img src={anh5} alt="anh5"></img>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-6xl mt-12 text-center">
                Create interesting videos with
              </p>
              <p className="text-6xl text-[#1DB954]">
                smart face swapping technology
              </p>
            </div>
            {/* dang ki */}
            {/* <button
                onClick={redirect}
                type="submit"
                className="buttons rounded-full lg:w-[300px] h-[35px] w-[100px] text-4xl my-14 text-white shadow-lg shadow-white-500"
              >
                Register
              </button> */}
          </div>
        </div>

        <div className="w-[40%] h-[100%]">
          <div className="bg-black flex flex-col w-[100%] h-[100%] z-30 opacity-75 ">
            <form className="" onSubmit={ProceedLogin}>
              <div className="flex flex-col">
                <div
                  className="text-8xl text-white text-center items-center mt-56"
                  style={{ fontFamily: "Starborn" }}
                >
                  Funny Face
                </div>
                <div className="flex flex-col items-center text-left  mx-16">
                  <div className="text-white mt-20 lg:w-[400px] lg:h-[35px] w-[300px] h-[35px]">
                    <div className="text-5xl text-left">Login</div>
                    <p className="text-3xl mt-12 text-left">
                      Log in with email address
                    </p>
                  </div>
                  <div className="mt-24">
                    <div className="input_group">
                      <div className="border_input ">
                        <div className="input_login flex justify-items-center items-center">
                          <MdEmail className="text-white text-2xl items-start mr-2" />
                          <input
                            type="text"
                            value={email_or_username}
                            placeholder="Email"
                            className="lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] text-white text-2xl"
                            onChange={(e) => usernameupdate(e.target.value)}
                          />
                        </div>                       
                      </div>
                      <div className="text-[#F03E3E] mt-2 ml-6 text-xl err_message"></div>
                      <div className="border_pass">
                        <div className="input_login flex justify-items-center items-center">
                          <FaLock className="text-white text-2xl mr-2" />
                          <input
                            type={isActive ? "text" : "password"}
                            value={password}
                            placeholder="Password"
                            className="lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] text-white text-2xl"
                            onChange={(e) => passwordupdate(e.target.value)}
                          />
                          <span onClick={handleClick}>
                            {isActive ? (
                              <FaEye className="text-white text-3xl" />
                            ) : (
                              <FaEyeSlash className="text-white text-3xl" />
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="text-[#F03E3E] mt-1 ml-6 text-xl err_pass_message"></div>
                      {/* <input
                          value={email_or_username}
                          onChange={(e) => usernameupdate(e.target.value)}
                          className="form_login lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] font-extrabold"
                          placeholder="Email"
                        ></input>
                      </div>
                      <div className="mt-12">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => passwordupdate(e.target.value)}
                          className="form-control lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] font-extrabold"
                          placeholder="Password"
                        ></input>
                      </div> */}
                      <div className="ml-4 flex w-full">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={handleRememberMeChange}
                          className="text-3xl text-white mr-4 cursor-pointer"
                        />
                        <span className="text-3xl text-white">Remember me</span>
                        <b className="text-xl text-green-400 mb-3 ml-auto cursor-pointer" onClick={forgot}>
                          Forgot password?
                        </b>
                      </div>
                    </div>
                    <div className="mt-10 ml-4 w-full">
                      {/* <button type="submit" className="btn btn-primary">Register</button> */}
                      <button
                        type="submit"
                        className=" rounded-lg mr-[16px] w-[450px] h-[35px] text-white text-4xl bg-[#1DB954]"
                        disabled={loading}
                      >
                        {loading ? 'Loading...' : 'Log in'}
                      </button>
                      {/* <p className="text-3xl text-white mt-12">
                      Do you want to{" "}
                      <b className="cursor-pointer" onClick={showReset}>
                        reset password?
                      </b>
                    </p> */}
                    </div>
                  </div>
                  <div className="flex items-center mt-9">
                    <hr className="flex-grow w-[187px] h-[10px] border-t-2 text-4xl text-gray-500 z-50" />
                    <span className="mx-4 text-gray-500 text-2xl">Or</span>
                    <hr className="flex-grow w-[187px] h-[10px] text-4xl border-t-2 text-gray-500 z-50" />
                  </div>
                  <div className="flex flex-col items-center mt-9">
                    <div className="text-3xl text-white mt-12">Log in with</div>
                    <div className="flex mt-3 gap-8">
                      <button
                        onClick={signInWithGoogle}
                        className="w-[220px] h-[48px] rounded-xl bg-[#FCFCFC] text-[#1A1D1F] text-lg py-3 px-5 flex items-center text-center"
                      >
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-9"
                        >
                          <g clipPath="url(#clip0_343_3151)">
                            <g clipPath="url(#clip1_343_3151)">
                              <path
                                d="M24.245 12.77C24.245 11.98 24.175 11.23 24.055 10.5H12.755V15.01H19.225C18.935 16.49 18.085 17.74 16.825 18.59V21.59H20.685C22.945 19.5 24.245 16.42 24.245 12.77Z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12.755 24.5C15.995 24.5 18.705 23.42 20.685 21.59L16.825 18.59C15.745 19.31 14.375 19.75 12.755 19.75C9.625 19.75 6.975 17.64 6.025 14.79H2.045V17.88C4.015 21.8 8.065 24.5 12.755 24.5Z"
                                fill="#34A853"
                              />
                              <path
                                d="M6.02501 14.79C5.77501 14.07 5.645 13.3 5.645 12.5C5.645 11.7 5.78501 10.93 6.02501 10.21V7.12H2.045C1.225 8.74 0.755005 10.56 0.755005 12.5C0.755005 14.44 1.225 16.26 2.045 17.88L6.02501 14.79Z"
                                fill="#FBBC05"
                              />
                              <path
                                d="M12.755 5.25C14.525 5.25 16.105 5.86 17.355 7.05L20.775 3.63C18.705 1.69 15.995 0.5 12.755 0.5C8.065 0.5 4.015 3.2 2.045 7.12L6.025 10.21C6.975 7.36 9.625 5.25 12.755 5.25Z"
                                fill="#EA4335"
                              />
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_343_3151">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="translate(0.5 0.5)"
                              />
                            </clipPath>
                            <clipPath id="clip1_343_3151">
                              <rect
                                width="24"
                                height="24"
                                fill="white"
                                transform="translate(0.5 0.5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span className="text-4xl">Google</span>
                      </button>
                      <button
                        // onClick={signInWithFacebook()}
                        className="w-[220px] h-[48px] rounded-xl bg-[#FCFCFC] text-[#1A1D1F] text-lg py-3 px-5 flex items-center text-center"
                      >
                        <svg
                          width="26"
                          height="25"
                          viewBox="0 0 26 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-9"
                        >
                          <path
                            d="M25.0733 12.5733C25.0733 5.90546 19.6679 0.5 13 0.5C6.33212 0.5 0.926666 5.90536 0.926666 12.5733C0.926666 18.5994 5.34173 23.5943 11.1135 24.5V16.0633H8.04805V12.5733H11.1135V9.91343C11.1135 6.88755 12.9161 5.21615 15.6738 5.21615C16.9948 5.21615 18.3764 5.45195 18.3764 5.45195V8.42313H16.854C15.3541 8.42313 14.8865 9.35381 14.8865 10.3086V12.5733H18.2349L17.6996 16.0633H14.8865V24.5C20.6583 23.5943 25.0733 18.5995 25.0733 12.5733Z"
                            fill="#1877F2"
                          />
                        </svg>
                        <span className="text-4xl">Facebook</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="flex mt-5 w-full m-auto mx-auto justify-center">
              <div className="text-[#6F767E] text-2xl mr-2">Don’t have an account?</div>
              <div className="text-[#1DB954] text-2xl cursor-pointer" onClick={redirect}>Sign up</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
