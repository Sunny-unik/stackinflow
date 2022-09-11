import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Questionbox from './questionbox';

export default function Searchq(props) {
  const [searchby, setsearchby] = useState([]);
  const [questions, setquestions] = useState([]);

  useEffect(() => {
    props.location.searchedquestion.split(/[, ]+/).forEach(e => {
      searchby.push(e);
    });
    axios.get(`${process.env.REACT_APP_API_URL}/list-question`).then(res => {
      setquestions(
        res.data.data.reverse().filter(y => {
          return (
            y.question.includes(
              searchby[0] || searchby[1] || searchby[2] || searchby[3] || searchby[4]
            ) === true
          );
        })
      );
    });
  }, []);

  return (
    <div className='border' style={{ minHeight: '70vh' }}>
      <p
        className='card p-1 display-5 border'
        style={{ fontFamily: 'SeoogUI', textShadow: '.02em .02em blue' }}
      >
        Questions as your search
      </p>
      <div className='w-100 bg-light'>
        {questions.length > 0 ? (
          questions.map(q => {
            return (
              <Questionbox
                questionid={q._id}
                likes={q.qlikes.length}
                questiontitle={q.question}
                answer={q.answers.length}
                tags={q.tags}
                data_aos={'fade-up'}
                userdname={q.userdname}
                date={q.date}
              />
            );
          })
        ) : (
          <h2 className='text-center text-danger card'>!Question not Found</h2>
        )}
      </div>
    </div>
  );
}
