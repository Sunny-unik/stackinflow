import React from "react";
import { NavLink } from "react-router-dom";
import handleDate from "../helper/dateHelper";
import "../css/qls.css";

export default function QuestionBox({
  dataAos,
  questionId,
  questionTitle,
  likesCount,
  answersCount,
  tags,
  userObj,
  date
}) {
  return (
    <div className="rounded card">
      <div
        data-aos="fade-up"
        data-aos-duration="400"
        data-aos-offset="max-height"
        style={{ backgroundColor: "#fdf7e2", borderBottom: ".1rem solid grey" }}
      >
        <h4
          data-aos={dataAos}
          data-aos-duration="800"
          data-aos-offset="max-height"
          className="mainqdiv"
        >
          <NavLink
            style={{
              textDecorationLine: "none",
              textShadow: ".02em .04em black"
            }}
            to={`/question/${questionId}`}
          >
            {questionTitle}
          </NavLink>
        </h4>
        <div className="d-inline-block">
          <div
            className="qla bg-secondary"
            style={{ textShadow: "0.02em 0.08em black" }}
          >
            &nbsp;Likes: {likesCount}{" "}
          </div>
          <div className="qla bg-secondary">
            <NavLink
              style={{
                color: "white",
                textDecoration: "none",
                textShadow: "0.02em 0.08em black"
              }}
              to={`/question/${questionId}`}
            >
              &nbsp;Answers: {answersCount}{" "}
            </NavLink>
          </div>
        </div>
        <div className="maintagdiv mx-2">
          {tags.map((o) => {
            return (
              <span key={o}>
                <NavLink
                  style={{
                    color: "white",
                    fontFamily: "monospace",
                    padding: ".2rem",
                    textDecorationLine: "none"
                  }}
                  className="m-1 rounded bg-dark"
                  to={`/questionsBy/${o}`}
                >
                  {o.replace(",", "")}
                </NavLink>
              </span>
            );
          })}
        </div>
        <div className="maindnamediv">
          asked by &nbsp;
          <NavLink
            style={{ color: "navy", fontFamily: "SeogUI", fontWeight: "bold" }}
            to={`/user/${userObj._id}`}
          >
            {userObj.dname}
          </NavLink>
        </div>
        <div
          style={{
            width: "37%",
            display: "inline-block",
            margin: "6px",
            fontFamily: "SeogUI",
            fontWeight: "bold"
          }}
        >
          posted{" "}
          {handleDate(date) !== 0 ? handleDate(date) + " day ago" : "today"}
        </div>
      </div>
    </div>
  );
}
