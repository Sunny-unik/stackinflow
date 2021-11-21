import React, { useEffect, useState } from 'react'
import {  useSelector } from "react-redux"
import axios from "axios"

export default function Askaquestion(props) {
    
    const [question, setaskq] = useState('')
    const [tag, setasktag] = useState([])
    const [date, setdate] = useState(Date)
    const [qlikes, setqlikes] = useState([])
    const [answers, setanswers] = useState([])

    function setquestion(e) {
        e.target.name === "askq" && setaskq(e.target.value)
        e.target.name === "asktag" && setasktag(e.target.value.split(' '))
    }
    
    // var tags = tag.split(" ")

    const user = useSelector(state => state.user);
    const userdname = useSelector(state => state.user.dname);
    
    useEffect(() => {
        if(user==null){
            alert("User not found, for ask question you have to login first")
            props.history.push('/Login')
        }
        else if(userdname==null){
            alert("User not found, for ask question you have to login first")
            props.history.push('/Login')
        }
    })
    console.log(user)
    
    function validateq(){ 
    // eslint-disable-next-line
        if(question=="" || question==null || question==" "){
            alert("please enter meaningfull question");
        }
        else{
            submitq()
        }
    }

    function submitq(){
        setdate(Date)
        // settags(tag.split(' '))
        var createq = { qlikes,question,tag,userdname,date,answers }
        console.log(createq)
        axios.post("http://localhost:3001/create-question",createq).then((res) => {
            alert(res.data.data);
        })
    }

    return (
        <div style={{minHeight:'80vh'}}>
            {user && <div class="ask mb-1">
            <b><h1> Ask any Question </h1></b><br/>
            <form>
            <label for="askq"><b>Enter your Question</b></label><br/>
            <input type="text" value={question} onChange={(e)=>{setquestion(e)}} placeholder="Enter your question" name="askq" id="askq" required /><br/>
            <label for="asktag"><b>Enter tags related to questions</b></label><br/>
            <input type="text" value={tag} onChange={(e)=>{setquestion(e)}} placeholder="Enter tags related to question" name="asktag" id="asktag" required /><br/> <br/>
            <button type="button" onClick={validateq} class="submitquestion">Publish Question</button>
            </form>
            </div>}
        </div>
    )
}
