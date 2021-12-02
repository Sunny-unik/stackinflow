import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'

export default function Likedanswer() {

    const [question, setquestion] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data)
            setquestion(res.data.data)
        })
    }, [])
    console.log(question)

    const user = useSelector(state => state.user);
    const userdname = useSelector(state => state.user.dname);
    console.log(userdname)
    var userliked = new Array
    question.forEach((all) => {
        return all.qlikes.forEach((u) => {
            if (u == userdname) {
                userliked.push(all)
            }
        })
    })
    console.log(userliked)

    return (
<div style={{ borderLeft: "2px solid lightgrey",minHeight:'64vh'}}>
    <h1 style={{ borderBottom: "2px solid lightgrey", paddingBottom: "2%" }}>&nbsp;All following questions are liked by {userdname}.</h1>
    {userliked.map((g) => {
        return <div style={{ borderBottom: '.1rem solid lightgrey' }}>
            <h4 className='mainqdiv'>
                <NavLink style={{ color: 'black', textDecoration: 'none' }} to={`/question/${g._id}`}>{g.question}</NavLink>
            </h4>
            <div class="qla bg-secondary"> Likes: {g.qlikes.length} </div>
            <div class="qla bg-secondary">
                <NavLink style={{ color: 'black', textDecoration: 'none' }} to={`/question/${g._id}`}> Answer: {g.answers.length} </NavLink>
            </div>
            <div class="maintagdiv mx-2">
                {g.tags.map((o)=>{
                return <NavLink style={{ color: 'white', fontFamily: 'monospace', padding: '.2rem' }} className="rounded-2 bg-dark" to={`/questionsby/${o}`}>
                        {o}
                    </NavLink>
                })}
            </div>
            <div style={{ width: '37%', display: 'inline-block', margin: '6px', fontFamily: 'Times' }}>asked at {g.date}</div>
            <div class="maindnamediv" style={{ fontSize: '.9rem', fontFamily: 'cursive' }}>asked by
                <NavLink style={{ color: 'navy', fontFamily: 'cursive' }} to={`/user/${g.userdname}`}>{g.userdname}</NavLink>
            </div>
        </div>
    })}
</div>)
}
