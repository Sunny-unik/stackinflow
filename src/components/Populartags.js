import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FcSearch } from 'react-icons/fc'
import Spinner from './spinner'

export default function Populartags(props) {

    const [question, setquestion] = useState([])
    const [searchtag, setsearchtag] = useState(null)
    
    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            setquestion(res.data.data)
        })
    }, [])
    
    var alltags = question.map((d)=>{
        return d.tags
    })
    
    var uniquetags;
    uniquetags = new Set([].concat(...alltags))
    
    var printedtags = new Array;

    function questionsbytag(n,action){
        if(action!="search"&&' ')
        props.history.push('questionsby/'+n)
        else
        {
            if(searchtag==null)
            alert("Enter some tags first in input box")
            else if(searchtag.includes(' ')==true)
            alert("Remove blank space from input box")
            else 
            props.history.push('questionsby/'+searchtag)
        }    
    }
    
    return <div>
        <div className="container" style={{ borderBottom: '2px solid lightgrey',paddingBottom:'.6rem' }}>
            <h1 style={{fontFamily:'sans-serif',marginTop:'.4rem'}}> Popular Tags </h1>
            <h4 style={{fontFamily:'Times',width:'95%'}}>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</h4>
            <input type="text" placeholder=" Search Tag" style={{ paddingLeft: '1%', fontFamily: 'monospace', fontWeight: 'bold' }} list='searchtag'
             onChange={(e)=>{setsearchtag(e.target.value)}} value={searchtag} name="searcht" id="searcht" required className="searchtp" />
            <datalist id="searchtag">
                {question && uniquetags.forEach((y)=>{
                    printedtags.push(y)
                })}
                {printedtags.map((u)=>{return <option>{u}</option>})}
            </datalist>
            <button class="searchb" onClick={()=>{questionsbytag("notvalid","search")}} style={{ fontFamily: 'Fantasy' }}><FcSearch /> Search</button>
        </div>
        <div style={{minHeight:'40vh'}}>
        {!question && <Spinner />}
        {question && printedtags.map((t)=>{
            return <div data-aos="zoom-in" data-aos-offset='max-height' data-aos-once='true' data-aos-duration="200" style={{cursor:"pointer"}}
            className="col-md-2 d-inline-block text-center m-2 p-2 border border-3 border-secondary rounded-3 card-footer"
            onClick={()=>{questionsbytag(t,"open")}}>{t}</div>
        })}
        </div>
        </div>
}
AOS.init();