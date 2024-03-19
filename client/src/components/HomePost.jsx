import React, { useEffect, useState } from "react";
import { db } from "../utils";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Like from "./Like";
import Save from "./Save";
const HomePost = ({ post }) => {
  if (post === null) return;
  const [owner, setOwner] = useState(null);
  const date = new Date(post?.timestamp.seconds * 1000);
  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, "users", post?.owner);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
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
        <div className="flex items-center gap-2">
          <Like postId={post?.id} />
          {post?.likeBy.length}
        </div>
        <Save postId={post?.id} />
      </div>
    </div>
  );
};

export default HomePost;
