import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import handleDate from "../../helper/dateHelper";
import LikeButton from "./LikeButton";

export default function Answer({ answerObj, user, answerId }) {
  const answerLikeClick = (al, ad) => {
    if (!user) {
      alert("for do this action you need to login first");
    } else if (al.includes(user._id) === true) {
      const indexforpop = al.indexOf(user._id);
      al.splice(indexforpop, 1);
      const removealike = { ad, al, qid: answerId };
      axios
        .post(`${process.env.REACT_APP_API_URL}/remove-alike`, removealike)
        .then((res) => {
          console.log(res.data.data);
        });
      // setstatechange(statechange + 1 + 1);
    } else {
      const uid = user._id;
      const addqlike = { uid, qid: answerId, ad };
      axios
        .post(`${process.env.REACT_APP_API_URL}/add-alike`, addqlike)
        .then((res) => {
          console.log(res.data.data);
        });
      // setstatechange(statechange + 1 + 1);
    }
  };
  let amain = answerObj.answer.replace(/(?:\r\n|\r|\n)/g, "\n");

  return (
    <div className="bg-info rounded mx-1 p-2 pb-3">
      <div className="mx-2 fs-5 fw-normal">
        {amain.split("\n").map((i) => (
          <p>{i}</p>
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
            uid={user?._id}
            qlikes={answerObj.alikes}
            likeClick={answerLikeClick}
          />
        </div>
      </div>
    </div>
  );
}
