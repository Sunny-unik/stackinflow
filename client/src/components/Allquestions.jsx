import axios from 'axios';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Spinner from './spinner';
import Reactpaginate from 'react-paginate';
import Questionbox from './questionbox';

export default function Allquestions() {
  const [questionlength, setquestionlength] = useState();
  const [questions, setquestions] = useState([]);
  const limit = 8;
  let currentpage = { selected: 0 };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/list-question-length`).then(res => {
      setquestionlength(res.data.data);
    });
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/list-question-bypage?page=${currentpage.selected}&limit=${limit}`
      )
      .then(res => {
        setquestions(res.data.data);
      });
  }, []);

  function pagechange(data) {
    console.log(data);
    currentpage = data;
    console.log(limit);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/list-question-bypage?page=${currentpage.selected}&limit=${limit}`
      )
      .then(res => {
        console.log(res.data);
        setquestions(res.data.data.reverse());
      });
  }

  return (
    <div class='row' style={{ borderLeft: '2px solid lightgrey', minHeight: '80vh' }}>
      <div>
        <h1 style={{ padding: '0px 1%', margin: '.4rem 0 .4rem 0', fontFamily: 'sans-serif' }}>
          Total {questionlength} Questions Asked
        </h1>
        <hr class='mb-0' />
      </div>
      <div>
        {questions &&
          questions.map(q => {
            return (
              <Questionbox
                questionid={q._id}
                likes={q.qlikes.length}
                questiontitle={q.question}
                answer={q.answers.length}
                tags={q.tags}
                dataaos={'fade-left'}
                userdname={q.userdname}
                date={q.date}
              />
            );
          })}
      </div>
      <div className='container'>
        <div className='row m-2'>
          {questions && (
            <div>
              <div className='pt-3 pb-1'>
                <Reactpaginate
                  previousLabel={'<<'}
                  nextLabel={'>>'}
                  breakLabel={'...'}
                  marginPagesDisplayed={5}
                  pageCount={Math.floor(Math.ceil(questionlength / limit))}
                  pageRangeDisplayed={2}
                  onPageChange={pagechange}
                  containerClassName={'pagination justify-content-center'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link'}
                  breakClassName={'page-item'}
                  breakLinkClassName={'page-link'}
                  activeClassName={'active'}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {!questions && <Spinner />}
    </div>
  );
}
AOS.init();
