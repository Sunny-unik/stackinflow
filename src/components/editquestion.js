import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Editquestion(props) {
    
    const [questionid, setquestionid] = useState(props.location.questionid)
    const [question, setquestiontitle] = useState(props.location.questiontitle)
    const [questiondetail, setquestiond] = useState(props.location.questiondetails)
    const [qtags, setqtag] = useState(props.location.questiontags)
    const [qlikes, setqlikes] = useState(props.location.questionlikes)
    const [date, setqdate] = useState(props.location.questiondate)
    const [userdname, setquserdname] = useState(props.location.questionuserdname)
    const [answers, setqanswer] = useState(props.location.qanswers)

    function setquestion(e) {
        e.target.name === "questiontitle" && setquestiontitle(e.target.value)
        e.target.name === "questiondetail" && setquestiond(e.target.value)
        e.target.name === "questiontag" && setqtag(e.target.value.replace(" ", ","))
    }

    function validateq() {
        // eslint-disable-next-line
        if (question == "" || question == null || question == " ") {
            alert("question title is missing");
        } else if (questiondetail == "" || questiondetail == null || questiondetail == " ") {
            alert("question body is missing");
        } else if (qtags == "" || qtags == null || qtags == " ") {
            alert("please enter atleast one tag");
        }
        else {
            submitq()
        }
    }
    function submitq() {
        var tags = qtags.split(',');
        console.log(tags)
        if (tags.length < 1) {
            alert("!For create your question you must use atleast 1 tags in it.")
        } else if (tags.length > 5) {
            alert("!You can not put more than 5 tags in your question.")
        } else {
            var createq = { qlikes, question, tags, userdname, date, answers, questiondetail, questionid }
            console.log(createq)
            axios.post('http://localhost:3001/update-question', createq).then((res) => {
                alert(res.data.data);
            })
        }
    }

return (
<div style={{borderLeft:".05rem solid lightgrey",minHeight:"64vh"}} className='p-1'>
    <h1 className='text-center text-md-start text-lg-start'>&nbsp;Edit Question </h1>
    {console.log(questionid)}
    {questionid ? <div className='d-md-flex'>
    <form style={{fontSize:"larger",color:"whitesmoke",textShadow:".02em .02em black"}} className='p-2 col-sm-12 col-md-7 d-md-inline-block border rounded m-2 bg-secondary' id='editqmain'>
        <label for="questiontitle" className='m-1 form-label'> Question Title </label>
    <input onChange={(e)=>{setquestion(e)}} type='text' className='m-1 col-sm-11 form-control' id="questiontitle" value={question} name="questiontitle" required/>

        <label for="questiondetail" className='m-1 form-label'> Question Description </label>
    <textarea onChange={(e)=>{setquestion(e)}} type='text' className='m-1 col-sm-11 form-control' id="questiondetail" value={questiondetail} name="questiondetail" required></textarea>

        <label for="questiontag" className='m-1 form-label'> Question Tags </label>
    <input onChange={(e)=>{setquestion(e)}} type='text' className='m-1 col-sm-11 form-control' id="questiontag" value={qtags} name="questiontag" required/>
        <br/><button type='reset' className='m-1 mt-0 p-2 bg-info rounded-3 editqbtn' onClick={validateq}> Update Question </button>
        <style jsx>{`.editqbtn:hover {background:lightgreen !important}`}</style>
        <style jsx>{`.editqbtn:focus {background:lightgreen !important}`}</style>
    </form>
    <div className='col-md-4 col-sm-12 d-inline-block mb-4 mx-1 mt-2 card'>
        <div className='card-header'><h4>Tips for your question</h4></div>
            <p class="p-2 card-header">The community is here to help you with specific coding, algorithm, or language problems.<br/>
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
    </div> : <h3 className='text-center'>Question Not Found</h3>}
</div>
)
}
