import React from "react";
import { FcDislike, FcLike, FcLikePlaceholder } from "react-icons/fc";

export default function LikeButton({ uid, qlikes, likeClick }) {
  return (
    <button
      type="button"
      className="btn likeButton py-0 px-3 m-1 mb-0"
      onClick={() => likeClick()}
      style={{ width: "min-content" }}
    >
      {uid ? (
        qlikes.includes(uid) ? (
          <FcLike />
        ) : (
          <FcLikePlaceholder />
        )
      ) : (
        <FcDislike />
      )}
      {qlikes.length || qlikes.length === 0 ? qlikes.length : "Not Found"}
    </button>
  );
}
