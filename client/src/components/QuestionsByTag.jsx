import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionBox from "./QuestionBox";

export default function QuestionsByTag(props) {
  const [question, setquestion] = useState([]);
  const tag = props.match.params.t;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question/list`)
      .then((res) => setquestion(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const bytag = [];
  question.forEach((all) =>
    all.tags.forEach((t) => t === tag && bytag.push(all))
  );

  return (
    <div style={{ minHeight: "64vh" }}>
      <h1
        style={{
          borderBottom: "2px solid lightgrey",
          paddingBottom: "2%",
          fontFamily: "SeogUI"
        }}
      >
        {" "}
        All following questions are related to '{tag}'.
      </h1>
      {bytag.length > 0 ? (
        bytag.map((q) => {
          return (
            <div key={q._id}>
              <QuestionBox
                questionId={q._id}
                likesCount={q.qlikes.length}
                questionTitle={q.question}
                answersCount={q.answers.length}
                tags={q.tags}
                dataAos={"fade-left"}
                userObj={q.userdname}
                date={q.date}
              />
            </div>
          );
        })
      ) : (
        <h1 className="text-center mt-5 text-danger">
          Searched Tag is not listed
        </h1>
      )}
    </div>
  );
}
