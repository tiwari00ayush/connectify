import React, { useEffect, useState } from "react";
import TopCreatorsCard from "./TopCreatorsCard";
import { db } from "../utils";
import { collection, getDocs } from "firebase/firestore";

const TopCreators = () => {
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    const getAllUser = async () => {
      const q = collection(db, "users");

      const querySnapshot = await getDocs(q);
      let temp = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

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
    <div className="flex-1 border-l-[0.2px] border-l-gray-100 py-5 px-3 h-screen overflow-y-scroll">
      <h1 className="text-2xl font-bold">Top Creators</h1>
      <div className="flex flex-wrap px-3 py-5 gap-4 justify-center ">
        {allUser.slice(0, 5).map((user, index) => (
          <TopCreatorsCard user={user} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TopCreators;
