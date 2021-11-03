import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import './css/qls.css'
import './css/spinner.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Spinner from './spinner'

export default function Topquestions() {

    const [question, setquestion] = useState([])
    
    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])
    console.log(question)

    return <div className='row p-0' style={{borderLeft:'.1rem solid lightgrey',paddingLeft:'.2rem'}}>
        <div style={{padding: '0 0 1% 0',borderBottom:'.1rem solid lightgrey'}}>
            <h1 style={{margin:'1% 0 1% 2%',display:'inline-block'}}> Top Questions </h1><br />
            <div class="btn-group" style={{margin:'0px .3rem 0px .8rem'}}>
                <span class="btn btn-primary active" type='button' aria-current="page"> Newest </span><vr/>
                <span class="btn btn-primary" type='button'> Most Liked</span>
                <span class="btn btn-primary" type='button'> Most Answered </span>
            </div>
        </div>
        <div style={{padding:'0 0 0 0'}}>
        {question && question.map((q) => {
        return  <div key={q._id}>
                <div data-aos="fade-in" data-aos-once='true' data-aos-duration="400" data-aos-offset='max-height' style={{backgroundColor:'beige',borderBottom:'.1rem solid grey'}}>
                    <h4 className='mainqdiv'><NavLink style={{color:'black',textDecoration:'none'}} to={`/question/${q._id}`}>{q.question}</NavLink></h4>
                    <div class="qla bg-secondary"> Likes: {q.qlikes.length}  </div>
                    <div class="qla bg-secondary"><NavLink style={{color:'black',textDecoration:'none'}} to={`/question/${q._id}`}> Answer: {q.answers.length} </NavLink></div>
                    <div class="maintagdiv mx-2"><NavLink style={{color:'white',fontFamily:'monospace',padding:'.2rem'}} className="rounded-2 bg-dark" to={`/tag/${q.tag}`}>{q.tag}</NavLink></div>
                    <div style={{width:'37%',display:'inline-block',margin:'6px',fontFamily:'Times'}}>asked at {q.date}</div>
                    <div class="maindnamediv"><NavLink style={{color:'navy',fontFamily:'cursive'}} to={`/user/${q.userdname}`}>asked by {q.userdname}</NavLink></div>
                </div>
        </div>
        })}
        {!question && <Spinner/>}
        </div>
    </div>
}
AOS.init();