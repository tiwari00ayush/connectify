import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Loader from "../../components/Loader";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../utils";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const validateDisplayName = (displayName) => {
    if (displayName === "") {
      setErrors((prev) => {
        return { ...prev, ["displayName"]: "Displayname can't be empty" };
      });
      return 0;
    }
    const regex = /^[a-zA-Z\s]*$/; // contains only alphabet
    if (!regex.test(displayName)) {
      setErrors((prev) => {
        return {
          ...prev,
          ["displayName"]: "Only alphabet and space is allowed",
        };
      });

      return 0;
    }
    return 1;
  };

  const validateUsername = async (username) => {
    if (username === "") {
      setErrors((prev) => {
        return { ...prev, ["username"]: "username can't be empty" };
      });
      return 0;
    }

    const regex = /^[a-zA-Z0-9_.]*$/;
    if (!regex.test(username)) {
      setErrors((prev) => {
        return {
          ...prev,
          ["username"]: "username should contain only a-z,A-Z,0-9, _ and .",
        };
      });
      return 0;
    }
    const q = query(collection(db, "users"), where("username", "==", username));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setErrors((prev) => {
        return { ...prev, ["username"]: "username must be unqiue" };
      });
      return 0;
    }
    return 1;
  };

  const validatePassword = (password) => {
    if (password.length < 6 || password.length > 15) {
      setErrors((prev) => {
        return {
          ...prev,
          ["password"]: "Password should at least 8 and at most 15 characters",
        };
      });
      return 0;
    }
    var express =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    if (!password.match(express)) {
      setErrors((prev) => {
        return {
          ...prev,
          ["password"]:
            "password should contain atleast one uppercase, one lowercase, one digit and one character",
        };
      });
      return 0;
    }
    return 1;
  };
  const validateUserData = async (displayName, username, email, password) => {
    if (!validateDisplayName(displayName)) return 0;
    if (!(await validateUsername(username))) return 0;

    if (!validatePassword(password)) return 0;
    return 1;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setErrors({});
    const displayName = e.target[0].value;
    const username = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    // const temp = await
    if (!(await validateUserData(displayName, username, email, password))) {
      setLoading(false);
      return;
    }
    const photoURL =
      "https://firebasestorage.googleapis.com/v0/b/connectify-57b87.appspot.com/o/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg.avif?alt=media&token=0b8a66a9-524f-40b3-9b7b-2306b285b196";
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res?.user;
      await updateProfile(user, {
        displayName,
        photoURL,
      });
      try {
        const docRef = await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName,
          username,
          email,
          bio: "",
          photoURL,
          followers: [], // uid of other users this current user follow
          following: [user.uid], // uid of other users who follow this account
          likedPost: [], // post liked by this user
          savedPost: [], // post saved by this user
        });
        console.log("docRef", docRef);
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("email verification sent");
        });
      } catch (e) {
        console.error("Error setting document: ", e);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(error.message);
    }
  };
  console.log(errors["displayName"]);
  return (
    <form
      className="flex flex-col gap-1 w-[100%] max-w-[400px] text-white px-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-white font-bold text-3xl text-center">
        Create a new account
      </h1>
      <p className="text-gray-500 mt-2 my-5 text-center">
        To use connectify, please enter your details
      </p>

      <InputField
        id={"name"}
        label={"Name"}
        type={"text"}
        error={errors["displayName"]}
      />
      <InputField
        id={"username"}
        label={"Username"}
        type={"text"}
        error={errors["username"]}
      />
      <InputField id={"email"} label={"Email"} type={"email"} />
      <InputField
        id={"password"}
        label={"Password"}
        type={"password"}
        error={errors["password"]}
      />

      <button className="w-full py-3 text-white rounded-md bg-[#887ef7] my-3">
        {loading ? <Loader /> : "Sign up"}
      </button>

      <p className="text-center text-red">{error}</p>
      <p className="text-center">
        Already have an account ?{" "}
        <Link to={"/login"} className="text-[#887ef7]">
          Login
        </Link>
      </p>
    </form>
  );
};

export default Signup;
