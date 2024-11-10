import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayOut = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <Navbar></Navbar>
      <Outlet></Outlet>
      {/* <Footer></Footer> */}
    </div>
  );
};

export default MainLayOut;
