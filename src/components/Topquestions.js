import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink , Route, Switch } from "react-router-dom"
import './css/qls.css'
import './css/spinner.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Spinner from './spinner'
import Questionbox from './questionbox'
import Askedquestionbyuser from './Askedquestionbyuser'
import Mostliked from './Mostliked'

export default function Topquestions() {

    const [question, setquestion] = useState([])
    const [alluser, setalluser] = useState([])
    var limit = 25;

    useEffect(() => {
        // function newest(){
            axios.get(`http://localhost:3001/list-question-bypage?page=0&limit=${limit}`).then((res) => {
                setquestion(res.data.data.reverse())
                // let b1 = document.getElementById("mosta")
                // if(b1.style.backgroundColor!=="dodgerblue"){
                //     setquestion(res.data.data)
                //     console.log(question);
                // }
            })
        // }
        axios.get("http://localhost:3001/list-user").then((res) => {
            setalluser(res.data.data)
        })
    }, [question])
    // console.log(question)
    // console.log(alluser)

    function sortmostlike(p) {
        // let b2 = document.getElementById("mostl")
        // b2.style.backgroundColor = "dodgerblue"
        let b1 = document.getElementById("mosta")
        if(b1.style.backgroundColor!=="dodgerblue"){
        b1.style.backgroundColor = "dodgerblue"
        p.target.style.backgroundColor = "blue"
        } else {

        }
    }
    function sortmostansnwer(p) {
        // let b2 = document.getElementById("mosta")
        // b2.style.backgroundColor = "dodgerblue"
        let b1 = document.getElementById("mostl")
        if(b1.style.backgroundColor!=="dodgerblue"){
            b1.style.backgroundColor = "dodgerblue"
            p.target.style.backgroundColor = "blue"
        } else {

        }
    }
    
return <div className='row p-0' style={{borderLeft:'.1rem solid lightgrey',paddingLeft:'.2rem',minHeight:'80vh'}}>
    <div style={{padding: '0 0 1% 0',borderBottom:'.1rem solid lightgrey'}}>
        <h1 style={{margin:'1% 0 1% 2%',display:'inline-block'}}> Top Questions </h1><br />
        <div class="btn-group" style={{margin:'0px .3rem 0px .8rem'}}>
        <span class="btn btn-primary active" id="mostl" style={{textShadow:".02em .02em white"}} exact type='button' 
        onClick={sortmostlike}>
        {/* to='/mostliked'> */}
            Most Liked
        </span>
        <span class="btn btn-primary" id="mosta" style={{backgroundColor:"dodgerblue",textShadow:".02em .02em white"}} exact type='button' 
        onClick={sortmostansnwer}>
        {/* to="/mostanswered"> */}
            Most Answered
        </span>
        </div>
    </div>
    {/* <div> */}
        {/* <Switch>
            <Route path='/mostliked' exact component={Mostliked} />
            <Route path='/mostanswered' exact component={Askedquestionbyuser} />
        </Switch> */}
    {/* </div> */}
    <div style={{padding:'0 0 0 0'}}>
    {question && (() => {
    return question.map((q) => {
        return <Questionbox questionid={q._id} likes={q.qlikes.length} questiontitle={q.question} answer={q.answers.length} tags={q.tags} 
    data_aos={'fade-up'} userdname={q.userdname} date={q.date} />
    // return  <div key={q._id}>
    //         <div data-aos="fade-up" data-aos-once='true' data-aos-duration="400" data-aos-offset='max-height' style={{backgroundColor:'#fdf7e2',borderBottom:'.1rem solid grey'}}>
    //             <h4 className='mainqdiv'>
    //                 <NavLink style={{ textDecorationLine: "none",textShadow: ".02em .04em black" }} to={`/question/${q._id}`}>
    //                     {q.question}
    //                 </NavLink>
    //             </h4>
    //             <div class="qla bg-secondary"> Likes: {q.qlikes.length}  </div>
    //             <div class="qla btn-info border">
    //                 <NavLink style={{color:'black',textDecoration:'none'}} to={`/question/${q._id}`}> Answer: {q.answers.length} </NavLink>
    //             </div>
    //             <div class="maintagdiv mx-2">
    //             {q.tags.map((o)=>{
    //             if(o!=""&&" ")
    //             return <NavLink style={{ color: 'white', fontFamily: 'monospace', padding: '.2rem' }} className="rounded-2 bg-dark" to={`/questionsby/${o}`}>
    //                     {o}
    //                 </NavLink>
    //             })}
    //             </div>
    //             <div class="maindnamediv">asked by &nbsp;
    //                 <NavLink style={{color:'navy',fontFamily:'SeogUI',fontWeight:"bold"}} to={`/user/${q.userdname}`}>
    //                     {alluser.map((r)=>{ if(r._id==q.userdname) return r.dname})}
    //                 </NavLink>
    //             </div>
    //             <div style={{width:'37%',display:'inline-block',margin:'6px',fontFamily:'SeogUI',fontWeight:"bold"}}>{setdated(q.date)} days ago</div>
    //         </div>
    // </div>
    })
})()} 
    
    {/* {question && <Questionbox questions={question} users={alluser} />} */}
    {!question && <Spinner/>}
    </div>
</div>
}
AOS.init();