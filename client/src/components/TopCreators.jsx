import React, { useEffect, useState } from "react";
import TopCreatorsCard from "./TopCreatorsCard";
import { db } from "../utils";
import { collection, getDocs } from "firebase/firestore";

const TopCreators = () => {
  const [allUser, setAllUser] = useState([]);
  const [showTopCreators, setShowTopCreators] = useState(false);
  useEffect(() => {
    const getAllUser = async () => {
      const q = collection(db, "users");

      const querySnapshot = await getDocs(q);
      let temp = [];
      querySnapshot.forEach((doc) => {
        temp.push(doc.data());
      });
      temp.sort(function (a, b) {
        return a.followers.length < b.followers.length;
      });
      setAllUser(temp);
    };
    getAllUser();
  }, []);
  return (
    <>
      <div className="block absolute top-6 right-0 sm:hidden">
        <h1
          className="bg-[#1f1f21] py-1 px-2 font-bold cursor-pointer"
          onClick={() => setShowTopCreators(true)}
        >
          Top Creators
        </h1>
      </div>
      <div
        className={`flex-1 border-l-[0.2px] border-l-gray-100 py-5 px-3 h-screen overflow-y-scroll ${
          showTopCreators
            ? "absolute top-0 right-0 bottom-0 w-[75%] bg-black"
            : "hidden"
        }  sm:block`}
      >
        <span
          className="block sm:hidden cursor-pointer w-[30%] rounded-md py-2 px-2 text-center bg-red"
          onClick={() => setShowTopCreators(false)}
        >
          Close
        </span>
        <h1 className="text-2xl font-bold">Top Creators</h1>
        <div className="flex flex-wrap px-3 py-5 gap-4 justify-center ">
          {allUser.slice(0, 5).map((user, index) => (
            <TopCreatorsCard user={user} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TopCreators;
