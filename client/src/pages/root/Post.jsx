import React, { useEffect, useState } from "react";
import HomePost from "../../components/HomePost";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils";
const Post = () => {
  const { postid } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    const getPost = async () => {
      const docRef = doc(db, "posts", postid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setPost({ ["id"]: postid, ...docSnap.data() });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getPost();
  }, [postid]);
  return (
    <div className="h-screen flex-1 overflow-y-scroll py-10 px-2 md:px-10">
      <HomePost post={post} />
    </div>
  );
};

export default Post;
