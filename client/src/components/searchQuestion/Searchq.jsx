import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionBox from "../questionBox";

export default function Searchq(props) {
  const [questions, setquestions] = useState([]);
  const search = props.location.searchedQuestion;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question/search?search=${search}`)
      .then((res) => setquestions(res.data.data));
  }, [search]);

  return (
    <div className="border" style={{ minHeight: "70vh" }}>
      <p
        className="card p-1 display-5 border"
        style={{ fontFamily: "SeoogUI", textShadow: ".02em .02em blue" }}
      >
        Questions relates to '{search}'
      </p>
      <div className="w-100 bg-light">
        {questions.length ? (
          questions.map((q) => (
            <div key={q._id}>
              <QuestionBox
                questionId={q._id}
                likesCount={q.qlikes.length}
                questionTitle={q.question}
                answersCount={q.answers ? q.answers.length : 0}
                tags={q.tags}
                dataAos={"fade-up"}
                userObj={q.userId ? q.userId : (q.userId = { dname: "404" })}
                date={q.date}
              />
            </div>
          ))
        ) : (
          <h2 className="text-center text-danger card">!Question not Found</h2>
        )}
      </div>
    </div>
  );
}
