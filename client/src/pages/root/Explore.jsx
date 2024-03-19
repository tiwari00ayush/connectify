import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import PostCard from "../../components/PostCard";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../../utils";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../components/Loader";
const Explore = () => {
  const [allUser, setAllUser] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (searchVal === "") {
      setSearchResult([]);
    } else {
      setSearchResult(
        allUser.filter((user) => {
          return (
            user.displayName.includes(searchVal) ||
            user.username.includes(searchVal)
          );
        })
      );
    }
  }, [searchVal]);

  const [allPost, setAllPost] = useState([]);
  const [lastPost, setLastPost] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const getNextPost = async () => {
    if (loading) return;
    setLoading(true);
    const q = query(
      collection(db, "posts"),
      limit(3),
      orderBy("timestamp", "desc"),
      startAfter(lastPost.timestamp)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) setHasMore(false);
    let postArr = [];
    querySnapshot.forEach((doc) => {
      postArr.push({ ["id"]: doc.id, ...doc.data() });
    });
    setLastPost(postArr[postArr.length - 1]);
    postArr.sort(function (a, b) {
      return a.likeBy.length < b.likeBy.length;
    });
    setAllPost((prev) => [...prev, ...postArr]);
    setLoading(false);
  };
  useEffect(() => {
    const getAllPost = async () => {
      setLoading(true);
      setHasMore(true);
      const q = query(
        collection(db, "posts"),
        limit(6),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      let postArr = [];
      querySnapshot.forEach((doc) => {
        postArr.push({ ["id"]: doc.id, ...doc.data() });
      });
      setLastPost(postArr[postArr.length - 1]);
      postArr.sort(function (a, b) {
        return a.likeBy.length < b.likeBy.length;
      });

      setAllPost(postArr);
      setLoading(false);
    };
    getAllPost();
  }, []);

  useEffect(() => {
    const getAllUser = async () => {
      const q = collection(db, "users");

      const querySnapshot = await getDocs(q);
      let temp = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        temp.push(doc.data());
      });
      setAllUser(temp);
    };
    getAllUser();
  }, []);
  const handleScroll = (event) => {
    if (!hasMore) return;
    const element = event.target;
    // Check if the user has scrolled to the bottom of the posts section
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // If so, trigger an action (e.g., load more posts)
      getNextPost();
    }
  };

  return (
    <div
      className="flex-1 h-screen overflow-y-scroll py-10 px-1 md:px-10 "
      onScroll={handleScroll}
    >
      <div>
        <h1 className="font-bold text-3xl my-2">Search Users</h1>
        <div className="relative">
          <input
            type="text"
            className="w-full my-2 bg-[#1f1f21] rounded-md px-10 py-3 relative outline-none"
            placeholder="Search"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <CiSearch
            style={{
              position: "absolute",
              left: "10px",
              top: "22px",
              fontSize: "1.2rem",
            }}
          />
        </div>
        <div className="w-full ">
          {searchResult.map((res, index) => (
            <Link
              to={`/profile/${res.uid}`}
              className="flex items-center gap-2 w-full px-5 py-3  mb-2 rounded-md hover:bg-[#1f1f21] cursor-pointer"
              key={index}
            >
              <img
                src={res.photoURL}
                alt="dp"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="flex flex-col">
                <h1 className="font-bold text-[1.1rem]">{res.username}</h1>
                <p className="text-[0.9rem] text-gray-400">{res.displayName}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <h1 className="font-bold text-2xl my-2">Trending Posts</h1>
      <div className="grid grid-cols-3 gap-4">
        {allPost.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
      {loading && (
        <div className="py-2">
          <Loader />
        </div>
      )}
      {!hasMore && <p className="text-center text-2xl py-2">No more posts</p>}
    </div>
    // </InfiniteScroll>
  );
};

export default Explore;
