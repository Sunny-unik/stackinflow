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
  let amain;

  return (
    <div className="m-2 mb-0" key={answerObj.uid}>
      <div className="answersec">
        <h4 className="col-sm-10 mx-2">
          <div style={{ display: "none" }}>
            {(amain = answerObj.answer.replace(/(?:\r\n|\r|\n)/g, "\n"))}
          </div>
          {amain.split("\n").map(function (i) {
            return <p>{i}</p>;
          })}
        </h4>
        <button
          type="reset"
          className="col-sm-1 float-end mx-4 likebtn"
          style={{
            height: "min-content",
            border: "0",
            width: "min-content",
            fontSize: "large"
          }}
          onClick={() => answerLikeClick(answerObj.alikes, answerObj.date)}
        >
          <LikeButton
            uid={user?._id}
            likesCount={answerObj.alikes ? answerObj.alikes.length : 0}
            likeClick={answerLikeClick}
          />
        </button>
        <div className="col-sm-4 mx-2">
          Given By{" "}
          <NavLink
            style={{ fontFamily: "cursive" }}
            to={`/user/${answerObj.uid}`}
          >
            {answerObj.uid}
          </NavLink>{" "}
          <br />{" "}
          {handleDate(answerObj.date) !== 0
            ? "on " + handleDate(answerObj.date) + " day ago"
            : "today"}
          .
        </div>
      </div>
    </div>
  );
}
