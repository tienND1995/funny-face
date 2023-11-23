// import Header from "../components/Header";
import EventHistory from "../components/eventHistory";
import Comments from "../components/comments";
import axios from "axios";
import React, { useEffect, useState } from "react";
import img from "../components/image/Screenshot_1.png";
import { BsFillHeartFill } from "react-icons/bs";
import { SlMenu } from "react-icons/sl";
import useEvenStore from "../../utils/store";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import OnBoard from "../components/OnBoard";
function Historyv2() {
  const version = useEvenStore((state) => state.version);
  const setVersion = useEvenStore((state) => state.setVersion);
  const navigate = useNavigate();

  return (
    <div
      className=" Historyv2 flex flex-col min-h-screen overflow-hidden"
      style={{ background: "black" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-6 sm:mx-10 lg:mx-16 justify-center">
        <div className="flex justify-center">
          <div className="flex-grow">{/* <EventHistory  /> */}</div>
        </div>
        <div>{/* <Comments /> */}</div>
      </div>
    </div>
  );
}

export default Historyv2;
