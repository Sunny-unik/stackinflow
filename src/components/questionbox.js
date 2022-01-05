import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './css/qls.css'

export default function Questionbox(props) {
    
    const [alluser, setalluser] = useState([])
    const [qid, setqid] = useState()

    useEffect(() => {
        setqid(props.questionid)
        axios.get(`http://localhost:3001/list-user`).then((res)=>{setalluser(res.data.data)})
    }, [props])
    
    function setdated(params) {
        var d1 = new Date(params);
        var d2 = new Date();
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return parseInt((t2-t1)/(24*3600*1000));
    }

return (<div key={qid} className='rounded card'>
    <div data-aos="fade-up" data-aos-duration="400" data-aos-offset='max-height'
     style={{backgroundColor:'#fdf7e2',borderBottom:'.1rem solid grey'}}>
        <h4 data-aos={props.dataaos} data-aos-duration="800" data-aos-offset='max-height' className='mainqdiv'>
            <NavLink style={{ textDecorationLine: "none",textShadow: ".02em .04em black" }} to={`/question/${qid}`}>
                {props.questiontitle}
            </NavLink>
        </h4>
        <div class="qla bg-secondary" style={{textShadow:"0.02em 0.08em black"}}> Likes: {props.likes}  </div>
        <div class="qla bg-secondary">
            <NavLink style={{color:'white',textDecoration:'none',textShadow:"0.02em 0.08em black"}} to={`/question/${qid}`}> Answer: {props.answer} </NavLink>
        </div>
        <div class="maintagdiv mx-2">
        {props.tags.map((o)=>{
        if(o!=""&&" ")
    return <NavLink style={{ color: 'white', fontFamily: 'monospace', padding: '.2rem', textDecorationLine:"none"}} className="m-1 rounded bg-dark" to={`/questionsby/${o}`}>
                {o.replace(",","")}
            </NavLink>
        })}
        </div>
        <div class="maindnamediv">asked by &nbsp;
            <NavLink style={{color:'navy',fontFamily:'SeogUI',fontWeight:"bold"}} to={`/user/${props.userdname}`}>
                {alluser.map((r)=>{ if(r._id==props.userdname) return r.dname})}
            </NavLink>
        </div>
        <div style={{width:'37%',display:'inline-block',margin:'6px',fontFamily:'SeogUI',fontWeight:"bold"}}>
            posted {setdated(props.date)!=0?setdated(props.date)+" day ago":"today"}
        </div>
    </div>
</div>)
}