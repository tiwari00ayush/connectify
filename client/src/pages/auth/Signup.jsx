import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../components/InputField";
import Loader from "../../components/Loader";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../utils";
// complete the form validation
// 1. password contains char, digit, capital, small, 8 to 15 char
// 2. username - unique, required
// 3. email - should be good, required
// 4. name - required, contains at least 2 character and at most 20 characters
const Signup = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const checkPass = (password) => {
  //   setError(null);
  //   console.log("checking password");
  //   if (password.length < 8 || password.length > 15) {
  //     setError("Password should at least 8 and at most 15 characters");
  //     return;
  //   }
  //   var express =
  //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  //   if (!password.match(express))
  //     setError(
  //       "password should contain atleast one uppercase, one lowercase, one digit"
  //     );
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const displayName = e.target[0].value;
    const uid = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    setFormData({ displayName, uid, email, password });
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res?.user;
      console.log(user);
      updateProfile(user, {
        displayName,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/connectify-57b87.appspot.com/o/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg.avif?alt=media&token=35b44b2e-812b-40aa-bcd8-b836a038328b",
      });

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(error.message);
    }
  };

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

      <InputField id={"name"} label={"Name"} type={"text"} />
      <InputField id={"username"} label={"Username"} type={"text"} />
      <InputField id={"email"} label={"Email"} type={"email"} />
      <InputField id={"password"} label={"Password"} type={"password"} />

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
