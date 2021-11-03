import React, { useEffect, useState } from 'react'
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Question(props) {

    const [question, setquestion] = useState("")
    const [qusername, setqusername] = useState("")
    const [tag, settag] = useState([])
    const [qdate, setqdate] = useState()
    const [qlikes, setqlikes] = useState([])
    const [answer, setanswer] = useState([])

    const user = useSelector(state => state.user);
    
    var qid = props.match.params.id;
    console.log(qid)
    useEffect(() => {
        axios.get("http://localhost:3001/question-by-id/?id="+qid).then((res) => {
        console.log(res.data.data)
            setquestion(res.data.data[0].question)
            setqusername(res.data.data[0].userdname)
            settag(res.data.data[0].tag)
            setqdate(res.data.data[0].date)
            setqlikes(res.data.data[0].qlikes)
            setanswer(res.data.data[0].answers)
        })
    }, [])
    console.log(answer);
    
    return <div style={{borderLeft:'.1rem solid lightgrey'}}>
        <div style={{display:'flex',justifyContent:'space-between' ,alignItems:'center'}}>
        <h1>Q.</h1><h2 className="col-sm-8 text-left" style={{fontFamily:'fantasy'}}>{question}</h2>
        <button className='col-sm-1 likebtn' style={{backgroundColor:'white',height:'min-content',width:'min-content'}}><FcLike/>{qlikes? qlikes.length : '0' }</button>
        <div className="col-sm-3">Asked By <NavLink style={{fontFamily:'cursive'}} to={`/user/${qusername}`}>{qusername}</NavLink> on <br/>{qdate}.</div>
        </div><br/>
        <h4>Know someone who can answer? Share a link to this question via <a href='#' target="_blank">email</a>, <a href='#' target="_blank">Twitter</a>or <a href='#' target="_blank">Facebook</a>.</h4>
        
        {answer!='' && <h2>Given Answers</h2>}
        {answer!='' && answer.map((a) => {
        return  <div style={{margin:'1rem 1rem 1rem 1rem'}} key={a.answer}>
        <div className="answersec container-fluid">
        <h4 className='col-sm-8'>{a.answer}</h4>
        <button className='col-sm-1 likebtn' style={{backgroundColor:'white',height:'min-content',width:'min-content'}}><FcLikePlaceholder/>{a.alikes ? a.alikes.length : 0} </button>
        <div className="col-sm-3">Asked By <NavLink style={{fontFamily:'cursive'}} to={`/user/${a.username}`}>{a.username}</NavLink> on <br/>{a.date}.</div>
        </div>
        </div> }) }
        {answer=='' && <h3><b>No answer given</b></h3>}

        <h2>Your Answer</h2>
        <textarea className="col-sm-12" style={{height:'30vh',marginBottom:'.8rem',fontSize:'2.2rem'}}></textarea>
        <button type='button' className='bg-primary postans' style={{marginBottom:'1.5rem',borderRadius:'1rem 1rem 1rem 1rem',fontSize:'large',padding:'.8rem 1.2rem .8rem 1.2rem'}}> Post Answer </button>
        <div className="col-sm-12 bg-warning">Thanks for contributing an answer to Stackinflow!<br/>Please be sure to answer the question. Provide details and share your research!<br/>But avoid …<br/><br/>Asking for help, clarification, or responding to other answers.<br/>Making statements based on opinion; back them up with references or personal experience.
        </div>
        <br/>
        <h3 style={{display:'inline-block',margin:'1rem 1rem 1rem 0rem'}}>Browse other questions tagged &nbsp;
        <NavLink style={{fontFamily:'monospace'}} className="bg-warning" to={`/tag/${tag}`}>{tag}</NavLink>&nbsp; 
        {user ? <span> or <NavLink style={{fontFamily:'monospace'}} className="bg-warning" to={`/Askaquestion`}>ask you own question.</NavLink></span> 
        : <span>or <NavLink className='bg-warning' to={'/login'}>login </NavLink>first for ask your own questions.</span>}
        </h3>
        
    </div>
}