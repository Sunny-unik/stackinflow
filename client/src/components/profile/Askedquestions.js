import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useSelector } from "react-redux"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { NavLink } from 'react-router-dom'

export default function Askedquestions() {

    const [question, setquestion] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/list-question`).then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])
    console.log(question)

    const user = useSelector(state => state.user);

    var askedquestion = question.filter((un)=>{return un.userdname===user._id})
    console.log(askedquestion)

    function setdated(params) {
        var d1 = new Date(params);
        var d2 = new Date();
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return parseInt((t2-t1)/(24*3600*1000));
    }

    return (<React.Fragment>
        <div>
            <h1 className='pb-2' style={{borderBottom:"2px solid lightgrey"}}><label>These Questions Asked by {user.dname}.</label></h1>
        </div>
        <div>
            {askedquestion && askedquestion.map((q) => {
            return  <div key={q._id}>
            <div className='m-0' style={{border:'.1rem solid lightgrey'}}>
                <h4 data-aos="fade-left" data-aos-offset='max-height' data-aos-once='true' data-aos-duration="400" className='mainqdiv'>
                    <NavLink style={{textDecoration:'none'}} to={`/question/${q._id}`}>{q.question}</NavLink>
                </h4>
                <div class="qla bg-secondary"> Likes: {q.qlikes.length}  </div>
                <div class="qla bg-secondary">
                    <NavLink style={{color:'black',textDecoration:'none'}} to={`/question/${q._id}`}> Answer: {q.answers.length} </NavLink>
                </div>
                {q.tags.map((o)=>{
                return <NavLink style={{ color: 'white', fontFamily: 'monospace', padding: '.2rem' }} className="rounded-2 bg-dark m-1" to={`/questionsby/${o}`}>
                        {o}
                    </NavLink>
                })}
                <div class="maindnamediv" style={{fontSize:'.9rem',fontFamily:'cursive'}}>asked by 
                    <NavLink style={{color:'navy',fontFamily:'cursive'}} to={`/user/${q.userdname}`}>
                        {user.dname}
                    </NavLink>
                </div>
                <div style={{width:'37%',display:'inline-block',margin:'6px',fontFamily:'Times'}}> 
                posted {setdated(q.date)!=0?setdated(q.date)+" day ago":"today"}
                </div>
            </div>
                </div>
            })}
        </div>
        </React.Fragment>
    )
}
AOS.init();
