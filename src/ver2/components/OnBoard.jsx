import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import copyRight from "../../ver2/components/image/copyRight.png";
import firstDateImg from "../../ver2/components/image/firstDateImg.png";
import heartImage from "../../ver2/components/image/heart-icon-madefuture.png";

function OnBoard() {
  const navigate = useNavigate();

  return (
    <>
      <div className=" w-full px-[140px] h-full  lg:py-7 py-3">
        <div className="flex items-center justify-between">
          {/* logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="lg:text-6xl text-3xl  text-white flex items-center starborn"
            >
              Future Love
            </Link>
          </div>

          {/* menu */}

          <div className="flex border-4 rounded-[16px] p-[8px] border-gray-500">
            <NavLink
              className="lg:text-4xl font-sans text-3xl py-[16px] px-[36px] rounded-[8px] text-white flex items-center "
              to="/register"
            >
              Sign Up
            </NavLink>

            <NavLink
              className="lg:text-4xl font-sans text-3xl rounded-[8px] py-[16px] px-[36px] bg-[#1DB954] text-white flex items-center"
              to="/login"
            >
              Login
            </NavLink>
          </div>
        </div>

        <div className="flex items-center justify-between w-full py-5 font-[Quicksand] font-bold mt-[120px]  ">
          <div className="justify-self-start text-[40px] lg:text-[80px] mr-[160px] leading-normal break-words  text-white">
            Bring any image to video.
          </div>
          <div className=" flex justify-self-end  flex-col gap-[10px] ">
            <h2 className="text-white text-base md:text-3xl">A.I Video</h2>
            <p className="text-base md:text-3xl text-[#FFFFFF80] leading-normal">
              Predict the future of your journey and love.
            </p>
            <button
              onClick={() => {
                navigate("login");
              }}
              className="rounded-[8px] py-[20px]  px-[36px] text-base md:text-3xl text-white bg-[#1DB954]"
            >
              Get started
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 min-h-[500px] mt-10">
          <div className="cols-span-1 h-full ">
            <div className="h-full  bg-gray-300 rounded-lg"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="col-span-1">
              <div className="h-full bg-gray-300 rounded-lg"></div>
            </div>
            <div className="col-span-1">
              <div className="h-full bg-gray-300 rounded-lg"></div>
            </div>
            <div className="col-span-1">
              <div className="h-full bg-gray-300 rounded-lg"></div>
            </div>
            <div className="col-span-1">
              <div className="h-full bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col font-[Quicksand]  items-center justify-center leading-normal mt-[80px] ">
          <div className="text-[rgb(255,255,255,0.5)] text-[64px]">
            Not just videos.
          </div>
          <div className="text-white text-[64px]">Create your own photos.</div>
          <div className="flex gap-3 justify-center items-center font-[Quicksand] py-5 font-semibold  ">
            <div className="  flex justify-center items-center rounded-3xl p-[12px] border-2 border-solid border-gray-600">
              <Link
                className="flex justify-center items-center gap-3 text-white"
                to={
                  "https://play.google.com/store/apps/details?id=com.thinkdiffai.futurelove"
                }
              >
                <img
                  src="https://i.rada.vn/data/image/2022/08/02/Google-Play-Store-200.png"
                  alt=""
                  className="max-lg:w-[35px] max-lg:h-[35px] w-[40px] h-[40px] hover:scale-105 transition-all cursor-pointer"
                />
                <div>
                  <p className="text-[12px]">Get it on</p>{" "}
                  <p className="text-[16px]">Google play</p>{" "}
                </div>
              </Link>
            </div>
            <div className=" flex justify-center items-center p-[12px] rounded-3xl  border-2 border-solid border-gray-600 ">
              <Link
                className="flex justify-center items-center gap-3 text-white"
                to={
                  "https://apps.apple.com/us/app/futurelove-ai-love-future/id6463770787"
                }
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                  alt=""
                  className="max-lg:w-[35px] max-lg:h-[35px] w-[40px] h-[40px] hover:scale-105 transition-all cursor-pointer"
                />
                <div>
                  {" "}
                  <p className="text-[12px]">Get it on</p>{" "}
                  <p className="text-[16px]">App store</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="grid-section min-h-[576px] bg-slate-100 mt-[80px] mb-[80px]"></div>
      </div>
      <div className="grid-section flex items-center px-10 min-h-[576px] bg-[#32323280] text-white font-sans mt-[80px] pt-[80px] ">
        <div className="flex-1 flex flex-col justify-self-center ml-8 h-full">
          <div className=" font-bold font-sans leading-normal text-[64px]">
            Predict your future events in love
          </div>
          <button
            onClick={() => {
              navigate("login");
            }}
            className=" max-w-xl py-[20px] mt-6 px-[36px] text-[28px] rounded-xl bg-[#1DB954]"
          >
            Try now!
          </button>
        </div>
        <div className="flex-1 h-full w-full flex flex-col">
          <img className=" self-end " src={firstDateImg} alt="firstdateImage" />
        </div>
      </div>
      <div className="made-future min-h-[460px] flex items-center justify-center">
        <div className=" border-3 rounded-full border-white px-[42px] py-[30px] flex gap-5 items-center">
          <img src={heartImage} alt="heart icon" className="h-[41px] " />
          <p className="text-[40px] text-white font-bold font-sans">
            Made with Future Love
          </p>
        </div>
      </div>
      <div className=" h-1 bg-white mx-[140px]"></div>
      <div className="flex flex-col justify-center items-center min-h-[260px]">
        <div className=" flex base:flex-row xs:flex-col text-[24px] text-white font-bold font-sans  justify-between gap-[100px] ">
          <Link>Contact us</Link>
          <Link>Term of use</Link>
          <Link to="policy">Privacy policy</Link>
        </div>
        <div className="flex gap-3 justify-center items-center font-[Quicksand] py-5 font-semibold  ">
          <div className="  flex justify-center items-center rounded-3xl p-[12px] border-2 border-solid border-gray-600">
            <Link
              className="flex justify-center items-center gap-3 text-white"
              to={
                "https://play.google.com/store/apps/details?id=com.thinkdiffai.futurelove"
              }
            >
              <img
                src="https://i.rada.vn/data/image/2022/08/02/Google-Play-Store-200.png"
                alt=""
                className="max-lg:w-[35px] max-lg:h-[35px] w-[40px] h-[40px] hover:scale-105 transition-all cursor-pointer"
              />
              <div>
                <p className="text-[12px]">Get it on</p>{" "}
                <p className="text-[16px]">Google play</p>{" "}
              </div>
            </Link>
          </div>
          <div className=" flex base:flex-row xs:flex-col justify-center items-center p-[12px] rounded-3xl  border-2 border-solid border-gray-600 ">
            <Link
              className="flex justify-center items-center gap-3 text-white"
              to={
                "https://apps.apple.com/us/app/futurelove-ai-love-future/id6463770787"
              }
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg"
                alt=""
                className="max-lg:w-[35px] max-lg:h-[35px] w-[40px] h-[40px] hover:scale-105 transition-all cursor-pointer"
              />
              <div>
                {" "}
                <p className="text-[12px]">Get it on</p>{" "}
                <p className="text-[16px]">App store</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="text-[16px] text-white font-sans font-medium flex items-center gap-2">
          <p>Copyright By Future Love</p>
          <img className="h-[24px]" src={copyRight} alt="" />
        </div>
      </div>
    </>
  );
}

export default OnBoard;
