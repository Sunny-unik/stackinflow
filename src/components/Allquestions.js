import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './css/followedtags.css'

export default function Allquestions(props) {

    const [question, setquestion] = useState('')

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])

    console.log(question)

    const user = useSelector(state => state.user);

    function goonask() {
        alert('User need to login first')
        props.history.push('/Login')
    }

    return (
        // pagination require per page 15 questions
        <div class="row">
            {/* Only visible after login  */}
            <div className='container'>
                <div className='col-md-8 '><h2>All Questions</h2></div>
                {!user && <div ><button className='col-md-2 bg-primary' type='button' onClick={goonask}> Ask a Question </button></div>}
            </div>
            <div className='container'>
                <div className='col-md-6 '><h4>48435484 Questions</h4></div>
                <div className='col-md-4 '>
                <button className=' bg-info' type='button'> Oldest First </button>
                <button className=' bg-info' type='button'> Not Answered </button>
                </div>
            </div>
            {question && question.map((q) => {
                return <div className="bg-warning">
                    <div >
                        <div key={q._id} class="border border-1">
                            <h4>{q.question}</h4>
                            <div className="container d-flex align-items-space-between">
                                <div className="col-md-6 ">
                                    <button className="bg-danger tag" type="button" >{q.tag}</button>
                                </div>
                                <div className=" col-md-5">
                                    <span>{q.date}</span>&nbsp; &nbsp;
                                    <span>{q.username}</span>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div></div>
            })}
            {!question && <div className="mt-md-2 mt-lg-2 loading text-center">
                {/* <div class="spinnerdiv"> */}
                <i class="spinner"></i>
                <p>loading..</p>
                {/* </div> */}
                <div>your network seems down or slow</div>
            </div>}
        </div >
    )
}
