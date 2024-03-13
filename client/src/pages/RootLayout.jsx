import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SideBar from "../components/SideBar";
const RootLayout = () => {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? (
        <div className="flex">
          <SideBar />
          <Outlet />
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};

export default RootLayout;
