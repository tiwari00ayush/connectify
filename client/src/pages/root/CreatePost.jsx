import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { db, storage } from "../../utils";
import { useAuth } from "../../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
const CreatePost = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState([]);

  const handleCreate = async () => {
    setLoading(true);
    // 1. upload the file and get the url
    const timestamp = new Date().getTime(); // Get current timestamp
    const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
    const fileName = `${currentUser.uid}_${timestamp}_${randomString}.jpg`; // Constructing the unique file name

    const storageRef = ref(storage, `images/${fileName}`);
    // const storageRef = ref(storage, currentUser.username);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const time = new Date(timestamp);
          try {
            const docRef = await addDoc(collection(db, "posts"), {
              caption,
              ["fileUrl"]: downloadURL,
              ["likeBy"]: [],
              location,
              tags,
              ["owner"]: currentUser.uid,
              ["timestamp"]: time,
            });

            setLoading(false);
            navigate(`/profile/${currentUser.uid}`);
          } catch (e) {
            setLoading(false);
            console.error("Error setting document: ", e);
          }
        });
      }
    );
  };
  return (
    <>
      {loading ? (
        <div className="fixed w-full h-full bg-[#1f1f21] bg-opacity-50 flex flex-col justify-center items-center z-10 text-red">
          <Loader />
          <span className="text-3xl text-white">Loading </span>
        </div>
      ) : (
        <span></span>
      )}

      <div className="md:px-10 py-10 px-2 h-screen overflow-y-scroll flex-1 relative">
        <h1 className="text-3xl font-bold mb-10">Create Post</h1>
        <label htmlFor="caption">Caption</label>
        <textarea
          name="caption"
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="bg-[#1f1f21] w-full  min-h-[100px] rounded-md border-gray-400 border-2  outline-none px-2 py-2 mb-10 mt-3"
        ></textarea>
        <label htmlFor="file">Add Photos</label>
        <div className="relative bg-[#1f1f21] w-full min-h-[500px] flex justify-center items-center rounded-md border-gray-400 border-2 mb-10 mt-3 outline-none px-2 py-2">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="selected img"
              className="w-full max-h-[1000px] object-contain"
            />
          ) : (
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              id="file"
              required
            />
          )}
          {file && (
            <button
              onClick={() => setFile(null)}
              className="py-2 px-5 mx-1 bg-red my-2 rounded-md text-white absolute bottom-2 right-2"
            >
              <MdDelete />
            </button>
          )}
        </div>
        <label htmlFor="location">Add Location</label>
        <input
          name="location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-[#1f1f21] w-full  min-h-[10px] rounded-md border-gray-400 border-2  outline-none px-2 py-2 mb-10 mt-3"
        ></input>
        <label htmlFor="tags">Add Tags (seprated by comma)</label>
        <input
          name="tags"
          id="tags"
          className="bg-[#1f1f21] w-full  min-h-[10px] rounded-md border-gray-400 border-2  outline-none px-2 py-2 mb-10 mt-3"
          placeholder="art,science,trendy"
          value={tags}
          onChange={(e) => {
            const currentTags = e.target.value;
            setTags(currentTags.split(","));
          }}
        ></input>
        <div className="flex justify-end items-stretch">
          <button className="py-2 px-5 mx-1 bg-[#1f1f21] my-2 rounded-md text-white">
            Cancel
          </button>
          <button
            className="py-2 px-2 mx-1 bg-[#8585f8] my-2 rounded-md text-white"
            onClick={handleCreate}
          >
            Create Post
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
