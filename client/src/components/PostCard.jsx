import React, { useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
const PostCard = ({ fileUrl }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  return (
    <div className="relative rounded-lg hover:scale-105 cursor-pointer duration-150 ease-in-out">
      <img
        src={`${
          fileUrl
            ? fileUrl
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4y7zVmHqMDDZPFYCAtIvlWWGYofVYEwNg4AyzbXsRg&s"
        }`}
        alt="post photo"
        className="object-cover w-full h-[150px]  sm:h-[200px] lg:h-[300px] rounded-xl"
      />
      <div className="flex justify-between items-center absolute bottom-3 left-2 right-2">
        {isLiked ? (
          <IoMdHeart
            style={{ fontSize: "1.5rem", cursor: "pointer", color: "#f1566a" }}
            onClick={() => setIsLiked(false)}
          />
        ) : (
          <IoIosHeartEmpty
            style={{
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#f1566a",
            }}
            onClick={() => setIsLiked(true)}
          />
        )}
        {isBookMarked ? (
          <FaBookmark
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => setIsBookMarked(false)}
          />
        ) : (
          <FaRegBookmark
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={() => setIsBookMarked(true)}
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
