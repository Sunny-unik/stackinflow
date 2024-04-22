import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import handleDate from "../../helper/dateHelper";
import QuestionBox from "../QuestionBox";

export default function Givenaswer() {
  const [question, setquestion] = useState([]);
  const user = useSelector((state) => state.user);
  const uid = useSelector((state) => state.user._id);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question/list`)
      .then((res) => setquestion(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const answer = [];
  question.forEach((q) => answer.push(...q.answers));

  const abyuser = [];
  answer.forEach((all) => {
    if (all.uid === uid) abyuser.push(all);
  });

  return (
    <div className="border" style={{ minHeight: "64vh" }}>
      <h1 className="p-1 pb-2" style={{ borderBottom: "2px solid lightgrey" }}>
        &nbsp;All following answers are given by {user.dname}.
      </h1>
      {abyuser.map((q) => (
        <QuestionBox
          key={q._id + "_givenAnswer"}
          questionId={q._id}
          likesCount={q.qlikes.length}
          questionTitle={q.question}
          answersCount={q.answers ? q.answers.length : 0}
          tags={q.tags}
          dataAos={"fade-left"}
          userObj={q.userId ? q.userId : (q.userId = { dname: "404" })}
          date={q.date}
        />
      ))}
    </div>
  );
}
