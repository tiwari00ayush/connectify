import React from "react";
import { Link } from "react-router-dom";
import Follow from "./Follow";

const TopCreatorsCard = ({ user }) => {
  return (
    <div className="flex flex-col py-2 w-[150px]  border-[0.5px] border-gray-700 min-h-[250px] h-[100%] justify-center items-center rounded-md">
      <Link
        to={`/profile/${user.uid}`}
        className="flex flex-col justify-center items-center"
      >
        <img
          src={user?.photoURL}
          alt=""
          className="w-[60px] h-[60px] rounded-full border-[1px] border-white mb-2"
        />
        <h1 className="text-center">{user?.displayName}</h1>
        <p className="text-[0.9rem] text-gray-400 my-1">{user?.username}</p>
      </Link>
      <Follow uid={user.uid} />
    </div>
  );
};

export default TopCreatorsCard;
