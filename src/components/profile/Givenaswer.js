import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function Givenaswer() {
    
    const [question, setquestion] = useState([])
    
    const user = useSelector(state => state.user)
    const uid = useSelector(state => state.user._id)
    
    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])
    console.log(question)

        
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

    // function deleteHandler(ad,qid){
    //     console.log(ad,qid)
    //     let data = {ad,qid}
    //     axios.post(`http://localhost:3001/delete-answer`,data).then((res)=>{
    //         console.log(res.data.data)
    //     })
    // }
    
    function setdated(params) {
        var d1 = new Date(params);
        var d2 = new Date();
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return parseInt((t2-t1)/(24*3600*1000));
    }

    return (
        <div style={{ borderLeft: "2px solid lightgrey",minHeight:'64vh'}}>
            <h1 style={{ borderBottom: "2px solid lightgrey", paddingBottom: "2%" }}>&nbsp;All following answers are given by {user.dname}.</h1>
            {abyuser.map((g) => {
                return <div className='bg-light my-1' style={{ borderBottom: '.1rem solid lightgrey' }}>
                    <NavLink to={`/question/${g.qid}`}>
                    <h4 className='mainqdiv text-dark'>{g.answer}</h4>
                    </NavLink>
                    <button className='qla btn btn-danger' style={{textDecoration:'none',textShadow:"0.02em 0.08em black"}}> 
                    {/* onClick={() => {if(window.confirm('Are you sure to delete this question?')){ deleteHandler(g.date,g.qid)};}}> */}
                         Delete 
                    </button>
                    <div class="qla bg-primary"> Likes: {g.alikes.length} </div>
                    <div class="maindnamediv" style={{ fontSize: '.9rem', fontFamily: 'cursive' }}>given by&nbsp;
                        <NavLink style={{ color: 'navy', fontFamily: 'cursive' }} to={`/user/${g.uid}`}>
                            {user.dname}
                        </NavLink>
                    </div>
                    <div style={{ width: '37%', display: 'inline-block', margin: '6px', fontFamily: 'Times' }}>
                         posted {setdated(g.date)!=0?setdated(g.date)+" day ago":"today"}
                    </div>
                </div>
            })}
        </div>
    )
}
