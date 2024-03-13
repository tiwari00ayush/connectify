import React, { useState } from "react";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      console.log(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error?.message);
    }
  };

  return (
    <form
      className="flex flex-col gap-1 w-[100%] max-w-[400px] text-white px-2"
      onSubmit={handleSubmit}
    >
      <h1 className="text-white font-bold text-3xl text-center">
        Login to your account
      </h1>
      <p className="text-gray-500 mt-2 my-5 text-center">
        Welcome back! Please enter your details
      </p>

      <InputField id={"email"} label={"Email"} type={"email"} />
      <InputField id={"password"} label={"Password"} type={"password"} />

      <button className="w-full py-2 text-white rounded-md bg-[#887ef7] my-3">
        <Link to={"/"} className="text-white">
          {loading ? <Loader /> : "Login"}
        </Link>
      </button>
      <p className="text-center text-red">{error}</p>
      <p className="text-center">
        Don't have an account ?{" "}
        <Link to={"/signup"} className="text-[#887ef7]">
          Signup
        </Link>
      </p>
    </form>
  );
};

export default Login;
