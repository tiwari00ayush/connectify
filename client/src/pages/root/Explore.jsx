import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import PostCard from "../../components/PostCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils";
import { Link } from "react-router-dom";
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
  return (
    <div className="flex-1 h-screen overflow-y-scroll py-10 px-1 md:px-10 ">
      <div>
        <h1 className="font-bold text-3xl my-2">Search Posts</h1>
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
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};

export default Explore;
