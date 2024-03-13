import React, { useState } from "react";
import logo from "/logo.png";
import { useAuth } from "../context/AuthContext";
import { IoIosCreate } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { LuGalleryHorizontal } from "react-icons/lu";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils";

const SideBar = () => {
  const { currentUser } = useAuth();

  const sideBarOptions = [
    { ["icon"]: FaHome, ["text"]: "Home", ["to"]: "/" },
    { ["icon"]: LuGalleryHorizontal, ["text"]: "Explore", ["to"]: "/explore" },
    { ["icon"]: MdGroups2, ["text"]: "People", ["to"]: "/people" },
    { ["icon"]: FaBookmark, ["text"]: "Saved", ["to"]: "/saved" },
    { ["icon"]: IoIosCreate, ["text"]: "Create Post", ["to"]: "/createPost" },
  ];
  return (
    <div className=" h-screen px-2 relative s shadow-white w-fit md:max-w-[270px] md:w-full">
      <Link
        className="flex items-center  mb-6 justify-center md:justify-start translate-x-[-10px] "
        to={"/"}
      >
        <img
          src={logo}
          alt="logo"
          className="w-[80px] h-[80px] object-contain "
        />
        <span className="text-[1.4rem] font-bold hidden md:block">
          Connectify
        </span>
      </Link>
      <div className="px-1">
        <Link
          className="flex gap-2 items-center justify-center md:justify-start"
          to={`/profile/${currentUser?.uid}`}
        >
          <img
            src={currentUser?.photoURL}
            alt="dp"
            className="h-[50px] w-[50px] rounded-full"
          />
          <div className="hidden md:block">
            <h1>{currentUser?.displayName}</h1>
            <p className="text-[0.9rem] text-gray-400">
              {currentUser?.username}
            </p>
          </div>
        </Link>
        <div className="py-4">
          {sideBarOptions.map((menu, index) => (
            <Link
              to={menu.to}
              className="my-2 hover:bg-[#8585f8] ease-in-out duration-150 py-4 px-2 rounded-md flex items-end gap-3 justify-center md:justify-start"
              key={index}
            >
              <menu.icon style={{ fontSize: "1.7rem" }} />
              <span className="hidden md:block">{menu.text}</span>
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          signOut(auth);
        }}
        className="py-2 text-white bg-rose-700 w-full hover:bg-red absolute bottom-0 left-[50%] right-[50%] translate-x-[-50%]"
      >
        Sign out
      </button>
    </div>
  );
};

export default SideBar;
