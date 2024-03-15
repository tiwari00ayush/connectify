import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../utils";

const Like = ({ postId }) => {
  const { currentUser } = useAuth();
  const handleLike = async () => {
    const postRef = doc(db, "posts", postId);
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(postRef, {
      likeBy: arrayUnion(currentUser.uid),
    });
    await updateDoc(userRef, {
      likedPost: arrayUnion(postId),
    });
  };
  const handleUnlike = async () => {
    const postRef = doc(db, "posts", postId);
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(postRef, {
      likeBy: arrayRemove(currentUser.uid),
    });
    await updateDoc(userRef, {
      likedPost: arrayRemove(postId),
    });
  };
  return (
    <div>
      {currentUser.likedPost.includes(postId) ? (
        <IoMdHeart
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#f1566a",
          }}
          onClick={handleUnlike}
        />
      ) : (
        <IoIosHeartEmpty
          style={{
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#f1566a",
          }}
          onClick={handleLike}
        />
      )}
    </div>
  );
};

export default Like;
