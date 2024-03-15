import React from "react";

const InputField = ({ label, id, type, error, placeholder }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder || ""}
        type={type}
        className={`w-full rounded-md bg-[#1f1f21] h-[40px] pl-2 outline-none  ${
          error ? "border-red border-[1px] mb-1" : "mb-3"
        }`}
        id={id}
      />
      <p className="text-center text-red text-[0.9rem]">{error}</p>
    </>
  );
};

export default InputField;
