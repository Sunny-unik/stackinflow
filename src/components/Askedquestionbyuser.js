import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useSelector } from "react-redux"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { NavLink } from 'react-router-dom'

export default function Askedquestionbyuser(props) {

    const [questions, setquestions] = useState([])
    const [users, setusers] = useState([])
    var uid = props.match.params.id;
    console.log(uid);

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestions(res.data.data)
        })
        axios.get("http://localhost:3001/list-user").then((res) => {
            console.log(res.data.data)
            setusers(res.data.data)
        })
    }, [])
    console.log(questions)
    console.log(users)

    const user = useSelector(state => state.user);

    var askedquestion = questions.filter((un)=>{return un.userdname==uid})
    console.log(askedquestion)

    return (<React.Fragment>
        <div>
            <h1><label>These Questions Asked by {users.map((o)=>{  if (o._id == uid) return o.dname  })}.</label></h1>
        </div>
        <div>
            {askedquestion && askedquestion.map((q) => {
            return  <div key={q._id}>
            <div style={{borderBottom:'.1rem solid lightgrey'}}>
                <h4 data-aos="fade-left" data-aos-offset='max-height' data-aos-once='true' data-aos-duration="400" className='mainqdiv'>
                    <NavLink style={{color:'black',textDecoration:'none'}} to={`/question/${q._id}`}>{q.question}</NavLink>
                </h4>
                <div class="qla bg-secondary"> Likes: {q.qlikes.length}  </div>
                <div class="qla bg-secondary">
                    <NavLink style={{color:'black',textDecoration:'none'}} to={`/question/${q._id}`}> Answer: {q.answers.length} </NavLink>
                </div>
                {q.tags.map((o)=>{
                return <NavLink style={{ color: 'white', fontFamily: 'monospace', padding: '.2rem' }} className="rounded-2 bg-dark" to={`/questionsby/${o}`}>
                        {o}
                    </NavLink>
                })}
                <div class="maindnamediv" style={{fontSize:'.9rem',fontFamily:'cursive'}}>asked by 
                    <NavLink style={{color:'navy',fontFamily:'cursive'}} to={`/user/${q.userdname}`}>
                        {users.map((r)=>{ if (r._id == uid) return ' ' + r.dname })}
                    </NavLink>
                </div>
                <div style={{width:'37%',display:'inline-block',margin:'6px',fontFamily:'Times'}}> at {q.date}</div>
            </div>
                </div>
            })}
            {/* {!askedquestion && <div className="mt-md-2 mt-lg-2 loading text-center">
                <i class="spinner"></i>
                <p>loading..</p>
                <div>your network seems down or slow</div>
            </div>} */}
            {/* {!questions && <div className="mt-md-2 mt-lg-2 loading text-center">
                <i class="spinner"></i>
                <p>loading..</p>
                <div>your network seems down or slow</div>
            </div>} */}
            {/* {!user._id && <div className="mt-md-2 mt-lg-2 loading text-center">
                <i class="spinner"></i>
                <p>loading..</p>
                <div>your network seems down or slow</div>
            </div>} */}
        </div>
        </React.Fragment>
    )
}
AOS.init();
