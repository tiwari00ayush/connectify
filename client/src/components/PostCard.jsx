import React, { useState } from "react";
import { Link } from "react-router-dom";
import Like from "./Like";
import Save from "./Save";
const PostCard = ({ post }) => {
  return (
    <div className="relative rounded-lg hover:scale-105 cursor-pointer duration-150 ease-in-out">
      <Link to={`/post/${post.id}`}>
        <img
          src={post?.fileUrl}
          alt="post photo"
          className="object-cover w-full h-[150px]  sm:h-[200px] lg:h-[300px] rounded-xl"
        />
      </Link>
      <div className="flex justify-between items-center absolute bottom-3 left-2 right-2">
        <div className="flex gap-2 items-center">
          <Like postId={post.id} />
          {post.likeBy.length}
        </div>
        <Save postId={post.id} />
      </div>
    </div>
  );
};

export default PostCard;
