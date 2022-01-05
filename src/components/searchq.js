import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Searchq(props) {

    const [searchby, setsearchby] = useState([])
    const [questions, setquestions] = useState([])
    const [alluser, setalluser] = useState([])

    useEffect(() => {
        props.location.searchedquestion.split(/[, ]+/).forEach(e => {
            searchby.push(e)
        });
        console.log(searchby);
        axios.get(`http://localhost:3001/list-user`).then((res)=>{
            setalluser(res.data.data)
        })
        axios.get(`http://localhost:3001/list-question`).then((res) => {
            setquestions(res.data.data.reverse().filter((y)=>{return y.question.includes(searchby[0]||searchby[1]||searchby[2]||searchby[3]||searchby[4])==true}))
        })
    }, [])

    return (
        <div className='border' style={{minHeight:"70vh"}}>
            <p className='card p-1 display-5 border' style={{ fontFamily: "SeoogUI",textShadow:".02em .02em blue" }}>Questions as your search</p>
            <div className='w-100 bg-light'>
                {console.log(questions)}
{questions.length>0 ? questions.map((q) => {
return <div data-aos="fade-down" data-aos-offset='max-height' data-aos-once='true' data-aos-duration="200" key={q._id}>
    <div style={{ borderBottom: '.1rem solid lightgrey' }}>
        <h4 data-aos="fade-left" data-aos-offset='max-height' data-aos-once='true' data-aos-duration="400" className='mainqdiv'>
            <NavLink style={{ textDecorationLine: "none", textShadow: ".02em .04em black" }} to={`/question/${q._id}`}>{q.question}</NavLink>
        </h4>
        <div class="qla bg-secondary"> Likes: {q.qlikes.length}  </div>
        <div class="qla bg-secondary">
            <NavLink style={{ color: 'black', textDecoration: 'none' }} to={`/question/${q._id}`}> Answer: {q.answers.length} </NavLink>
        </div><br />
        {q.tags.map((o) => {
            return <NavLink style={{ color: 'white', fontFamily: 'monospace', padding: '.2rem' }} className="rounded-2 bg-dark" to={`/questionsby/${o}`}>
                {o}
            </NavLink>
        })}
        <div style={{ width: '37%', display: 'inline-block', margin: '6px', fontFamily: 'Times' }}>asked at {q.date}</div>
        <div class="maindnamediv" style={{ fontSize: '.9rem', fontFamily: 'cursive' }}>asked by
            <NavLink style={{ color: 'navy', fontFamily: 'cursive' }} to={`/user/${q.userdname}`}>
                {alluser.map((r) => { if (r._id == q.userdname) return ' ' + r.dname })}
            </NavLink>
        </div>
    </div>
</div>
})
    : <h2 className='text-center text-danger card'>!Question not Found</h2>
}
            </div>
        </div>
    )
}
