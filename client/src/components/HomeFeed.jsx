import React, { useEffect, useState } from "react";
import HomePost from "./HomePost";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils";
import { useAuth } from "../context/AuthContext";

const HomeFeed = () => {
  const [allPost, setAllPost] = useState([]);
  const { currentUser } = useAuth();
  const followingList = currentUser.following;
  useEffect(() => {
    const getAllPost = async () => {
      let postArr = [];
      for (let i = 0; i < followingList.length; i++) {
        const ownerId = followingList[i];
        try {
          const q = query(
            collection(db, "posts"),
            where("owner", "==", ownerId)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            postArr.push({ ["id"]: doc.id, ...doc.data() });
          });
        } catch (error) {
          console.log(error);
        }
      }
      postArr.sort(function (a, b) {
        return a.timestamp < b.timestamp;
      });
      setAllPost(postArr);
    };
    getAllPost();
  }, []);
  return (
    <div className="flex-[2] h-screen overflow-y-scroll py-6 sm:px-5 ">
      <h1 className="text-2xl font-bold ">Home Feed</h1>

      {currentUser.following.length === 1 ? (
        <div>Follow someone to see other user's posts</div>
      ) : (
        <span></span>
      )}
      {allPost.map((post, index) => (
        <HomePost post={post} key={index} />
      ))}
    </div>
  );
};

export default HomeFeed;
