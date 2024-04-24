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
    <div className="rounded card border">
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
          className="boxTitleWrapper text-truncate"
        >
          <NavLink className="fw-bolder" to={`/question/${questionId}`}>
            {questionTitle}
          </NavLink>
        </h4>
        <div className="d-inline-block">
          {(likesCount || likesCount === 0) && (
            <div className="px-3 qla bg-secondary">Likes: {likesCount}</div>
          )}
          {(answersCount || answersCount === 0) && (
            <div className="qla text-white bg-secondary">
              <NavLink
                className="text-white px-2"
                to={`/question/${questionId}`}
              >
                Answers: {answersCount}
              </NavLink>
            </div>
          )}
        </div>
        <div className="boxTagWrapper mx-2">
          {tags.map((o) => {
            return (
              <span key={o}>
                <NavLink
                  style={{
                    fontFamily: "monospace",
                    padding: ".2rem"
                  }}
                  className="m-1 text-white rounded bg-dark"
                  to={`/tagged/${o}`}
                >
                  {o.replace(",", "")}
                </NavLink>
              </span>
            );
          })}
        </div>
        <div className="boxDNameWrapper">
          asked by&nbsp;
          <NavLink
            style={{ color: "navy", fontWeight: "bold" }}
            to={`/user/${userObj.dname}`}
          >
            {userObj.dname}
          </NavLink>
        </div>
        <div
          style={{
            width: "37%",
            display: "inline-block",
            margin: "6px",
            fontFamily: "roboto",
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
