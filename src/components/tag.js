import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Spinner from './spinner';

export default function Tag(props) {

    const [questionbyt, setquestionbyt] = useState([])

    var tag = props.match.params.tag;
    console.log(tag)

    useEffect(() => {
        axios.get("http://localhost:3001/question-by-tag/?tag=" + tag).then((res) => {
            console.log(res.data.data)
            setquestionbyt(res.data.data)
        })
    }, [])

    return (
        <React.Fragment>
            <h1 style={{fontFamily:'sans-serif'}}> These questions are realeted to {tag} tag. </h1>
            <h6>{questionbyt && questionbyt.map((q) => {
                return <div key={q._id}>
                    <div data-aos="fade-in" data-aos-once='true' data-aos-duration="400" data-aos-offset='max-height' style={{ backgroundColor: 'ButtonHighlight' }}>
                        <h4 style={{ margin: '6px', boxSizing: "border-box", width: '64%', display: 'inline-block', textDecoration: 'none' }}><NavLink style={{ color: 'CaptionText' }} to={`/question/${q._id}`}>{q.question}</NavLink></h4>
                        {/* <h4 onClick={selectq(q._id)} style={{margin:'6px',padding:'0',boxSizing:"border-box",width:'64%',display:'inline-block',textDecoration:'none'}}>{q.question}</h4> */}
                        &nbsp; &nbsp;<div style={{ width: '14%', display: 'inline-block', margin: '6px', fontFamily: 'serif', fontWeight: '600' }} > Likes: 6665466 </div>
                        &nbsp; &nbsp;<div style={{ width: '14%', display: 'inline-block', margin: '6px', fontFamily: 'serif', fontWeight: '600' }} > Answer: 6665466 </div>
                        <div style={{ width: '46%', display: 'inline-block', margin: '6px' }}><NavLink style={{ color: 'navy', fontFamily: 'monospace' }} className="bg-warning" to={`/tag/${q.tag}`}>{q.tag}</NavLink></div>
                        &nbsp; &nbsp;<div style={{ width: '36%', display: 'inline-block', margin: '6px', fontFamily: 'Times' }}>{q.date}</div>
                        <div style={{ width: '10%', display: 'inline-block', margin: '6px' }} className="text-info"><NavLink style={{ color: 'navy', fontFamily: 'cursive' }} to={`/user/${q.userdname}`}>{q.userdname}</NavLink></div>
                        <hr style={{ margin: '0', padding: '0', color: 'black' }} />
                    </div>
                </div>
            })} </h6>
            <p> {!questionbyt && <Spinner />} </p>
        </React.Fragment>
    )
}
