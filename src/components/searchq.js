import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Searchq(props) {

    console.log(props);
    // const [searchstate, setsearchstate] = useState()
    const [searchby, setsearchby] = useState(props.match.params.questionsearch.replace('5a5','?'))
    console.log(searchby);
    // setsearchby(props.location.searchstate)
    const [searchqdata, setsearchqdata] = useState([])
    const [alluser, setalluser] = useState([])

    useEffect(() => {
        // if(searchstate!=undefined||null||''){
            axios.get(`http://localhost:3001/list-user`).then((res)=>{
                setalluser(res.data.data)
            })
            console.log(searchby)
            // axios.get(`http://localhost:3001/list-question`).then((res)=>{setsearchqdata(res.data.data)})
            // console.log(searchqdata);
            axios.post(`http://localhost:3001/list-question-byquestion`, { searchby }).then((res) => {
                setsearchqdata(res.data.data)
                console.log(res.data.data);
                console.log(res.data.status);
            })
        }, [props.match.params.questionsearch])
        
        // useEffect(() => {
        //    if(searchby==searchstate){
        //         setsearchby(props.match.params.questionsearch.replace('5a5','?'))
        //         console.log(searchby);
        //     }
        // }, [])

    return (
        <div className='' style={{minHeight:"70vh"}}>
            <p className='p-1 display-5 ' style={{ fontFamily: "SeoogUI" }}>Questions as your search</p>
            <div className='w-100 bg-light'>
                {searchqdata != [] ? searchqdata.map((q) => {
return <div data-aos="fade-down" data-aos-offset='max-height' data-aos-once='true' data-aos-duration="200" key={q._id}>
    <div style={{ borderBottom: '.1rem solid lightgrey' }}>
        <h4 data-aos="fade-left" data-aos-offset='max-height' data-aos-once='true' data-aos-duration="400" className='mainqdiv'>
            <NavLink style={{ textDecorationLine: "none", textShadow: ".02em .04em black" }} to={`/question/${q._id}`}>{q.question}</NavLink>
        </h4>
        <div class="qla bg-secondary"> Likes: {q.qlikes.length}  </div>
        <div class="qla bg-secondary">
            <NavLink style={{ color: 'black', textDecoration: 'none' }} to={`/question/${q._id}`}> Answer: {q.answers.length} </NavLink>
        </div><br />
        {q.tags.map((o) => {
            return <NavLink style={{ color: 'white', fontFamily: 'monospace', padding: '.2rem' }} className="rounded-2 bg-dark" to={`/questionsby/${o}`}>
                {o}
            </NavLink>
        })}
        <div style={{ width: '37%', display: 'inline-block', margin: '6px', fontFamily: 'Times' }}>asked at {q.date}</div>
        <div class="maindnamediv" style={{ fontSize: '.9rem', fontFamily: 'cursive' }}>asked by
            <NavLink style={{ color: 'navy', fontFamily: 'cursive' }} to={`/user/${q.userdname}`}>
                {alluser.map((r) => { if (r._id == q.userdname) return ' ' + r.dname })}
            </NavLink>
        </div>
    </div>
</div>
                })
                : <div>Your searched question is not available.</div>
            }

            </div>
        </div>
    )
}
