import React, { useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { db } from "../utils";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
const HomePost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [owner, setOwner] = useState(null);
  const date = new Date(post?.timestamp);
  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, "users", post?.owner);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setOwner(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getOwner();
  }, []);
  return (
    <div className="my-10 flex flex-col">
      <div className="flex items-center gap-2">
        <Link to={`/profile/${owner?.uid}`}>
          <img
            src={owner?.photoURL}
            alt="dp"
            className="w-[40px] h-[40px] rounded-full"
          />
        </Link>
        <div className="flex flex-col justify-start">
          <h1 className="font-bold text-[1.1rem]">{owner?.displayName}</h1>
          <div className="flex text-gray-400 text-[0.8rem] items-center flex-wrap">
            <p>
              {date.getDate()}-{date.getMonth()}-{date.getFullYear()},{" "}
              {date.getHours()}:{date.getMinutes()}
            </p>
            <p className="mx-1">{post?.location}</p>
          </div>
        </div>
      </div>
      <p className="my-2">{post?.caption}</p>
      <div className="flex gap-1 flex-wrap text-gray-400 my-1">
        {post?.tags.map((tag, index) => (
          <span key={index}>#{tag}</span>
        ))}
      </div>
      <img src={post?.fileUrl} alt="post photo" className="rounded-md my-2" />
      <div className="flex justify-between items-center">
        {isLiked ? (
          <IoMdHeart
            style={{ fontSize: "1.5rem", cursor: "pointer", color: "#f1566a" }}
            onClick={() => setIsLiked(false)}
          />
        ) : (
          <IoIosHeartEmpty
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#f1566a",
            }}
            onClick={() => setIsLiked(true)}
          />
        )}
        {isBookMarked ? (
          <FaBookmark
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => setIsBookMarked(false)}
          />
        ) : (
          <FaRegBookmark
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => setIsBookMarked(true)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePost;
