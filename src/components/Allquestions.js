import axios from 'axios';
import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import AOS from 'aos'
import 'aos/dist/aos.css'
import Spinner from './spinner';

export default function Allquestions() {

    const [question, setquestion] = useState([])
    const [alluser, setalluser] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data)
            setquestion(res.data.data)
        })
        axios.get("http://localhost:3001/list-user").then((res) => {
            console.log(res.data)
            setalluser(res.data.data)
        })
    }, [])
    console.log(question)
    console.log(alluser)

    return (
<div class="row" style={{borderLeft:'2px solid lightgrey',minHeight:'80vh'}}>
    <div>
    <h1 style={{padding:'0px 1%',margin:'.4rem 0 .4rem 0',fontFamily:'sans-serif'}}> All {question.length>0 ? <p className="d-inline">{question.length} Question</p> : <p className="d-inline">Questions</p> }</h1>
    <div class="btn-group" style={{margin:'0px .3rem 0px .8rem',borderBottom:'.1rem solid lightgrey'}}>
        <span class="btn btn-primary active" type='button' aria-current="page"> Oldest </span><vr/>
        <span class="btn btn-primary" type='button'> Not Answered </span>
    </div><hr style={{marginBottom:'0'}}/>
    </div>
    <div style={{background:'beige'}}>
    {question && question.map((q) => {
    return (
    <div key={q._id}>
<div style={{borderBottom:'.1rem solid lightgrey'}}>
    <h4 data-aos="fade-left" data-aos-offset='max-height' data-aos-once='true' data-aos-duration="400" className='mainqdiv'>
        <NavLink style={{color:'black',textDecoration:'none'}} to={`/question/${q._id}`}>{q.question}</NavLink>
    </h4>
    <div class="qla bg-secondary"> Likes: {q.qlikes.length}  </div>
    <div class="qla bg-secondary">
        <NavLink style={{color:'black',textDecoration:'none'}} to={`/question/${q._id}`}> Answer: {q.answers.length} </NavLink>
    </div><br/>
    {q.tags.map((o)=>{
    return <NavLink style={{ color: 'white', fontFamily: 'monospace', padding: '.2rem' }} className="rounded-2 bg-dark" to={`/questionsby/${o}`}>
            {o}
        </NavLink>
    })}
    <div style={{width:'37%',display:'inline-block',margin:'6px',fontFamily:'Times'}}>asked at {q.date}</div>
    <div class="maindnamediv" style={{fontSize:'.9rem',fontFamily:'cursive'}}>asked by 
        <NavLink style={{color:'navy',fontFamily:'cursive'}} to={`/user/${q.userdname}`}>
            {alluser.map((r)=>{ if(r._id==q.userdname) return ' '+r.dname})}
        </NavLink>
    </div>
</div>
    </div>)
    })}
    </div>
    {!question && <Spinner />}
</div >
    )
}
AOS.init();