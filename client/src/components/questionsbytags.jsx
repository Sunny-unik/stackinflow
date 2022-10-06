import axios from "axios";
import React, { useEffect, useState } from "react";
import Questionbox from "./questionbox";

export default function Questionsbytags(props) {
  const [question, setquestion] = useState([]);
  const tag = props.match.params.t;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/list-question`).then((res) => {
      console.log(res.data.data);
      setquestion(res.data.data);
    });
  }, []);

  const bytag = [];
  question.forEach((all) => {
    return all.tags.forEach((t) => {
      if (t === tag) bytag.push(all);
    });
  });

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
      {bytag.length > 0 ? (
        bytag.map((q) => {
          return (
            <Questionbox
              questionid={q._id}
              likes={q.qlikes.length}
              questiontitle={q.question}
              answer={q.answers.length}
              tags={q.tags}
              dataaos={"fade-left"}
              userdname={q.userdname}
              date={q.date}
            />
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
