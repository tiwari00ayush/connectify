import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import sideImg from "../../assets/images/side-img.svg";
import logo from "/logo.png";
const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <div>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <div className="w-full h-screen flex">
          <div className="flex-1 flex flex-col justify-center items-center bg-black">
            <img
              src={logo}
              alt="logo"
              className="w-[200px] h-[150px] object-contain"
            />
            <Outlet />
          </div>
          <div className="flex-1 hidden md:block">
            <img
              src={sideImg}
              alt="sideimg"
              className="h-screen w-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthLayout;
