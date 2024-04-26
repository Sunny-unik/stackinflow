import axios from "axios";
import React, { useEffect, useState } from "react";
import QuestionBox from "../QuestionBox";
import { useParams } from "react-router-dom";
import Spinner from "../loadings/Spinner";
import Error from "../Error";

export default function SearchQ({ history }) {
  const search = useParams().questionSearch || "";
  const [questions, setQuestions] = useState({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    setQuestions({ data: null, loading: true, error: null });
    if (!search) history.push("/");
    else
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/question/search?search=${search}`
        )
        .then((res) =>
          setQuestions({ data: res.data.data, loading: false, error: null })
        )
        .catch((error) => setQuestions({ data: null, loading: false, error }));
  }, [search, history]);

  return (
    <div style={{ minHeight: "70vh" }}>
      <h1 className="ps-2 py-2">Questions related to '{search}'</h1>
      <hr />
      <div className="w-100 bg-light">
        {questions.loading ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            {questions.error ? (
              <Error />
            ) : (
              <>
                {questions.data?.length ? (
                  questions.data.map((q) => (
                    <div key={q._id}>
                      <QuestionBox
                        questionId={q._id}
                        likesCount={q.qlikesCount}
                        questionTitle={q.question}
                        answersCount={q.answersCount}
                        tags={q.tags}
                        dataAos={"fade-up"}
                        userObj={
                          q.userId ? q.userId : (q.userId = { dname: "404" })
                        }
                        date={q.date}
                      />
                    </div>
                  ))
                ) : (
                  <h2 className="text-center text-danger card">
                    !Question not Found
                  </h2>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
