import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionBox from "./QuestionBox";
import Spinner from "./loadings/Spinner";
import Error from "./Error";

export default function QuestionsByTag(props) {
  const tag = props.match.params.tag;
  const [questions, setQuestions] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question/tagged?tag=${tag}`)
      .then((res) =>
        setQuestions({ data: res.data.data, loading: false, error: null })
      )
      .catch((error) => setQuestions({ error, data: null, loading: false }));
  }, [tag]);

  return (
    <div style={{ minHeight: "64vh" }}>
      <h1>&nbsp;All following questions are related to '{tag}'.</h1>
      {questions.loading ? (
        <Spinner />
      ) : (
        <>
          {questions.data?.length ? (
            questions.data.map((q) => (
              <div key={q._id}>
                <QuestionBox
                  questionId={q._id}
                  likesCount={q.qlikes.length}
                  questionTitle={q.question}
                  answersCount={q.answers ? q.answers.length : 0}
                  tags={q.tags}
                  dataAos={"fade-left"}
                  userObj={q.userId ? q.userId : (q.userId = { dname: "404" })}
                  date={q.date}
                />
              </div>
            ))
          ) : (
            <Error
              statusCode={
                questions.data?.length === 0 ? 404 : questions.error.statusCode
              }
              message={
                questions.data?.length === 0 ? "No questions data found" : null
              }
              heading={questions.data?.length === 0 ? "Not found" : null}
            />
          )}
        </>
      )}
    </div>
  );
}
