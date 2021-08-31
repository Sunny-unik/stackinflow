import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/questions.css'
import './css/spinner.css'

export default function Topquestions() {

    const [question, setquestion] = useState('')

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])

    console.log(question)

    return (
        <div>
            <div class="headq">
                <h1 className="allq"> Top Questions </h1><br />
                <input type="text" placeholder="Find Question " name="searchq" id="searchq" required className="searchq" />
                <button class="searchb"><i className="glyphicon glyphicon-search"> </i> Search</button><br/>
                <div>
                    <button className=' bg-info' type='button'> Newest </button>
                    <button className=' bg-info' type='button'> Most Liked </button>
                    <button className=' bg-info' type='button'> Most Answered </button>
                </div><br/>
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
        </div>
    )
}

