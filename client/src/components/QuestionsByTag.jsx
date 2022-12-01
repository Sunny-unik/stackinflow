import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionBox from "./QuestionBox";
import Spinner from "./Spinner";

export default function QuestionsByTag(props) {
  const [questions, setquestions] = useState();
  const tag = props.match.params.tag;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question/list`)
      .then((res) =>
        setquestions(res.data.data.filter((q) => q.tags.includes(tag)))
      )
      .catch((err) => console.log(err));
  }, [questions, tag]);

  return (
    <div style={{ minHeight: "64vh" }}>
      <h1
        style={{
          borderBottom: "2px solid lightgrey",
          paddingBottom: "2%",
          fontFamily: "SeogUI"
        }}
      >
        &nbsp;All following questions are related to '{tag}'.
      </h1>
      {!questions ? (
        <Spinner />
      ) : questions.length !== 0 ? (
        questions.map((q) => (
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
        <h1 className="text-center mt-5 text-danger">
          Searched Tag is not listed
        </h1>
      )}
    </div>
  );
}
