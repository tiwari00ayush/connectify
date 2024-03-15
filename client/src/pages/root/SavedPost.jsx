import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils";
import { useAuth } from "../../context/AuthContext";
import PostCard from "../../components/PostCard";

const SavedPost = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const { currentUser } = useAuth();
  const savedPostId = currentUser.savedPost;
  useEffect(() => {
    const getSavedPost = async () => {
      let savedPostArr = [];
      for (let i = 0; i < savedPostId.length; i++) {
        const postId = savedPostId[i];
        try {
          const docRef = doc(db, "posts", postId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            savedPostArr.push({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log(error);
        }
      }

      setSavedPosts(savedPostArr);
    };

    getSavedPost();
  }, [savedPostId]);
  return (
    <div className="flex-1 py-10 px-2 md:px-10 h-screen overflow-y-scroll">
      <h1 className="font-bold text-3xl my-2">Saved Posts</h1>
      <div className="grid grid-cols-3 gap-4">
        {savedPosts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SavedPost;
