import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuestionBox from "../QuestionBox";
import Error from "../Error";
import Spinner from "../loadings/Spinner";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

export default function LikedQuestions() {
  const user = useSelector((state) => state.user),
    userId = user._id,
    [questions, setQuestions] = useState({
      data: null,
      loading: true,
      error: null
    });

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/question/user-liked?userId=${userId}`
      )
      .then((res) =>
        setQuestions({ data: res.data.data, loading: false, error: null })
      )
      .catch((error) => setQuestions({ error, loading: false, data: null }));
  }, [userId]);

  return (
    <div className="border" style={{ minHeight: "64vh" }}>
      <h1 className="p-1 pb-2" style={{ borderBottom: "2px solid lightgrey" }}>
        &nbsp;All following questions are liked by {user.dname}.
      </h1>
      {questions.loading ? (
        <Spinner />
      ) : (
        <>
          {questions.data?.length ? (
            <>
              {questions.data.map((q) => (
                <QuestionBox
                  key={q._id + "_selfLiked"}
                  questionId={q._id}
                  likesCount={q.qlikesCount}
                  questionTitle={q.question}
                  answersCount={q.answersCount}
                  tags={q.tags}
                  dataAos={"fade-left"}
                  userObj={q.userId ? q.userId : (q.userId = { dname: "404" })}
                  date={q.date}
                />
              ))}
            </>
          ) : (
            <>
              {Array.isArray(questions.data) ? (
                <Error
                  heading="Not found"
                  statusCode="404"
                  message={NotLikedMessage()}
                />
              ) : (
                <Error />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

function NotLikedMessage() {
  return (
    <>
      <span className="fw-bold fs-5">
        Ooh, You didn't like any question for now,&nbsp;
        <NavLink to="/">start exploring questions</NavLink>.
      </span>
    </>
  );
}
