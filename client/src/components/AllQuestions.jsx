import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "./loadings/Spinner";
import ReactPaginate from "react-paginate";
import QuestionBox from "./QuestionBox";
import Error from "./Error";
import UseSearchParam from "../helper/UseSearchParam";

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

  const handleLimitChange = useCallback(
    ({ target }) => {
      const limitCount = +target.dataset.limit;
      setPerPageLimit(limitCount || 10);
      setCurrentPage(0);
      history.push(`/questions?limit=${limitCount}`);
    },
    [history]
  );

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
              <div className="container">
                <div className="pt-3 pb-1 px-md-5 d-flex flex-column-reverse flex-sm-row">
                  <div className="mb-2 d-inline-block text-center gap-1 d-flex align-items-end justify-content-center limit-buttons">
                    <div
                      className={
                        "btn btn-light border " +
                        (+perPageLimit === 10 ? "active" : "")
                      }
                      data-limit="10"
                      onClick={handleLimitChange}
                    >
                      10
                    </div>
                    <div
                      className={
                        "btn btn-light border " +
                        (+perPageLimit === 20 ? "active" : "")
                      }
                      data-limit="20"
                      onClick={handleLimitChange}
                    >
                      20
                    </div>
                    <div
                      className={
                        "btn btn-light border " +
                        (+perPageLimit === 30 ? "active" : "")
                      }
                      data-limit="30"
                      onClick={handleLimitChange}
                    >
                      30
                    </div>
                    items per page
                  </div>
                  <div className="flex-grow-1"></div>
                  <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    marginPagesDisplayed={5}
                    pageCount={Math.ceil(questionsLength / perPageLimit)}
                    pageRangeDisplayed={2}
                    onPageChange={(pageData) => {
                      setCurrentPage(pageData.selected);
                      history.push(`/questions?page=${+pageData.selected + 1}`);
                    }}
                    containerClassName={
                      "pagination justify-content-center align-items-end mb-2"
                    }
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                    forcePage={+currentPage}
                  />
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
