import React, { useState } from "react";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    setFormData({ email, password });
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
        Login
      </button>

      <p className="text-center">
        Don't have an account ?{" "}
        <Link to={"/signup"} className="text-[#887ef7]">
          {loading ? <Loader /> : "Sign up"}
        </Link>
      </p>
    </form>
  );
};

export default Login;
