import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import './css/qls.css'
import './css/spinner.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Spinner from './spinner'

export default function Topquestions(props) {

    const [question, setquestion] = useState([])

    
    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])
    console.log(question)

    // function selectq(id){
    //         props.history.push("/question/"+id)
    // }

    return (
        <div className='container row'>
            <div style={{border: '1px solid grey',padding: '0 0 1% 0'}}>
                <h1 style={{fontFamily:'fantasy',fontWeight:'normal',margin:'1% 0 1% 1%',width:'30%',display:'inline-block'}}> Top Questions </h1><br />
                <button style={{margin:'0px 5px 0px 5px'}} className=' bg-info' type='button'> Newest </button>
                <button style={{margin:'0px 5px 0px 5px'}} className=' bg-info' type='button'> Most Liked </button>
                <button style={{margin:'0px 5px 0px 5px'}} className=' bg-info' type='button'> Most Answered </button>
            </div>
            <div style={{border:'1px solid grey'}} >
            {question && question.map((q) => {
            return  <div key={q._id}>
                <div data-aos="fade-in" data-aos-once='true' data-aos-duration="400" data-aos-offset='max-height'  style={{backgroundColor:'ButtonHighlight'}}>
                    <h4 style={{margin:'6px',boxSizing:"border-box",width:'64%',display:'inline-block',textDecoration:'none'}}><NavLink style={{color:'CaptionText'}} to={`/question/${q._id}`}>{q.question}</NavLink></h4>
                    {/* <h4 onClick={selectq(q._id)} style={{margin:'6px',padding:'0',boxSizing:"border-box",width:'64%',display:'inline-block',textDecoration:'none'}}>{q.question}</h4> */}
                    &nbsp; &nbsp;<div style={{width:'14%',display:'inline-block',margin:'6px',fontFamily:'serif',fontWeight:'600'}} > Likes: {/* {q.qlikes.lenght}  */} </div>
                    &nbsp; &nbsp;<div style={{width:'14%',display:'inline-block',margin:'6px',fontFamily:'serif',fontWeight:'600'}} > Answer: {/* {q.answer.length} */} </div>
                    <div style={{width:'46%',display:'inline-block',margin:'6px'}}><NavLink style={{color:'navy',fontFamily:'monospace'}} className="bg-warning" to={`/tag/${q.tag}`}>{q.tag}</NavLink></div>
                    &nbsp; &nbsp;<div style={{width:'36%',display:'inline-block',margin:'6px',fontFamily:'Times'}}>{q.date}</div>
                    <div style={{width:'10%',display:'inline-block',margin:'6px'}} className="text-info"><NavLink style={{color:'navy',fontFamily:'cursive'}} to={`/user/${q.userdname}`}>{q.userdname}</NavLink></div>
                    <hr style={{margin:'0',padding:'0',color:'black'}} />
                </div>
            </div>
            })}
            {!question && <Spinner/>}
            </div>
        </div>
    )
}
AOS.init();