import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../utils";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import SideBar from "../../components/SideBar";
import HomeFeed from "../../components/HomeFeed";
import TopCreators from "../../components/TopCreators";

const Home = () => {
  return (
    <div className="flex-1 flex">
      <HomeFeed />
      <TopCreators />
    </div>
  );
};

export default Home;
