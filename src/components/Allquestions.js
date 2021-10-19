import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import { useSelector } from 'react-redux';
import AOS from 'aos'
import 'aos/dist/aos.css'
import Spinner from './spinner';

export default function Allquestions(props) {

    const [question, setquestion] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])

    console.log(question)

    const user = useSelector(state => state.user);

    function goonask() {
        alert(`User need to login first <button onclick={}> goto login <button>`)
        props.history.push('/Login')
    }

    return (<div class="row">
                <h2 style={{width:'64%',display:'inline-block',padding:'0px 1%',fontFamily:'Fantasy'}}> All Questions </h2>
                <div style={{width:'28%',display:'inline-block',textAlign:'center'}}><button className='bg-primary' type='button' style={{padding:'1% 2%',margin:'0% 1%',borderRadius:'6%'}} onClick={goonask}> Ask a Question </button></div>
                <div className='container'>
                <div className='col-md-7' style={{padding:'0px 1%',fontFamily:'sans-serif'}}><h4>48435484 Questions</h4></div>
                <div className='col-md-4'>
                    <button className=' bg-info' type='button' style={{padding:'1% 2%',margin:'0% 1%',borderRadius:'6%'}}> Oldest First </button>
                    <button className=' bg-info' type='button' style={{padding:'1% 2%',margin:'0% 1%',borderRadius:'6%'}}> Not Answered </button>
                </div>
            </div>
            {question && question.map((q) => {
                return  <React.Fragment>
                        <div data-aos="fade-left" data-aos-once='true' data-aos-duration="500" className="bg-warning" key={q._id}>
                            <h4 style={{margin:'8px',boxSizing:"border-box",width:'64%',display:'inline-block',textDecoration:'none'}}><NavLink to={`/question/${q._id}`} style={{color:'CaptionText'}}>{q.question}</NavLink></h4>
                            &nbsp; &nbsp;<div style={{width:'14%',display:'inline-block',margin:'8px',fontFamily:'serif',fontWeight:'600'}} > Likes: 6665466 </div>
                            &nbsp; &nbsp;<div style={{width:'14%',display:'inline-block',margin:'8px',fontFamily:'serif',fontWeight:'600'}} > Answer: 6665466 </div>
                            <div style={{width:'46%',display:'inline-block',margin:'8px'}}><NavLink style={{color:'navy',fontFamily:'monospace'}} className="bg-warning" to={`/tag/${q.tag}`}>{q.tag}</NavLink></div>
                            &nbsp; &nbsp;<div style={{width:'36%',display:'inline-block',margin:'8px',fontFamily:'Times'}}>{q.date}</div>
                            <div style={{width:'10%',display:'inline-block',margin:'8px'}} className="text-info"><NavLink style={{color:'navy',fontFamily:'cursive'}} to={`/tag/${q.tag}`}>{q.userdname}</NavLink></div>
                        </div>
                            <hr style={{margin:'0',padding:'0'}} class='qhr'/>
                        </React.Fragment>
            })}
            {!question && <Spinner/>}
        </div >
    )
}
AOS.init();
