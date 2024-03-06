import React from "react";
import loader from "../assets/icons/loader.svg";
const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <img src={loader} alt="loader" className="object-contain" />
    </div>
  );
};

export default Loader;
