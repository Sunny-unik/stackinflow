import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuestionBox from "../QuestionBox";
import Error from "../Error";
import Spinner from "../loadings/Spinner";

export default function GivenAnswers() {
  const user = useSelector((state) => state.user);
  const [answers, setAnswers] = useState({
    data: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/answer/per-user?userId=${user._id}`
      )
      .then((res) =>
        setAnswers({ data: res.data.data, loading: false, error: null })
      )
      .catch((error) => setAnswers({ data: null, loading: false, error }));
  }, [user._id]);

  return (
    <div className="border" style={{ minHeight: "64vh" }}>
      <h1
        className="p-1 pb-2 mb-0"
        style={{ borderBottom: "2px solid lightgrey" }}
      >
        &nbsp;All following answers are given by {user.dname}.
      </h1>
      {answers.loading ? (
        <Spinner />
      ) : (
        <>
          {answers.data?.length ? (
            <>
              {answers.data.map((a) => (
                <QuestionBox
                  key={a._id + "_givenAnswer"}
                  questionId={a.questionData?._id}
                  likesCount={a.alikesCount}
                  questionTitle={a.answer}
                  tags={a.questionData?.tags}
                  dataAos={"fade-left"}
                  userObj={{ dname: user.dname }}
                  date={a.date}
                />
              ))}
            </>
          ) : (
            <>
              {Array.isArray(answers.data) ? (
                <Error
                  heading="Not found"
                  statusCode="404"
                  message={"You have not answered any question"}
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
