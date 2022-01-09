import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import axios from "axios"
import { NavLink } from 'react-router-dom'

export default function Askaquestion(props) {

    const [allquestions, setallquestions] = useState([])
    const [question, setaskq] = useState('')
    const [questiondetail, setaskqd] = useState('')
    const [asktag, setasktag] = useState('')
    const [date, setdate] = useState(Date)
    const [qlikes, setqlikes] = useState([])
    const [answers, setanswers] = useState([])
    
    function setquestion(e) {
        e.target.name === "askq" && setaskq(e.target.value)
        e.target.name === "askqd" && setaskqd(e.target.value)
        e.target.name === "askt" && setasktag(e.target.value.replace(" ", ","))
    }
    console.log(asktag)

    const user = useSelector(state => state.user);
    const userdname = useSelector(state => state.user._id);
    const userpoints = useSelector(state => state.user.userlikes);
    console.log(userpoints);

    useEffect(() => {
        if (user == null) {
            alert("User not found, for ask question you have to login first")
            props.history.push('/Login')
        }
        else if (userdname == null) {
            alert("User not found, for ask question you have to login first")
            props.history.push('/Login')
        }else{
        axios.get("http://localhost:3001/list-question").then(res=>{
            console.log(res.data.data)
            setallquestions(res.data.data)
        })}
    },[])
    console.log(user)

    var regQuestion = /^[a-zA-Z ]+$/;
    function validateq() {
        console.log(asktag)
        // eslint-disable-next-line
        if (question == "" || question == null || question == " ") {
            alert("question title is missing");
        } else if (questiondetail == "" || questiondetail == null || questiondetail == " ") {
            alert("question body is missing");
        } else if (asktag == "" || asktag == null || asktag == " ") {
            alert("please enter atleast one tag");
        } else if(!regQuestion.test(question)){
            alert("Question is not in valid format, in question title you cannot put symbols")
        } else {
            validateq2()
        }
    }
    function validateq2() {
        var isvalid = true;
        allquestions.forEach((i)=>{
            if(question == i.question)
            isvalid = false;
        })
        if(isvalid===true)
        submitq()
        else
        alert('This question is already asked by any other user')
    }
    function submitq() {
        var tags = asktag.split(',');
        // alert(regQuestion)
        if (tags.length < 1) {
            alert("!For create your question you must use atleast 1 tags in it.")
        } else if (tags.length > 5) {
            alert("!You can not put more than 5 tags in your question.")
        } else if( tags[0] === '' || !regQuestion.test(tags[0])){
            alert(tags[0]+"- tag is not valid")
        } else if( tags[1] === '' || !regQuestion.test(tags[1])){
            alert(tags[1]+"- tag is not valid")
        } else if( tags[2] === '' || !regQuestion.test(tags[0])){
            alert(tags[2]+"- tag is not valid")
        } else if( tags[3] === '' || !regQuestion.test(tags[0])){
            alert(tags[3]+"- tag is not valid")
        } else if( tags[4] === '' || !regQuestion.test(tags[0])){
            alert(tags[4]+"- tag is not valid")
        } else {
            setdate(Date)
            var createq = { qlikes, question, tags, userdname, date, answers, questiondetail }
            console.log(createq)
            // var poststatus ;
            axios.post("http://localhost:3001/create-question", createq).then((res) => {
                alert(res.data.data);
                if (res.data.status==="ok"){
                    let userpoint = userpoints + 5
                    let uid = {userdname,userpoint}
                    axios.post("http://localhost:3001/update-user-point", uid).then((res)=>{
                        console.log(res.data.data);
                    })
                }    
            })
            }
    }

    return (
<div className='bg-light' style={{ borderLeft: "2px solid lightgrey" }}>
    {user && <div class="ask m-0 mb-1">
        <h1 className='p-2'> Ask a public question </h1><br />
<div className='d-md-flex'>
    <form className='col-sm-12 col-md-7 card bg-white p-3 mb-md-4 d-inline-block mx-md-4' style={{height:"inherit"}}>
        <label for="askq"><b>Enter your question title</b></label><br />
        <label>Be specific and imagine you’re asking a question to another person</label>
        <input type="text" value={question} onChange={(e) => { setquestion(e) }} placeholder="Enter your question title" name="askq" id="askq"
            required style={{ width: "90%" }} /><br />
            <br />
        <label for="askqd"><b>Describe your question</b></label><br />
        <label>Include all the information someone would need to answer your question</label>
        <textarea type="text" value={questiondetail} onChange={(e) => { setquestion(e) }} placeholder="Describe your question" name="askqd" id="askqd"
            required rows="7" style={{ width: "90%" }}></textarea><br />
            <br />
        <label for="asktag"><b>Enter tags related to questions</b></label><br />
        <label>Add up to 5 tags to describe what your question is about</label>
        <input type="text" value={asktag} onChange={(e) => { setquestion(e) }} placeholder="Enter tags related to question" name="askt" id="asktag"
            required style={{ width: "90%" }} /><br /> <br />
            <br />
        <button type="reset" onClick={validateq} class="submitquestion btn btn-primary m-2 form-btn" style={{borderRadius:".2em",boxShadow:" .08em .2em #888888"}}>Publish Question</button>
        <style jsx>{`.submitquestion:hover {color:pink !important}`}</style>
        <style jsx>{`.submitquestion:focus {color:pink !important}`}</style>
    </form>
    <div className='col-md-4 col-sm-11 d-inline-block mb-4 mx-1 card'>
        <div className='card-header text-center'><h4>Tips for your question</h4></div>
            <p class="p-2">The community is here to help you with specific coding, algorithm, or language problems.<br/>
            Avoid asking opinion-based questions.</p>
        <details className='p-2'>
            <summary style={{fontFamily:"sans-serif"}}><h5 class="d-inline-block">1. Summarize the problem</h5></summary>
            <p className='px-3 py-1'>Include details about your goal Describe expected and actual results Include any error messages</p>
        </details>
        <details className='p-2'>
            <summary style={{fontFamily:"sans-serif"}}><h5 class="d-inline-block">2. Describe what you’ve tried</h5></summary>
            <p class="px-3 py-1">Show what you’ve tried and tell us what you found (on this site or elsewhere) and why it
                didn’t meet your needs. You can get better answers when you provide research.</p>
        </details>
        <details class="p-2">
            <summary style={{fontFamily:"sans-serif"}}><h5 class="d-inline-block">3. How to tag</h5></summary>
            <p>Tags help the right people find and answer your question.</p>
            <li>Identify your tags by completing the sentence, "My question is about…"</li>
            <li>Include tags that are crucial to your question only, like&nbsp; 
                <NavLink activeClassName='active' to='/questionsby/java' >java</NavLink>
            </li>
            <li>Only include version numbers, like c#-4.0, when absolutely necessary</li>
            <li>Use existing popular tags</li>
        </details>
    </div>
</div>
    </div>}
</div>
    )
}
