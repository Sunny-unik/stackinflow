import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'

export default function Likedquestions() {

    const [question, setquestion] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data)
            setquestion(res.data.data)
        })
    }, [])
    console.log(question)
    
    const user = useSelector(state => state.user);
    const uid = useSelector(state => state.user._id);
    
    var userliked = new Array
    question.forEach((all) => {
        return all.qlikes.forEach((u) => {
            if (u == uid) {
                userliked.push(all)
            }
        })
    })
    console.log(userliked)

    function setdated(params) {
        var d1 = new Date(params);
        var d2 = new Date();
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return parseInt((t2-t1)/(24*3600*1000));
    }

    return (
<div style={{ borderLeft: "2px solid lightgrey",minHeight:'64vh'}}>
    <h1 style={{ borderBottom: "2px solid lightgrey", paddingBottom: "2%" }}>&nbsp;All following questions are liked by {user.dname}.</h1>
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
            <div class="maindnamediv" style={{ fontSize: '.9rem', fontFamily: 'cursive' }}>asked by &nbsp;
                <NavLink style={{ color: 'navy', fontFamily: 'cursive' }} to={`/user/${g.userdname}`}>
                    {user.dname}
                </NavLink>
            </div>
            <div style={{ width: '37%', display: 'inline-block', margin: '6px', fontFamily: 'Times' }}> 
            posted {setdated(g.date)!=0?setdated(g.date)+" day ago":"today"}
            </div>
        </div>
    })}
</div>)
}
