import React, { useEffect, useState } from "react";
import HomePost from "./HomePost";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils";

const HomeFeed = () => {
  const [allPost, setAllPost] = useState([]);
  useEffect(() => {
    const getAllPost = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      let postArr = [];
      querySnapshot.forEach((doc) => {
        postArr.push(doc.data());
      });
      postArr.sort(function (a, b) {
        return a.timestamp < b.timestamp;
      });
      setAllPost(postArr);
    };
    getAllPost();
  }, []);
  console.log(allPost);
  return (
    <div className="flex-[2] h-screen overflow-y-scroll py-6 px-5 ">
      <h1 className="text-2xl font-bold ">Home Feed</h1>
      {allPost.map((post, index) => (
        <HomePost post={post} key={index} />
      ))}
    </div>
  );
};

export default HomeFeed;
