import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FcSearch } from 'react-icons/fc'
import Spinner from './spinner'

export default function Populartags() {

    const [question, setquestion] = useState('')

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])

    console.log(question)
    
    // var z = question.map((w)=>{return w.tag})
    // var z = [question.tag]
    // console.log(z)
    // const Boom = new Set([].concat(...z));
    // console.log(Boom)
    // var tags = [ question.map((t)=>{ return t.tags }) ]
    
    // function fun(){ 
    //     const Boom = new Set([].concat(...question.tag))
    //     let dStr = '';
    //     Boom.forEach(e=>{
    //     dStr += e + ' ';
    //     })
    //     document.write(dStr);
    // }

    return (
        <div>
            <h1 style={{fontFamily:'Fantasy'}}> Popular Tags </h1>
            <h3 style={{fontFamily:'Times',width:'95%'}}>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</h3>
            <input type="text" placeholder=" Search Tag " style={{paddingLeft:'1%',fontFamily:'monospace',fontWeight:'bold'}} name="searchq" id="searchq" required className="searchq" />
            <button class="searchb" style={{fontFamily:'Fantasy'}}><FcSearch/> Search</button><br/>
            <br />
            {!question && <Spinner/>}
            {/* {question && fun()
            } */}
            <div class="result"></div>
            {question && question.map((p)=>{
                console.log(p.tag)
                return  <div data-aos="zoom-in-up" data-aos-once='true' data-aos-duration="400"  className="col-md-3 text-center">
                <h4 style={{fontFamily:'sans-serif'}}>{ p.tag }</h4>
                <hr className="bg-primary"/>
                </div>
            })}
        </div>
    )
}
AOS.init();