import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function Givenaswerbyuser(props) {
    
    const [question, setquestion] = useState([])
    const [users, setusers] = useState([])
    var uid = props.match.params.id;
    console.log(uid);

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
        axios.get("http://localhost:3001/list-user").then((res) => {
            console.log(res.data.data)
            setusers(res.data.data)
        })
    }, [])
    console.log(question)
    console.log(users);

    const user = useSelector(state => state.user)
        
    var answer = new Array
    question.forEach((r)=>{
        answer.push(...r.answers)
    })
    console.log(answer)

    var abyuser = new Array
    answer.forEach((all) => {
            if (all.uid == uid) {
                abyuser.push(all)
            }
    })
    console.log(abyuser)

    return (
        <div style={{ borderLeft: "2px solid lightgrey",minHeight:'64vh'}}>
            <h1 style={{ borderBottom: "2px solid lightgrey", paddingBottom: "2%", fonFamily:"SeogUI" }}>&nbsp;All following answers are given by 
            {users.map((r)=>{ if (r._id == uid) return ' ' + r.dname })}.</h1>
            {abyuser.map((g) => {
                return <div className='bg-light my-1' style={{ borderBottom: '.1rem solid lightgrey' }}>
                    <h4 className='mainqdiv'>{g.answer}</h4>
                    <div class="qla bg-secondary"> Likes: {g.alikes.length} </div>
                    <div class="maindnamediv" style={{ fontSize: '.9rem', fontFamily: 'cursive' }}>given by&nbsp;
                        <NavLink style={{ color: 'navy', fontFamily: 'cursive' }} to={`/user/${g.userdname}`}>
                            {users.map((r)=>{ if (r._id == uid) return ' ' + r.dname })}
                        </NavLink>
                    </div>
                    <div style={{ width: '37%', display: 'inline-block', margin: '6px', fontFamily: 'Times' }}> at {g.date}</div>
                </div>
            })}
        </div>
    )
}
