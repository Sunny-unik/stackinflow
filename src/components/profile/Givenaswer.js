import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function Givenaswer(props) {
    const [question, setquestion] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])
    console.log(question)

    const uname = useSelector(state => state.user.dname)
    console.log(uname)
    
    var answer = new Array
    question.forEach((r)=>{
        answer.push(...r.answers)
    })
    console.log(answer)

    var abyuser = new Array
    answer.forEach((all) => {
            if (all.userdname == uname) {
                abyuser.push(all)
            }
    })
    console.log(abyuser)

    return (
        <div style={{ borderLeft: "2px solid lightgrey",minHeight:'64vh'}}>
            <h1 style={{ borderBottom: "2px solid lightgrey", paddingBottom: "2%" }}>&nbsp;All following answers are given by {uname}.</h1>
            {abyuser.map((g) => {
                return <div style={{ borderBottom: '.1rem solid lightgrey' }}>
                    <h4 className='mainqdiv'>{g.answer}</h4>
                    <div class="qla bg-secondary"> Likes: {g.alikes.length} </div>
                    <div style={{ width: '37%', display: 'inline-block', margin: '6px', fontFamily: 'Times' }}> Listed at {g.date}</div>
                    <div class="maindnamediv" style={{ fontSize: '.9rem', fontFamily: 'cursive' }}>given by&nbsp;
                        <NavLink style={{ color: 'navy', fontFamily: 'cursive' }} to={`/user/${g.userdname}`}>{g.userdname}</NavLink>
                    </div>
                </div>
            })}
        </div>
    )
}
