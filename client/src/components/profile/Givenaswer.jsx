import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import handleDate from "../../helper/dateHelper";

export default function Givenaswer() {
  const [question, setquestion] = useState([]);
  const user = useSelector((state) => state.user);
  const uid = useSelector((state) => state.user._id);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/list-question`).then((res) => {
      console.log(res.data.data);
      setquestion(res.data.data);
    });
  }, []);

  const answer = [];
  question.forEach((q) => answer.push(...q.answers));

  const abyuser = [];
  answer.forEach((all) => {
    if (all.uid === uid) abyuser.push(all);
  });

  return (
    <div style={{ minHeight: "64vh" }}>
      <h1 style={{ borderBottom: "2px solid lightgrey", paddingBottom: "2%" }}>
        &nbsp;All following answers are given by {user.dname}.
      </h1>
      {abyuser.map((g) => {
        return (
          <div className=" my-1" style={{ border: ".1rem solid lightgrey" }}>
            <NavLink to={`/question/${g.qid}`}>
              <h4 className="mainqdiv ">{g.answer}</h4>
            </NavLink>
            <div className="qla bg-primary m-2"> Likes: {g.alikes.length} </div>
            <div
              className="maindnamediv m-1"
              style={{ fontSize: ".9rem", fontFamily: "cursive" }}
            >
              given by&nbsp;
              <NavLink
                style={{ color: "navy", fontFamily: "cursive" }}
                to={`/user/${g.uid}`}
              >
                {user.dname}
              </NavLink>
            </div>
            <div
              className="m-1"
              style={{
                width: "37%",
                display: "inline-block",
                margin: "6px",
                fontFamily: "Times"
              }}
            >
              posted{" "}
              {handleDate(g.date) !== 0
                ? handleDate(g.date) + " day ago"
                : "today"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
