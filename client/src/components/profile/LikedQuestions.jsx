import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import handleDate from "../../helper/dateHelper";

export default function Likedquestions() {
  const user = useSelector((state) => state.user);
  const uid = useSelector((state) => state.user._id);
  const [question, setquestion] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question/list`)
      .then((res) => setquestion(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const userliked = [];
  question.forEach((all) => {
    return all.qlikes.forEach((u) => {
      if (u === uid) userliked.push(all);
    });
  });

  return (
    <div className="border" style={{ minHeight: "46vh" }}>
      <h1
        className="m-0"
        style={{ borderBottom: "2px solid lightgrey", paddingBottom: "2%" }}
      >
        &nbsp;All following questions are liked by {user.dname}.
      </h1>
      {userliked.map((g) => {
        return (
          <div className="m-0" style={{ border: ".1rem solid lightgrey" }}>
            <h4 className="mainqdiv">
              <NavLink
                style={{ textDecoration: "none" }}
                to={`/question/${g._id}`}
              >
                {g.question}
              </NavLink>
            </h4>
            <div className="qla bg-secondary"> Likes: {g.qlikes.length} </div>
            <div className="qla bg-secondary">
              <NavLink
                style={{ color: "black", textDecoration: "none" }}
                to={`/question/${g._id}`}
              >
                {" "}
                Answer: {g.answers.length}{" "}
              </NavLink>
            </div>
            <div className="maintagdiv mx-2">
              {g.tags.map((o) => {
                return (
                  <NavLink
                    style={{
                      color: "white",
                      fontFamily: "monospace",
                      padding: ".2rem"
                    }}
                    className="m-1 rounded-2 bg-dark"
                    to={`/questionsBy/${o}`}
                  >
                    {o}
                  </NavLink>
                );
              })}
            </div>
            <div
              className="maindnamediv"
              style={{ fontSize: ".9rem", fontFamily: "cursive" }}
            >
              asked by&nbsp;
              <NavLink
                style={{ color: "navy", fontFamily: "cursive" }}
                to={`/user/${g.userdname}`}
              >
                {user.dname}
              </NavLink>
            </div>
            <div
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
