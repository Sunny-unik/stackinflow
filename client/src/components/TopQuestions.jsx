import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "./loadings/Spinner";
import QuestionBox from "./QuestionBox";
import Error from "./Error";

export default function TopQuestions() {
  const [data, setData] = useState({
    questions: null,
    loading: true,
    error: null
  });
  const [sortBy, setSortBy] = useState("mostLiked");

  useEffect(() => {
    const limit = 100;
    let route = `/question/most-liked?limit=${limit}`;
    if (sortBy === "notAnswered") route = `/question/answer-filter?type=eq`;
    else if (sortBy === "oldest") route = `/question/oldest?limit=${limit}`;
    else if (sortBy === "newest") route = `/question/newest?limit=${limit}`;
    else if (sortBy === "mostAnswered")
      route = `/question/answer-filter?type=ne`;
    axios
      .get(process.env.REACT_APP_API_URL + route)
      .then((res) =>
        setData({ questions: res.data.data, loading: false, error: null })
      )
      .catch((error) => setData({ questions: null, loading: false, error }));
  }, [sortBy]);

  return (
    <div
      className="row p-1"
      style={{ minHeight: "80vh", alignContent: "start" }}
    >
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
            onChange={(e) => setSortBy(e.target.labels[0].id)}
          />
          <label
            id="mostLiked"
            className={
              sortBy === "mostLiked"
                ? "btn btn-outline-primary active"
                : "btn btn-outline-primary"
            }
            htmlFor="btnradio1"
          >
            Most Liked
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            onChange={(e) => setSortBy(e.target.labels[0].id)}
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
            onChange={(e) => setSortBy(e.target.labels[0].id)}
          />
          <label
            id="newest"
            className={
              sortBy === "newest"
                ? "btn btn-outline-primary active"
                : "btn btn-outline-primary"
            }
            htmlFor="btnradio3"
          >
            Newest
          </label>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio4"
            onChange={(e) => setSortBy(e.target.labels[0].id)}
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
            onChange={(e) => setSortBy(e.target.labels[0].id)}
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
      {data.loading ? (
        <Spinner />
      ) : (
        <>
          {data.questions?.length ? (
            <div>
              {data.questions.map((q) => {
                return (
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
                    key={q._id}
                  />
                );
              })}
            </div>
          ) : (
            <Error
              statusCode={
                data.questions?.length === 0 ? 404 : data.error.statusCode
              }
              message={
                data.questions?.length === 0 ? "No such data found" : null
              }
            />
          )}
        </>
      )}
    </div>
  );
}
AOS.init();
