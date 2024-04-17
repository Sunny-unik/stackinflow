import axios from "axios";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "./loadings/Spinner";
import ReactPaginate from "react-paginate";
import QuestionBox from "./QuestionBox";
import Error from "./Error";
import UseSearchParam from "../helper/UseSearchParam";

export default function AllQuestions({ history }) {
  const location = UseSearchParam(),
    limit = location.get("limit") || 4,
    pageNumber = +location.get("page") || 0,
    [currentPage, setCurrentPage] = useState({
      selected: pageNumber < 1 ? 0 : pageNumber - 1
    }),
    [questionsLength, setQuestionsLength] = useState(),
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
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/question/newest?page=${currentPage.selected}&limit=${limit}`
      )
      .then(({ data }) =>
        setQuestions({ data: data.data, loading: false, error: null })
      )
      .catch((error = {}) =>
        setQuestions({ error, loading: false, data: null })
      );
  }, [currentPage.selected, limit, pageNumber, history]);

  return (
    <div
      className="row p-1"
      style={{ minHeight: "80vh", alignContent: "start" }}
    >
      <div>
        <h1 className="d-inline-block">
          Total {questionsLength} Questions Asked{" "}
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
              <div className="container">
                <div className="row m-2">
                  <div className="pt-3 pb-1">
                    <ReactPaginate
                      previousLabel={"<<"}
                      nextLabel={">>"}
                      breakLabel={"..."}
                      marginPagesDisplayed={5}
                      pageCount={Math.floor(Math.ceil(questionsLength / limit))}
                      pageRangeDisplayed={2}
                      onPageChange={(pageData) => {
                        setCurrentPage(pageData);
                        history.push({
                          pathname: "/questions",
                          search: "?page=" + (Number(pageData.selected) + 1)
                        });
                      }}
                      containerClassName={"pagination justify-content-center"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      activeClassName={"active"}
                      initialPage={
                        +currentPage.selected > 0
                          ? +currentPage.selected
                          : undefined
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Error
              statusCode={
                questions.data?.length === 0 ? 404 : questions.error.statusCode
              }
              message={
                questions.data?.length === 0 ? "No such data found" : null
              }
            />
          )}
        </>
      )}
    </div>
  );
}
AOS.init();
