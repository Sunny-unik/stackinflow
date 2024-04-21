import axios from "axios";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "./loadings/Spinner";
import QuestionBox from "./QuestionBox";
import Error from "./Error";
import UseSearchParam from "../helper/UseSearchParam";
import Pagination from "./Pagination";

export default function AllQuestions({ history }) {
  const location = UseSearchParam(),
    limit = location.get("limit") || 10,
    pageNumber = +location.get("page") || 0,
    [currentPage, setCurrentPage] = useState(
      pageNumber < 1 ? 0 : pageNumber - 1
    ),
    [perPageLimit, setPerPageLimit] = useState(limit < 0 ? 10 : limit),
    [questionsLength, setQuestionsLength] = useState("{count loading...}"),
    [questions, setQuestions] = useState({
      data: null,
      loading: true,
      error: null
    });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question/count`)
      .then((res) => setQuestionsLength(res.data.data))
      .catch(() => setQuestionsLength("count failed"));
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/question/newest?page=${currentPage}&limit=${perPageLimit}`
      )
      .then(({ data }) =>
        setQuestions({ data: data.data, loading: false, error: null })
      )
      .catch((error = {}) =>
        setQuestions({ error, loading: false, data: null })
      );
  }, [currentPage, perPageLimit]);

  return (
    <div
      className="row p-1"
      style={{ minHeight: "80vh", alignContent: "start" }}
    >
      <div>
        <h1 className="d-inline-block">
          Total {questionsLength} Questions Asked
        </h1>
        <hr className="mb-0" />
      </div>
      {questions.loading ? (
        <Spinner />
      ) : (
        <>
          {questions.data?.length ? (
            <>
              <div>
                {questions.data.map((q) => (
                  <QuestionBox
                    key={q._id}
                    questionId={q._id}
                    likesCount={q.qlikes.length}
                    questionTitle={q.question}
                    answersCount={q.answers ? q.answers.length : 0}
                    tags={q.tags}
                    dataAos={"fade-left"}
                    userObj={
                      q.userId ? q.userId : (q.userId = { dname: "404" })
                    }
                    date={q.date}
                  />
                ))}
              </div>
              <Pagination
                {...{
                  limitValues: [10, 20, 30],
                  limitsMessage: "questions per page",
                  itemsLength: questionsLength,
                  perPageLimit,
                  setPerPageLimit,
                  currentPage,
                  setCurrentPage,
                  history,
                  route: "/questions"
                }}
              />
            </>
          ) : (
            <Error
              statusCode={
                questions.data?.length === 0 ? 404 : questions.error.statusCode
              }
              message={
                questions.data?.length === 0 ? "No such data found" : null
              }
              heading={questions.data?.length === 0 ? "Not found" : null}
            />
          )}
        </>
      )}
    </div>
  );
}
AOS.init();
