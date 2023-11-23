import Header from "./Header";
import boy from "../components/image/Component131.png";
import l1 from "../components/image/loi-1.jpeg";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const DetailVideo = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [video, setVideo] = useState("");
  const [goc, Setgoc] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://metatechvn.store/lovehistory/sukien/video/${id}`
        );
        setData(response.data.sukien_video[0]);
        setVideo(response.data.sukien_video[0].link_vid_swap);
        Setgoc(response.data.sukien_video[0].link_video_goc);
        console.log("Video Value:", video);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(to right, #F0A3BF, #A86ED4)",
      }}
    >
      <Header />
      <p
        className="font-serif font-medium p-5 italic text-white"
        style={{ fontSize: "3em" }}
      >
        Success, this is the result !!
      </p>
      <div className="flex flex-col justify-center items-center">
        <div
          style={{
            backgroundImage: `url(${boy})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
          className="lg:w-[150px] lg:h-[150px] w-[90px] h-[90px]"
        >
          <img
            src={data.link_image}
            alt=""
            className="lg:w-[80%] lg:h-[80%] w-[80%] h-[80%] object-fill  rounded-full ml-2  mt-6 lg:mt-10 "
            style={{ position: "relative" }}
          />
        </div>
        <p className="font-serif p-9 text-white" style={{ fontSize: "2em" }}>
          {data.ten_su_kien}
        </p>
        <p className="font-serif p-1 text-white" style={{ fontSize: "2em" }}>
          {data.thoigian_taosk}
        </p>
        <div className="mt-10">
          <div className="p-4 inline-block border border-pink-500 rounded-lg shadow-lg overflow-hidden">
            <video
              className="w-[270px] h-auto"
              controls
              key={id}
              src={video}
            ></video>
          </div>
          <div className="p-4 inline-block border border-pink-500 rounded-lg shadow-lg overflow-hidden">
            <video
              className="w-[270px] h-auto"
              controls
              key={id}
              src={goc}
            ></video>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default DetailVideo;
