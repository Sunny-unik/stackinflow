import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
    function fun(){ 
        const Boom = new Set([].concat(...question.tag))
        let dStr = '';
        Boom.forEach(e=>{
        dStr += e + ' ';
        })
        document.write(dStr);
    }
    return (
        <div>
            <h1> Popular Tags </h1>
            <input type="text" placeholder="Search Tag " name="searchq" id="searchq" required className="searchq" />
            <button class="searchb"><i className="glyphicon glyphicon-search"> </i> Search</button><br/>
            <br />
            {!question && <div className="mt-md-2 mt-lg-2 loading text-center">
                {/* <div class="spinnerdiv"> */}
                <i class="spinner"></i>
                <p>loading..</p>
                {/* </div> */}
                <div>your network seems down or slow</div>
            </div>}
            {/* {question && fun()
            } */}
            <div class="result"></div>
            {question && question.map((p)=>{
                console.log(p.tag)
                return  <div className="col-md-3">
                <h4>{ p.tag }</h4>
                <hr className="bg-primary"/>
                </div>
            })}
        </div>
    )
}
