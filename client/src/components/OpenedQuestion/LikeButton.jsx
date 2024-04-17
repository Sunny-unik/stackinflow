// import axios from "axios";
import React from "react";
import { FcDislike, FcLike, FcLikePlaceholder } from "react-icons/fc";

export default function LikeButton({ uid, likesCount, likeClick }) {
  return (
    <button
      type="button"
      className="btn likebtn py-0 px-3 m-1 mb-0"
      onClick={() => likeClick()}
      style={{ width: "min-content" }}
    >
      {uid ? (
        likesCount.toString().includes(uid) === true ? (
          <FcLike />
        ) : (
          <FcLikePlaceholder />
        )
      ) : (
        <FcDislike />
      )}
      {likesCount
        ? likesCount.length !== undefined
          ? likesCount.length
          : 0
        : 0}
    </button>
  );
}
