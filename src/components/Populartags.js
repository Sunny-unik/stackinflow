import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FcSearch } from 'react-icons/fc'
import Spinner from './spinner'

export default function Populartags(props) {

    const [question, setquestion] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])
    console.log(question)

    var alltags = question.map((d)=>{
        return d.tags
    })
    console.log(alltags)
    
    var uniquetags;
    uniquetags = new Set([].concat(...alltags))
    console.log(uniquetags);
    
    var printedtags = new Array;

    // var b = new Array;
    // var a;
    // function checkintags(k,l){
    //     console.log(k)
        // console.log(l)
    //     k.filter((j)=>{if(j==l){ console.log("hi");a='true'}else{a='false'}})
    // }

    function questionsbytag(n){
        // console.log(n)
        // question.filter((v)=>{checkintags(v.tag,n);if(a=='true'){b.push(v._id)}})
        // console.log(b)  
        props.history.push('questionsby/'+n)
    }
    
    return <div style={{borderLeft:'2px solid lightgrey'}}>
        <div className="container" style={{ borderBottom: '2px solid lightgrey',paddingBottom:'.6rem' }}>
            <h1 style={{fontFamily:'sans-serif',marginTop:'.4rem'}}> Popular Tags </h1>
            <h4 style={{fontFamily:'Times',width:'95%'}}>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</h4>
            <input type="text" placeholder=" Search Tag" style={{ paddingLeft: '1%', fontFamily: 'monospace', fontWeight: 'bold' }} name="searcht" id="searcht" required className="searchtp" />
            <button class="searchb" style={{ fontFamily: 'Fantasy' }}><FcSearch /> Search</button>
        </div>
        <div style={{minHeight:'80vh'}}>
        {!question && <Spinner />}
        {question && uniquetags.forEach((y)=>{
            printedtags.push(y)
        })}
        {question && printedtags.map((t)=>{
            return <div data-aos="zoom-in" data-aos-offset='max-height' data-aos-once='true' data-aos-duration="200" style={{cursor:"pointer"}}
            className="col-md-2 d-inline-block text-center m-2 p-2 border border-3 border-secondary rounded-3 card-footer"
            onClick={()=>{questionsbytag(t)}}>{t}</div>
        })}
        </div>
        </div>
}
AOS.init();