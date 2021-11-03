import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FcSearch } from 'react-icons/fc'
import Spinner from './spinner'

export default function Populartags() {

    const [question, setquestion] = useState('')
    // const [alltag, setalltag] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
            // setalltag(res.data.data.tag)
        })
    }, [])

    // console.log(alltag)
    // console.log(question.tag)

    // var z = question.map((w)=>{return w.tag})
    // console.log(z);
    // var z = [question.tag]
    // console.log(z)
    // const Boom = new Set([].concat(...z));
    // console.log(Boom)
    // var tags = [ question.map((t)=>{ return t.tags }) ]

    // function fun(){ 
    //     var Boom = new Set([].concat(...z))
        // let dStr = '';
        // console.log(Boom);
        // Boom.forEach(e=>{
        // dStr += e + ' ';
        // })
        // console.log(dStr)
        // document.write(dStr);
    // }
    // useEffect(() => {
    //     fun()
    // }, [])

    return <div style={{borderLeft:'2px solid lightgrey'}}>
        <div className="container" style={{ borderBottom: '2px solid lightgrey',paddingBottom:'.6rem' }}>
            <h1 style={{fontFamily:'sans-serif',marginTop:'.4rem'}}> Popular Tags </h1>
            <h4 style={{fontFamily:'Times',width:'95%'}}>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</h4>
            <input type="text" placeholder=" Search Tag" style={{ paddingLeft: '1%', fontFamily: 'monospace', fontWeight: 'bold' }} name="searcht" id="searcht" required className="searchtp" />
            <button class="searchb" style={{ fontFamily: 'Fantasy' }}><FcSearch /> Search</button>
        </div>
        {!question && <Spinner />}
        {question && question.map((p) => {
            return <div className="text-center" style={{padding:'1rem',display:'inline-block',width:'23%'}}>
                <div className="border border-3 border-secondary rounded-3 m-0 p-0 card-header"> {p.tag} </div>
                <div className="border border-3 border-secondary rounded-3 m-0 p-0 card-body"> {p.tag} </div>
            </div>
        })}
        </div>
}
AOS.init();