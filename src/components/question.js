import React, { useEffect, useState } from 'react'
import { FcDislike, FcLike as div, FcLike, FcLikePlaceholder } from 'react-icons/fc';
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./css/home.css"

export default function Question(props) {

    const [question, setquestion] = useState("")
    const [qusername, setqusername] = useState("")
    const [tag, settag] = useState([])
    const [qdate, setqdate] = useState()
    const [qlikes, setqlikes] = useState([])
    const [answer, setanswer] = useState([])
    const [postanswer, setpostanswer] = useState()
    const [alikes, setalikes] = useState([])
    const [date, setdate] = useState(Date)

    const user = useSelector(state => state.user);
    const [alluser, setalluser] = useState([])

    var qid = props.match.params.id;
    console.log(qid)
    useEffect(() => {
        axios.get("http://localhost:3001/question-by-id/?id="+qid).then((res) => {
        console.log(res.data.data)
            setquestion(res.data.data[0].question)
            setqusername(res.data.data[0].userdname)
            settag(res.data.data[0].tags)
            setqdate(res.data.data[0].date)
            setqlikes(res.data.data[0].qlikes)
            setanswer(res.data.data[0].answers)
        })
        axios.get("http://localhost:3001/list-user").then((res) => {
            console.log(res.data)
            setalluser(res.data.data)
        })
    }, [question])

    function setposta(e) {
        e.target.name === "seta" && setpostanswer(e.target.value)
    }

    function listanswer(){    
        // const userdname = useSelector(state => state.user.dname)
        if(user==null){
            alert('For submit your answer you need to login first')
        }
        else{
            // var question_id = qid
            var uid = user._id
            let answer = postanswer
            setdate(Date)
            var lista = {uid,date,answer,alikes,qid}
            console.log(lista)
            axios.post("http://localhost:3001/create-answer",lista).then((res) => {
                alert(res.data.data);
            })
        }
    }

    function likeclick() {
        if(!user){
            alert("for do this action you need to login first")
        }else if(qlikes.includes(user._id)==true){
            var indexforpop = qlikes.indexOf(user._id)
            qlikes.pop(indexforpop)
            var removeqlike = {qid,qlikes}
            axios.post("http://localhost:3001/remove-qlike",removeqlike).then((res)=>{
                alert(res.data.data)
            })
        }else{
            var uid = user._id
            var addqlike = {uid,qid}
            axios.post("http://localhost:3001/add-qlike",addqlike).then((res)=>{
                alert(res.data.data)
            })
        }
    }
    
    return <div style={{borderLeft:'.1rem solid lightgrey',minHeight:'80vh'}}>
        <div style={{display:'flex',justifyContent:'space-between' ,alignItems:'center'}}>
        <h1>Q.</h1><h2 className="col-sm-8 text-left" style={{fontFamily:'fantasy'}}>{question}</h2>
        <button className='col-sm-1 likebtn' onClick={likeclick} style={{backgroundColor:'white',height:'min-content',width:'min-content'}}>
            {user ? qlikes.includes(user._id)==true ? <FcLike/> : <FcLikePlaceholder/> : <FcDislike/> }
            {qlikes? qlikes.length : '0' }
        </button>&nbsp;
        <div className="col-sm-3">Asked By&nbsp;
        <NavLink style={{fontFamily:'cursive'}} to={`/user/${qusername}`}>
            {alluser.map((r)=>{ if(r._id==qusername) return r.dname})}
        </NavLink> on <br/>{qdate}.</div>
        </div><br/>
        <h4>Know someone who can answer? Share a link to this question via <a href='#' target="_blank">email</a>, <a href='#' target="_blank">Twitter</a>or <a href='#' target="_blank">Facebook</a>.</h4>
        
        {answer!='' && <h2>Given Answers</h2>}
        {answer!='' && answer.map((a) => {
        return  <div style={{margin:'1rem 1rem 1rem 1rem'}} key={a.uid}>
        <div className="answersec container-fluid">
        <h4 className='col-sm-8'>{a.answer}</h4>
        <button className='col-sm-1 likebtn' style={{backgroundColor:'white',height:'min-content',width:'min-content'}}>
            <FcLikePlaceholder/>{a.alikes ? a.alikes.length : 0} 
        </button>
        <div className="col-sm-3">Given By&nbsp;
            <NavLink style={{fontFamily:'cursive'}} to={`/user/${a.uid}`}>
                {alluser.map((r)=>{ if(r._id==a.uid)return r.dname })}
            </NavLink> on <br/>{a.date}.
        </div>
        </div>
        </div> }) }
        {answer=='' && <h3><b>No answer given</b></h3>}

        <h2>Your Answer</h2>
        <textarea className="col-sm-12" onChange={(e)=>{setposta(e)}} name="seta" id="seta" style={{height:'30vh',marginBottom:'.6rem',fontSize:'1.4rem'}}></textarea>
        <button type='button' onClick={listanswer} className='bg-primary postans' style={{marginBottom:'1.5rem',borderRadius:'1rem 1rem 1rem 1rem',fontSize:'large',padding:'.8rem 1.2rem .8rem 1.2rem'}}> Post Answer </button>
        <div className="col-sm-12 bg-warning">Thanks for contributing an answer to Stackinflow!<br/>Please be sure to answer the question. Provide details and share your research!<br/>But avoid …<br/><br/>Asking for help, clarification, or responding to other answers.<br/>Making statements based on opinion; back them up with references or personal experience.
        </div>
        <br/>
        <h3 style={{display:'inline-block',margin:'1rem 1rem 1rem 0rem'}}>Browse other questions tagged &nbsp;
        {tag.map((o)=>{
            return <NavLink style={{fontFamily:'monospace'}} className="bg-warning" to={`/questionsby/${o}`}>
                    {o+", "}
                </NavLink>
        })}&nbsp; 
        {user ? <span> or <NavLink style={{fontFamily:'monospace'}} className="bg-warning" to={`/Askaquestion`}>ask you own question.</NavLink></span> 
        : <span>or <NavLink className='bg-warning' to={'/login'}>login </NavLink>first for ask your own questions.</span>}
        </h3>
        
    </div>
}