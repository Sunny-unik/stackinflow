import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Contact() {
  const user = useSelector(state => state.user);
  const [Feedbackhead, setemailhead] = useState('');
  const [Feedbackbody, setemailbody] = useState('');
  const [Feedbackfoot, setemailfoot] = useState('');

  function handlemail(email) {
    email.target.name === 'ehead' && setemailhead(email.target.value);
    email.target.name === 'ebody' && setemailbody(email.target.value);
    email.target.name === 'efoot' && setemailfoot(email.target.value);
    console.log(email.target.value);
  }

  function submitfeedback() {
    if (!user) {
      alert('For submit feedback you need to login first');
    }
    if (
      Feedbackhead.length > 73 ||
      Feedbackhead.length < 4 ||
      Feedbackhead === null ||
      Feedbackhead === ' '
    ) {
      alert('Feedback title length must between 4 to 73');
    }
    if (
      Feedbackbody.length > 1000 ||
      Feedbackbody.length < 10 ||
      Feedbackbody === null ||
      Feedbackbody === ' '
    ) {
      alert('Feedback body length must between 10 to 1000');
    }
    if (
      Feedbackfoot.length > 500 ||
      Feedbackfoot.length < 6 ||
      Feedbackfoot === null ||
      Feedbackfoot === ' '
    ) {
      alert('Feedback conclusion length must between 10 to 500');
    } else {
      let feedback = {
        emailhead: Feedbackhead,
        emailbody: Feedbackbody,
        emailfoot: Feedbackfoot,
        useremail: user.email,
        username: user.name,
      };
      console.log(feedback);
      axios.post(`${process.env.REACT_APP_API_URL}/send-feedback`, feedback).then(res => {
        alert(res.data.data);
      });
    }
  }

  return (
    <div className='w-100 card m-0 p-0' style={{ borderLeft: '1px solid lightgrey' }}>
      <h2 className='text-center display-5 btn-light'> Feedback</h2>
      <form
        className='col-sm-12 col-md-7 card bg-white p-3 mb-md-4 d-inline-block mx-md-4'
        style={{ height: 'inherit' }}
      >
        <div className='card-header'>
          <label for='ehead'>
            <b>Enter your feedback title</b>
          </label>
          <br />
          <input
            type='text'
            value={Feedbackhead}
            onChange={e => {
              handlemail(e);
            }}
            placeholder='Enter your feedback title'
            name='ehead'
            id='ehead'
            required
            style={{ width: '90%' }}
          />
          <br />
        </div>
        <br />
        <div className='card-body bg-light'>
          <label for='ebody'>
            <b>Include all your reviews in brief</b>
          </label>
          <br />
          <textarea
            type='text'
            value={Feedbackbody}
            onChange={e => {
              handlemail(e);
            }}
            placeholder='Describe your views'
            name='ebody'
            id='ebody'
            required
            rows='7'
            style={{ width: '90%' }}
          ></textarea>
          <br />
        </div>
        <br />
        <div className='card-footer'>
          <label for='efoot'>
            <b>Enter footer content or conclusion</b>
          </label>
          <br />
          <input
            type='text'
            value={Feedbackfoot}
            onChange={e => {
              handlemail(e);
            }}
            placeholder='Enter footer content or conclusion'
            name='efoot'
            id='efoot'
            required
            style={{ width: '90%' }}
          />
          <br /> <br />
        </div>
        <br />
        <button
          type='reset'
          onClick={submitfeedback}
          className='float-end submitquestion btn btn-primary m-2 form-btn'
          style={{ borderRadius: '.2em', boxShadow: ' .08em .2em #888888' }}
        >
          Submit Feedback
        </button>
        <style jsx>{`
          .submitquestion:hover {
            color: pink !important;
          }
        `}</style>
        <style jsx>{`
          .submitquestion:focus {
            color: pink !important;
          }
        `}</style>
      </form>
    </div>
  );
}
