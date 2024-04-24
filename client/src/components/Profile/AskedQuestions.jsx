import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import QuestionBox from "../QuestionBox";
import Error from "../Error";
import Spinner from "../loadings/Spinner";

export default function AskedQuestions() {
  const user = useSelector((state) => state.user);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/question/per-user?userId=${user._id}`
      )
      .then((res) =>
        setQuestions({ data: res.data.data, loading: false, error: null })
      )
      .catch((error) => console.log({ error, data: null, loading: false }));
  }, [user._id]);

  return (
    <div className="border" style={{ minHeight: "64vh" }}>
      <h1 className="p-1 pb-2" style={{ borderBottom: "2px solid lightgrey" }}>
        &nbsp;All following questions are posted by {user.dname}.
      </h1>
      {questions.loading ? (
        <Spinner />
      ) : (
        <>
          {questions.data?.length ? (
            <>
              {questions.data.map((q) => (
                <QuestionBox
                  key={q._id + "_askedQuestion"}
                  questionId={q._id}
                  likesCount={q.qlikesCount}
                  questionTitle={q.question}
                  answersCount={q.answersCount}
                  tags={q.tags}
                  dataAos={"fade-left"}
                  userObj={
                    q.userId ? q.userId : (q.userId = { dname: user.dname })
                  }
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
                  message={"You have not posted any question"}
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
AOS.init();
