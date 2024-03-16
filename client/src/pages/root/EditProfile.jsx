import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import InputField from "../../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../utils";
import Loader from "../../components/Loader";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  applyActionCode,
  updateEmail,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const file = e.target[0].files[0];
    const displayName = e.target[1].value;
    const username = e.target[2].value;
    const email = e.target[3].value;
    const bio = e.target[4].value;
    // upload file
    if (file !== undefined) {
      const storageRef = ref(storage, `images/${currentUser?.username}`);

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
            try {
              await updateDoc(doc(db, "users", currentUser?.uid), {
                photoURL: downloadURL,
              });
            } catch (error) {
              console.log(error);
            }
          });
        }
      );
    }
    try {
      if (bio !== "")
        await updateDoc(doc(db, "users", currentUser?.uid), {
          bio: bio,
        });

      if (displayName !== "") {
        await updateDoc(doc(db, "users", currentUser?.uid), {
          displayName: displayName,
        });
      }
      if (email !== "") {
        var actionCodeSettings = {
          url: "https://www.example.com/cart?email=user@example.com&cartId=123",

          handleCodeInApp: true,
        };

        verifyBeforeUpdateEmail(auth.currentUser, email, null)
          .then(() => {
            console.log("email update link sent");
          })
          .catch((e) => {
            console.log(e);
          });

        // await updateDoc(doc(db, "users", currentUser?.uid), {
        //   email: email,
        // });
      }

      if (username !== "") {
        await updateDoc(doc(db, "users", currentUser?.uid), {
          username: username,
        });
      }
      setLoading(false);
      navigate(`/profile/${currentUser?.uid}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed w-full h-full bg-[#1f1f21] bg-opacity-50 flex flex-col justify-center items-center z-10 text-red">
          <Loader />
          <span className="text-3xl text-white">Upadting </span>
        </div>
      )}
      <div className="py-10 px-2 md:px-10 flex-1 h-screen overflow-y-scroll">
        <h1 className="font-bold text-3xl ">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-5 flex-wrap items-center mt-5 my-10">
            <img
              src={fileUrl ? fileUrl : currentUser.photoURL}
              alt="dp"
              className="w-[100px] h-[100px] rounded-full object-contain"
            />
            <label
              htmlFor="profilePicture"
              className="bg-[#8585f8] py-2 px-2 cursor-pointer rounded-md"
            >
              Change Profile Picture
            </label>
            <input
              type="file"
              className="hidden"
              id="profilePicture"
              onChange={(e) => {
                setFileUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
          <InputField
            id={"name"}
            label={"Name"}
            type={"text"}
            placeholder={currentUser?.displayName}
          />
          <InputField
            id={"username"}
            label={"Username"}
            type={"text"}
            placeholder={currentUser?.username}
          />
          <InputField
            id={"email"}
            label={"Email"}
            type={"email"}
            placeholder={currentUser?.email}
          />
          <label htmlFor="bio">Bio</label>
          <textarea
            name="bio"
            id="bio"
            className="w-full h-[100px] bg-[#1f1f21] pl-2 py-1 outline-none"
            placeholder={currentUser?.bio}
          ></textarea>
          <div className="flex flex-wrap items-center justify-end absolute bottom-10 right-10">
            <Link
              to={`/profile/${currentUser?.uid}`}
              className="py-2 px-2 mx-1 bg-white my-2 rounded-sm text-black"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="py-2 px-4 mx-1 bg-[#8585f8] my-2 rounded-sm text-white"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
