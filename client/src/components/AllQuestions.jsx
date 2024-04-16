import axios from "axios";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "./loadings/Spinner";
import ReactPaginate from "react-paginate";
import QuestionBox from "./QuestionBox";

export default function AllQuestions() {
  const [questionsLength, setQuestionsLength] = useState();
  const [questions, setQuestions] = useState();
  const limit = 8;
  let currentPage = { selected: 0 };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question/count`)
      .then((res) => setQuestionsLength(res.data.data))
      .catch((err) => console.log(err));
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/question/newest?page=${currentPage.selected}&limit=${limit}`
      )
      .then((res) => setQuestions(res.data.data))
      .catch((err) => console.log(err));
  }, [currentPage.selected]);

  function pageChange(data) {
    currentPage = data;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/question/newest?page=${currentPage.selected}&limit=${limit}`
      )
      .then((res) => setQuestions(res.data.data))
      .catch((err) => console.log(err));
  }

  return (
    <div
      className="row p-0"
      style={{ borderLeft: "2px solid lightgrey", minHeight: "80vh" }}
    >
      <div>
        <h1> Total {questionsLength} Questions Asked </h1>
        <hr className="mb-0" />
      </div>
      {questions && (
        <>
          <div>
            {questions.map((q) => {
              console.log(q);
              return (
                <div key={q._id}>
                  <QuestionBox
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
                </div>
              );
            })}
          </div>
          <div className="container">
            <div className="row m-2">
              {questions && (
                <div>
                  <div className="pt-3 pb-1">
                    <ReactPaginate
                      previousLabel={"<<"}
                      nextLabel={">>"}
                      breakLabel={"..."}
                      marginPagesDisplayed={5}
                      pageCount={Math.floor(Math.ceil(questionsLength / limit))}
                      pageRangeDisplayed={2}
                      onPageChange={pageChange}
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
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {!questions && <Spinner />}
    </div>
  );
}
AOS.init();
