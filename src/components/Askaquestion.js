import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

export default function Askaquestion(props) {
    
    const [askq, setaskq] = useState('')
    const [asktag, setasktag] = useState('')
    const [qtime, setqtime] = useState('')

    function setquestion(e) {
        e.target.name === "askq" && setaskq(e.target.value)
        e.target.name === "asktag" && setasktag(e.target.value)
    }

    const user = useSelector(state => state.user);
    const username = useSelector(state => state.user.dname);
    
    useEffect(() => {
        if(user==null){
            alert("User need to login first")
            props.history.push('/Login')
        }
    })
    console.log(user)
    
    function submitq(){
        setqtime(Date)
        var createq = {askq,asktag,username}
        console.log(createq)
        axios.post("http://localhost:3001/create-question",createq).then((res) => {
            alert(res.data.data);
        })
    }

    return (
        <div>
            {user && <div class="ask mb-1">
            <b><h1>Ask any Question</h1></b><br/>
            <form>
            <label for="askq"><b>Enter your Question</b></label><br/>
            <input type="text" value={askq} onChange={(e)=>{setquestion(e)}} placeholder="Enter your question" name="askq" id="askq" required /><br/>
            <label for="asktag"><b>Enter tags related to questions</b></label><br/>
            <input type="text" value={asktag} onChange={(e)=>{setquestion(e)}} placeholder="Enter tags related to question" name="asktag" id="asktag" required /><br/> <br/>
            <button type="button" onClick={submitq} class="submitquestion">Submit Question</button>
            </form>
            </div>}
        </div>
    )
}
