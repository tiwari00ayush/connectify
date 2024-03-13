import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../utils";
import { useAuth } from "../context/AuthContext";

const Follow = ({ uid }) => {
  const { currentUser } = useAuth();

  const handleFollow = async () => {
    const otherUser = doc(db, "users", uid);
    const thisUser = doc(db, "users", currentUser.uid);
    await updateDoc(otherUser, {
      followers: arrayUnion(currentUser.uid),
    });
    await updateDoc(thisUser, {
      following: arrayUnion(uid),
    });
  };
  const handleUnfollow = async () => {
    const otherUser = doc(db, "users", uid);
    const thisUser = doc(db, "users", currentUser.uid);
    await updateDoc(otherUser, {
      followers: arrayRemove(currentUser.uid),
    });
    await updateDoc(thisUser, {
      following: arrayRemove(uid),
    });
  };
  return (
    <>
      {currentUser.following.includes(uid) ? (
        <button
          onClick={handleUnfollow}
          className="py-2 w-[75%] mx-1 bg-white my-2 rounded-sm text-black"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={handleFollow}
          className="py-2 w-[75%] mx-1 bg-[#8585f8] my-2 rounded-sm text-white"
        >
          Follow
        </button>
      )}
    </>
  );
};

export default Follow;
