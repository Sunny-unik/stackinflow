import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useSelector } from "react-redux"

export default function Askedquestions() {

    const [question, setquestion] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])

    console.log(question)

    const userdname = useSelector(state => state.user.dname);

    var askedquestion = question.filter((un)=>{return un.userdname===userdname})

    console.log(askedquestion)

    return (<React.Fragment>
        <div>
            <h1><label>Asked Questions</label></h1>
        </div>
        <div>
            {askedquestion && askedquestion.map((q) => {
            return  <div key={q._id} >
                <h4>{q.question}</h4>
                <div className="container d-flex align-items-space-between">
                    <div className="col-md-6 ">
                    <button className="bg-primary tag" type="button" >{q.tag}</button>
                    </div>
                    <div className=" col-md-5">
                        <span>{q.date}</span>&nbsp; &nbsp;
                        <span>{q.username}</span>
                    </div>
                </div>
                <hr />
            </div>
            })}
            {!askedquestion && <div className="mt-md-2 mt-lg-2 loading text-center">
                {/* <div class="spinnerdiv"> */}
                <i class="spinner"></i>
                <p>loading..</p>
                {/* </div> */}
                <div>your network seems down or slow</div>
            </div>}
            {!question && <div className="mt-md-2 mt-lg-2 loading text-center">
                {/* <div class="spinnerdiv"> */}
                <i class="spinner"></i>
                <p>loading..</p>
                {/* </div> */}
                <div>your network seems down or slow</div>
            </div>}
            {!userdname && <div className="mt-md-2 mt-lg-2 loading text-center">
                {/* <div class="spinnerdiv"> */}
                <i class="spinner"></i>
                <p>loading..</p>
                {/* </div> */}
                <div>your network seems down or slow</div>
            </div>}
        </div>
        </React.Fragment>
    )
}
