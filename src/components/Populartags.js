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

    // var tags = [ question.map((t)=>{ return t.tags }) ]

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
            {question && question.map((t)=>{
                return  <div className="col-md-3">
                <h4>{t.tag}</h4>
                <hr className="bg-primary"/>
            </div>
            })}
        </div>
    )
}
