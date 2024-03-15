import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { IoMdHeart } from "react-icons/io";
import { FaImage } from "react-icons/fa";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../utils";
import PostCard from "../../components/PostCard";
import Follow from "../../components/Follow";
import { Link, useParams } from "react-router-dom";
const Profile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showPost, setshowPost] = useState(true);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollwing] = useState(false);
  const { uid } = useParams();
  useEffect(() => {
    const getuser = async () => {
      const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
        setUser(doc.data());
        return () => {
          unsub();
        };
      });
    };
    getuser();
  }, [uid]);
  const LikedPostId = currentUser.likedPost;
  useEffect(() => {
    const getLikedPost = async () => {
      console.log(LikedPostId);
      const LikedPostArr = [];
      for (let i = 0; i < LikedPostId.length; i++) {
        const postId = LikedPostId[i];
        try {
          const docRef = doc(db, "posts", postId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            LikedPostArr.push({ ["id"]: docSnap.id, ...docSnap.data() });
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
        } catch (error) {
          console.log(error);
        }
      }

      setLikedPosts(LikedPostArr);
    };
    getLikedPost();
  }, [LikedPostId]);
  useEffect(() => {
    const getPost = async () => {
      const q = query(collection(db, "posts"), where("owner", "==", user?.uid));

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) console.log("empty");
      let postArr = [];
      querySnapshot.forEach((doc) => {
        postArr.push({ ["id"]: doc.id, ...doc.data() });
      });
      postArr.sort(function (a, b) {
        return a.timestamp > b.timestamp;
      });
      setPosts(postArr);
    };
    getPost();
  }, [user]);
  console.log(likedPosts);
  return (
    <div className="flex-1 py-10 px-2 md:px-10 h-screen overflow-y-scroll">
      <div className="flex justify-between flex-wrap mb-[100px]">
        <div className="flex items-center gap-5 flex-wrap">
          <img
            src={user?.photoURL}
            alt="photoURL"
            className="w-[150px] h-[150px] object-contain rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold my-1">{user?.displayName}</h1>
            <p className="text-gray-500 my-1">@{user?.username}</p>
            <p className="my-1">{user?.bio}</p>
            <div className="flex items-center gap-2 my-4 flex-wrap">
              <p>
                <span className="text-[#8585f8]">{posts.length}</span> Posts
              </p>
              <p>
                <span className="text-[#8585f8]">
                  {user?.followers.length}{" "}
                </span>{" "}
                Followers
              </p>
              <p>
                <span className="text-[#8585f8]">
                  {user?.following.length - 1}{" "}
                </span>{" "}
                Following
              </p>
            </div>
          </div>
        </div>
        <div>
          {currentUser.uid === uid ? (
            <Link
              to={"/editProfile"}
              className="py-2 px-4 bg-[#1f1f21] rounded-md m-4"
            >
              Edit Profile
            </Link>
          ) : (
            <Follow uid={uid} />
          )}
        </div>
      </div>

      {/* ajsb */}
      <div className="flex flex-start items-center gap-2">
        <button
          onClick={() => setshowPost(true)}
          className="py-2 w-[180px] bg-[#1f1f21] flex items-center gap-2 justify-center"
        >
          <FaImage style={{ fontSize: "1.2rem", color: "#8585f8" }} />
          Posts
        </button>
        <button
          onClick={() => setshowPost(false)}
          className="py-2 w-[180px] bg-[#1f1f21] flex items-center gap-2 justify-center"
        >
          <IoMdHeart style={{ fontSize: "1.2rem", color: "#8585f8" }} />
          Liked Post
        </button>
      </div>

      {/* post page */}
      <div className="grid grid-cols-3 gap-4 py-10">
        {showPost
          ? posts.map((post, index) => <PostCard post={post} key={index} />)
          : likedPosts.map((post, index) => (
              <PostCard post={post} key={index} />
            ))}
      </div>
    </div>
  );
};

export default Profile;
