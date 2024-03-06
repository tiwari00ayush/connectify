import React from "react";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <div>
      <h1>Welcome to root</h1>
      <Outlet />
    </div>
  );
};

export default RootLayout;
