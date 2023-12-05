import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";
import axios from "axios";
// import anh1 from "../../ver2/components/image/anhlogin1.png";
// import anh2 from "../../ver2/components/image/anhlogin2.png";
// import anh3 from "../../ver2/components/image/anhlogin3.png";
// import anh4 from "../../ver2/components/image/anhlogin4.png";
// import anh5 from "../../ver2/components/image/anhlogin5.png";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Register() {
  const [user_name, usernamechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [repassword, rePasswordchange] = useState("");
  const [loading, isLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const handleClick1 = () => {
    //  toggle isActive state on click
    setIsActive1((prevState) => !prevState);
  };
  const handleClick2 = () => {
    //  toggle isActive state on click
    setIsActive2((prevState) => !prevState);
  };
  const openModals = () => {
    setShowModal(true);
  };

  const server = "https://metatechvn.store";
  const redirect = () => {
    navigate("/login");
  };
  const forgot = () => {
    navigate("/forgot");
  };

  const IsValidate = () => {
    let isproceed = true;
    let errormessage = "Please enter the value in ";
    if (user_name === null || user_name === "") {
      isproceed = false;
      errormessage += " Username";
    }
    if (email === null || email === "") {
      isproceed = false;
      errormessage += " Email";
    }
    if (password === null || password === "") {
      isproceed = false;
      errormessage += " Password";
    }
    if (imageSrc === null) {
      isproceed = false;
      errormessage += "Image";
    }
    if (!isproceed) {
      toast.warning(errormessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isproceed = false;
        toast.warning("Please enter the valid email");
      }
    }
    return isproceed;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (IsValidate()) {
      isLoading(true);
      await uploadImg();
      console.log("====================================");
      console.log(imageName);
      console.log("====================================");
      formData.append("link_avatar", `https://i.ibb.co/vjVvZL5/${imageName}`);
      formData.append("user_name", user_name);
      formData.append("password", password);
      formData.append("email", email);
      try {
        const response = await axios.post(`${server}/register/user`, formData);

        console.log(response.data);
        if (response.data.account) {
          navigate("/");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        // Handle errors, if any
        console.log("sda", error);
      } finally {
        isLoading(false);
      }
    }
  };
  const handleImage = async (e) => {
    setImageSrc(e.target.files[0]);
    setImageName(e.target.files[0].name);
  };
  const uploadImg = async (e) => {
    try {
      var formData = new FormData();
      formData.append("image", imageSrc);
      const apiKey = "dc602cd2409c2f9f06d21dc9f6b26502";
      let body = new FormData();
      body.set("key", apiKey);
      body.append("image", imageSrc);

      await axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload",
        data: body,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
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
  return (
    <>
      <div>
        <div className="h-screen   slab lg:flex lg:items-center">
          <div className="w-[60%] h-[100%] lg:block hidden bg-[#D9D9D9]"></div>

          <div className="w-[40%] h-[100%] absolute right-0 top-0">
            <div className="bg-black flex flex-col w-[100%] h-[100%] z-30 opacity-75 ">
              <form className="" onSubmit={handlesubmit}>
                <div className="flex flex-col "> 
                  <div
                    className="text-8xl text-white text-center mb-5 items-center mt-10"
                    style={{ fontFamily: "Starborn" }}
                  >
                    Funny Face
                  </div>
                  <div className="flex flex-col items-center text-left  mx-16">
                    <div className="text-white mt-0 lg:w-[400px] lg:h-[35px] w-[300px] h-[35px]">
                      <div className="text-5xl text-left">Sign up</div>
                      <p className="text-3xl mt-3 text-left">
                        Sign up with email address
                      </p>
                    </div>
                    <div className="">
                      <div className="input_group flex flex-col items-center mt-20">
                        <div className=" justify-center w-[120px] h-[120px] rounded-full bg-[#343434] items-center">
                          <div
                            alt=""
                            className="flex flex-col justify-center items-center cursor-pointer"
                            onClick={openModals}
                          >
                            <svg
                              width="36"
                              height="36"
                              viewBox="0 0 36 36"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mt-9"
                            >
                              <path
                                d="M27 9C26.085 9 25.245 8.475 24.825 7.665L23.745 5.49C23.055 4.125 21.255 3 19.725 3H16.29C14.745 3 12.945 4.125 12.255 5.49L11.175 7.665C10.755 8.475 9.91501 9 9.00001 9C5.74501 9 3.16501 11.745 3.37501 14.985L4.15501 27.375C4.33501 30.465 6.00001 33 10.14 33H25.86C30 33 31.65 30.465 31.845 27.375L32.625 14.985C32.835 11.745 30.255 9 27 9ZM15.75 10.875H20.25C20.865 10.875 21.375 11.385 21.375 12C21.375 12.615 20.865 13.125 20.25 13.125H15.75C15.135 13.125 14.625 12.615 14.625 12C14.625 11.385 15.135 10.875 15.75 10.875ZM18 27.18C15.21 27.18 12.93 24.915 12.93 22.11C12.93 19.305 15.195 17.04 18 17.04C20.805 17.04 23.07 19.305 23.07 22.11C23.07 24.915 20.79 27.18 18 27.18Z"
                                fill="white"
                              />
                            </svg>

                            <div
                              className="text-white text-xl mt-1"
                              // style={
                              //   showImg.img1
                              //     ? { backgroundImage: `url(${showImg.img1})` }
                              //     : null
                              // }
                            >Upload image</div>                   
                          </div>
                        </div>
                        {showmodal ? (
                          <>
                          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative lg:w-[1000px] h-[600px] mt-60 max-w-3xl">
                              <div className="border-0 w-[672px] h-[303px] rounded-lg shadow-lg relative bg-[#323232] outline-none focus:outline-none">
                                <div className="relative p-6 flex-auto">
                                  <div className="flex flex-auto relative ">
                                    <p></p>
                                    <div></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          </>
                        ) : null}
                        <div className="border_input ">
                          <div className="input_login flex justify-items-center items-center">
                            <FaUser className="text-white text-2xl items-start mr-2" />
                            <input
                              type="text"
                              value={user_name}
                              placeholder="Username"
                              className="lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] text-white text-2xl"
                              onChange={(e) => usernamechange(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="border_input ">
                          <div className="input_login flex justify-items-center items-center">
                            <MdEmail className="text-white text-2xl items-start mr-2" />
                            <input
                              type="text"
                              value={email}
                              placeholder="Email"
                              className="lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] text-white text-2xl"
                              onChange={(e) => emailchange(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="border_input">
                          <div className="input_login flex justify-items-center items-center">
                            <FaLock className="text-white text-2xl mr-2" />
                            <input
                              type={isActive1 ? "text" : "password"}
                              value={repassword}
                              placeholder="Password"
                              className="lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] text-white text-2xl"
                              onChange={(e) => rePasswordchange(e.target.value)}
                            />
                            <span onClick={handleClick1}>
                              {isActive1 ? (
                                <FaEye className="text-white text-3xl" />
                              ) : (
                                <FaEyeSlash className="text-white text-3xl" />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="border_input">
                          <div className="input_login flex justify-items-center items-center">
                            <FaLock className="text-white text-2xl mr-2" />
                            <input
                              type={isActive2 ? "text" : "password"}
                              value={password}
                              placeholder="Enter the password"
                              className="lg:w-[400px] lg:h-[35px] w-[300px] h-[35px] text-white text-2xl"
                              onChange={(e) => passwordchange(e.target.value)}
                            />
                            <span onClick={handleClick2}>
                              {isActive2 ? (
                                <FaEye className="text-white text-3xl" />
                              ) : (
                                <FaEyeSlash className="text-white text-3xl" />
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex w-full">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                            className="text-3xl text-white mr-4 cursor-pointer"
                          />
                          <span className="text-3xl text-white">
                            Remember me
                          </span>
                          <b className="text-xl text-green-400 mb-3 ml-auto cursor-pointer" onClick={forgot}>
                            Forgot password?
                          </b>
                        </div>
                      </div>
                      <div className="mt-10 ml-4 w-full">
                        <button
                          type="submit"
                          className=" rounded-lg mr-[16px] w-[450px] h-[35px] text-white text-4xl bg-[#1DB954]"
                        >
                          Sign up
                        </button>
                        {/* <p className="text-3xl text-white mt-12">
                      Do you want to{" "}
                      <b className="cursor-pointer" onClick={showReset}>
                        reset password?
                      </b>
                    </p> */}
                      </div>
                    </div>
                    <div className="flex items-center mt-3">
                      <hr className="flex-grow w-[187px] h-[10px] border-t-2 text-4xl text-gray-500 z-50" />
                      <span className="mx-4 text-gray-500 text-2xl">Or</span>
                      <hr className="flex-grow w-[187px] h-[10px] text-4xl border-t-2 text-gray-500 z-50" />
                    </div>
                    <div className="flex flex-col items-center mt-9">
                      <div className="text-3xl text-white mt-3">
                        Log in with
                      </div>
                      <div className="flex mt-3 gap-8">
                        <button
                          // onClick={signInWithGoogle()}
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
              <div className="flex mt-3 w-full m-auto mx-auto justify-center">
                <div className="text-[#6F767E] text-2xl mr-2">
                  You have an account?
                </div>
                <div
                  className="text-[#1DB954] text-2xl cursor-pointer"
                  onClick={redirect}
                >
                  Log in
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
