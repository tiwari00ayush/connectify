import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { db } from "../utils";
import { useAuth } from "../context/AuthContext";

const Save = ({ postId }) => {
  const { currentUser } = useAuth();
  const handleSave = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      savedPost: arrayUnion(postId),
    });
  };
  const handleUnsave = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      savedPost: arrayRemove(postId),
    });
  };
  return (
    <div>
      {currentUser.savedPost.includes(postId) ? (
        <FaBookmark
          style={{ fontSize: "1.5rem", cursor: "pointer" }}
          onClick={handleUnsave}
        />
      ) : (
        <FaRegBookmark
          style={{ fontSize: "1.5rem", cursor: "pointer" }}
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Save;
