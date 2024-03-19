import React, { useCallback, useEffect, useState } from "react";
import HomePost from "./HomePost";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../utils";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";
const HomeFeed = () => {
  const [allPost, setAllPost] = useState([]);
  const [lastPost, setLastPost] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const getNextPost = async () => {
    if (loading) return;
    setLoading(true);
    let postArr = [];
    try {
      const q = query(
        collection(db, "posts"),
        orderBy("timestamp", "desc"),
        limit(9),
        where("owner", "in", currentUser.following),
        startAfter(lastPost.timestamp)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) setHasMore(false);
      querySnapshot.forEach((doc) => {
        postArr.push({ ["id"]: doc.id, ...doc.data() });
      });
    } catch (error) {
      console.log(error);
    }
    setLastPost(postArr[postArr.length - 1]);
    setAllPost((prev) => [...prev, ...postArr]);
    setLoading(false);
  };
  useEffect(() => {
    const getAllPost = async () => {
      setLoading(true);
      let postArr = [];
      try {
        const q = query(
          collection(db, "posts"),
          orderBy("timestamp", "desc"),
          limit(9),
          where("owner", "in", currentUser.following)
        );
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.empty);
        querySnapshot.forEach((doc) => {
          postArr.push({ ["id"]: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.log(error);
      }

      setLastPost(postArr[postArr.length - 1]);
      setAllPost(postArr);
      setLoading(false);
    };
    getAllPost();
  }, [currentUser.following]);
  const handleScroll = (event) => {
    if (loading) return;
    if (!hasMore) return;

    const e = event.target;
    if (e.scrollHeight === e.scrollTop + e.clientHeight) getNextPost();
  };
  return (
    <div
      className="flex-[2] h-screen overflow-y-scroll py-6 sm:px-5 "
      onScroll={handleScroll}
    >
      <h1 className="text-2xl font-bold ">Home Feed</h1>

      {currentUser.following.length === 1 ? (
        <div>Follow someone to see other user's posts</div>
      ) : (
        <span></span>
      )}
      {allPost.map((post) => (
        <HomePost post={post} key={post.id} />
      ))}
      {loading && <Loader />}
      {!hasMore && <p className="text-center text-2xl py-2">No More Post</p>}
    </div>
  );
};

export default HomeFeed;
