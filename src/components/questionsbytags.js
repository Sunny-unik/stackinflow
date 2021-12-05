import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Questionsbytags(props) {
    const [alluser, setalluser] = useState([])
    const [question, setquestion] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
        axios.get("http://localhost:3001/list-user").then((res) => {
            console.log(res.data)
            setalluser(res.data.data)
        })
        }, [])
    console.log(question)

    var tag = props.match.params.t;
    console.log(tag);

    var bytag = new Array
    question.forEach((all) => {
        return all.tags.forEach((t) => {
            if (t == tag) {
                bytag.push(all)
            }
        })
    })
    console.log(bytag)

    return (
        <div style={{ borderLeft: "2px solid lightgrey",minHeight:'64vh'}}>
            <h1 style={{ borderBottom: "2px solid lightgrey", paddingBottom: "2%" }}>&nbsp;All following questions are related to {tag}.</h1>
            {bytag.map((g) => {
                return <div style={{ borderBottom: '.1rem solid lightgrey' }}>
                    <h4 className='mainqdiv'>
                        <NavLink style={{ color: 'black', textDecoration: 'none' }} to={`/question/${g._id}`}>{g.question}</NavLink>
                    </h4>
                    <div class="qla bg-secondary"> Likes: {g.qlikes.length} </div>
                    <div class="qla bg-secondary">
                        <NavLink style={{ color: 'black', textDecoration: 'none' }} to={`/question/${g._id}`}>
                             Answer: {g.answers.length} 
                        </NavLink>
                    </div>
                    <div class="maintagdiv mx-2">
                    {g.tags.map((o)=>{
                    return <NavLink style={{color:'white',fontFamily:'monospace',padding:'.2rem'}} className="rounded-2 bg-dark" to={`/questionsby/${o}`}>
                            {o}
                        </NavLink>
                    })}
                    </div>
                    <div class="maindnamediv" style={{ fontSize: '.9rem', fontFamily: 'cursive' }}>asked by&nbsp;
                        <NavLink style={{color:'navy',fontFamily:'cursive'}} to={`/user/${g.userdname}`}>
                            {alluser.map((r)=>{ if(r._id==g.userdname) return r.dname})}
                        </NavLink>
                    </div>
                    <div style={{ width: '37%', display: 'inline-block', margin: '6px', fontFamily: 'Times' }}> at {g.date}</div>
                </div>
            })}
        </div>
    )
}
