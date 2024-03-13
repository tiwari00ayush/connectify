import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { IoMdHeart } from "react-icons/io";
import { FaImage } from "react-icons/fa";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils";
import PostCard from "../../components/PostCard";
import { useParams } from "react-router-dom";
const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const { uid } = useParams();
  console.log(uid);
  useEffect(() => {
    const getCurrentUser = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setCurrentUser(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such user exist!");
      }
    };
    getCurrentUser();
  }, [uid]);
  useEffect(() => {
    const getPost = async () => {
      const q = query(
        collection(db, "posts"),
        where("owner", "==", currentUser?.uid)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) console.log("empty");
      let postArr = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        postArr.push(doc.data());
      });
      postArr.sort(function (a, b) {
        return a.timestamp > b.timestamp;
      });
      setPosts(postArr);
    };
    getPost();
  }, [currentUser]);
  console.log(posts);
  return (
    <div className="flex-1 py-10 px-2 md:px-10 h-screen overflow-y-scroll">
      <div className="flex justify-between flex-wrap mb-[100px]">
        <div className="flex items-center gap-5 flex-wrap">
          <img
            src={currentUser?.photoURL}
            alt="photoURL"
            className="w-[150px] h-[150px] object-contain rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold my-1">
              {currentUser?.displayName}
            </h1>
            <p className="text-gray-500 my-1">@{currentUser?.username}</p>
            <p className="my-1">BIO : {currentUser?.bio}</p>
            <div className="flex items-center gap-2 my-4 flex-wrap">
              <p>
                <span className="text-[#8585f8]">{posts.length}</span> Posts
              </p>
              <p>
                <span className="text-[#8585f8]">
                  {currentUser?.followers.length}{" "}
                </span>{" "}
                Followers
              </p>
              <p>
                <span className="text-[#8585f8]">
                  {currentUser?.following.length}{" "}
                </span>{" "}
                Following
              </p>
            </div>
          </div>
        </div>
        <div>
          <button className="py-2 px-4 bg-[#1f1f21] rounded-md m-4">
            Edit Profile
          </button>
        </div>
      </div>

      {/* ajsb */}
      <div className="flex flex-start items-center gap-2">
        <button className="py-2 w-[180px] bg-[#1f1f21] flex items-center gap-2 justify-center">
          <FaImage style={{ fontSize: "1.2rem", color: "#8585f8" }} />
          Posts
        </button>
        <button className="py-2 w-[180px] bg-[#1f1f21] flex items-center gap-2 justify-center">
          <IoMdHeart style={{ fontSize: "1.2rem", color: "#8585f8" }} />
          Liked Post
        </button>
      </div>

      {/* post page */}
      <div className="grid grid-cols-3 gap-4 py-10">
        {posts.map((post, index) => (
          <PostCard fileUrl={post.fileUrl} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
