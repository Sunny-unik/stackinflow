import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "../Spinner";
import QuestionBox from "../QuestionBox";
import "../css/spinner.css";

export default function Topquestions() {
  const [questions, setquestions] = useState();
  const [sortBy, setsortBy] = useState("newest");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/question/list`).then((res) => {
      const data = res.data.data;
      if (sortBy === "newest") {
        setquestions(data.reverse());
      } else if (sortBy === "oldest") {
        setquestions(data);
      } else if (sortBy === "mostLiked") {
        setquestions(
          data
            .sort((a, b) => {
              return a.qlikes.length - b.qlikes.length;
            })
            .reverse()
        );
      } else if (sortBy === "notAnswered") {
        setquestions(
          data.reverse().filter((a) => {
            const answersLength = a.answers ? a.answers.length : 0;
            return answersLength === 0;
          })
        );
      } else if (sortBy === "mostAnswered") {
        setquestions(
          data
            .sort((a, b) => {
              const aLength = a.answers ? a.answers.length : 0;
              const bLength = b.answers ? b.answers.length : 0;
              return aLength - bLength;
            })
            .reverse()
        );
      }
    });
  }, [sortBy]);

  return (
    <div
      className="row p-0"
      style={{ borderLeft: "2px solid lightgrey", minHeight: "80vh" }}
    >
      {questions && (
        <>
          <div>
            <h1 className="d-inline-block"> Top Questions </h1>
            <div
              className="btn-group float-end p-2"
              role="group"
              aria-label="question-filter-toggle-group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                onChange={(e) => setsortBy(e.target.labels[0].id)}
              />
              <label
                id="newest"
                className={
                  sortBy === "newest"
                    ? "btn btn-outline-primary active"
                    : "btn btn-outline-primary"
                }
                htmlFor="btnradio1"
              >
                Newest
              </label>
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                onChange={(e) => setsortBy(e.target.labels[0].id)}
              />
              <label
                id="oldest"
                className={
                  sortBy === "oldest"
                    ? "btn btn-outline-primary active"
                    : "btn btn-outline-primary"
                }
                htmlFor="btnradio2"
              >
                Oldest
              </label>
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio3"
                onChange={(e) => setsortBy(e.target.labels[0].id)}
              />
              <label
                id="mostLiked"
                className={
                  sortBy === "mostLiked"
                    ? "btn btn-outline-primary active"
                    : "btn btn-outline-primary"
                }
                htmlFor="btnradio3"
              >
                Most Liked
              </label>
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio4"
                onChange={(e) => setsortBy(e.target.labels[0].id)}
              />
              <label
                id="mostAnswered"
                className={
                  sortBy === "mostAnswered"
                    ? "btn btn-outline-primary active"
                    : "btn btn-outline-primary"
                }
                htmlFor="btnradio4"
              >
                Most Answered
              </label>
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio5"
                onChange={(e) => setsortBy(e.target.labels[0].id)}
              />
              <label
                id="notAnswered"
                className={
                  sortBy === "notAnswered"
                    ? "btn btn-outline-primary active"
                    : "btn btn-outline-primary"
                }
                htmlFor="btnradio5"
              >
                Not Answered
              </label>
            </div>
          </div>
          <div>
            {questions.map((q) => {
              return (
                <div key={q._id}>
                  <QuestionBox
                    questionId={q._id}
                    likesCount={q.qlikes.length}
                    questionTitle={q.question}
                    answersCount={q.answers ? q.answers.length : 0}
                    tags={q.tags}
                    dataAos={"fade-up"}
                    userObj={
                      q.userId ? q.userId : (q.userId = { dname: "404" })
                    }
                    date={q.date}
                  />
                </div>
              );
            })}
            {!questions && <Spinner />}
          </div>
        </>
      )}
      {!questions && <Spinner />}
    </div>
  );
}
AOS.init();
