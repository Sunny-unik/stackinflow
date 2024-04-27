import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import handleDate from "../../helper/dateHelper";
import LikeButton from "./LikeButton";

export default function Answer({ answerObj, userId, setQuestion }) {
  const answerLikeClick = () => {
    if (!userId) return alert("For do this action you need to login first");
    axios
      .put(`${process.env.REACT_APP_API_URL}/answer/alike`, {
        userId,
        id: answerObj._id
      })
      .then((res) => {
        const updatedAnswer = { ...res.data.data, userId: answerObj.userId };
        setQuestion((prevState) => {
          return {
            data: {
              ...prevState.data,
              answers: [
                ...prevState.data.answers.filter(
                  (a) => a._id !== updatedAnswer._id
                ),
                updatedAnswer
              ].sort((x, y) => y.alikes.length - x.alikes.length)
            },
            error: null,
            loading: false
          };
        });
      })
      .catch(() => alert("Server failure, try again later!"));
  };

  return (
    <div className="border border-primary border-1 rounded mx-1 p-2 pb-3">
      <div className="mx-2 fs-5 fw-normal">
        {answerObj.answer
          .replace(/(?:\r\n|\r|\n)/g, "\n")
          .split("\n")
          .map((t, i) => (
            <p key={answerObj._id + "-para-" + i}>{t}</p>
          ))}
      </div>
      <div className="w-100 d-flex flex-nowrap justify-content-between mx-auto align-items-end px-2">
        <div>
          Given by{" "}
          <NavLink
            className="text-primary"
            style={{ fontFamily: "cursive" }}
            to={`/user/${answerObj.userId.dname}`}
          >
            {answerObj.userId.dname}
          </NavLink>{" "}
          {handleDate(answerObj.date) !== 0
            ? "on " + handleDate(answerObj.date) + " day ago"
            : "today"}
          .
        </div>
        <div>
          <LikeButton
            uid={userId}
            qlikes={answerObj.alikes}
            likeClick={answerLikeClick}
          />
        </div>
      </div>
    </div>
  );
}
