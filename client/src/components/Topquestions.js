import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Spinner from './spinner'
import Questionbox from './questionbox'
import './css/spinner.css'

export default function Topquestions() {

    const [question, setquestion] = useState([])
    const [sortby, setsortby] = useState("newest")

    useEffect(() => {
        axios.get(`http://localhost:3001/list-question`).then((res) => {
            if(sortby=="newest"){
                setquestion(res.data.data.reverse())
            } else if (sortby=="oldest"){
                setquestion(res.data.data)
            } else if (sortby=="mostliked"){
                setquestion(res.data.data.sort((a,b)=>{return a.qlikes.length-b.qlikes.length}).reverse())
            } else if (sortby=="notanswered"){
                setquestion(res.data.data.reverse().filter((a)=>{return a.answers.length==0}))
            } else if (sortby=="mostanswered"){
                setquestion(res.data.data.sort((a,b)=>{return a.answers.length-b.answers.length}).reverse())
            }
        })
    }, [sortby])
    
    function radiohandler(e) {
        if(e.target.id==="btnradio1"){
            console.log(e.target.id);
            setsortby("newest")
            console.log(question);
        } else if(e.target.id==="btnradio2"){
            console.log(e.target.id);
            setsortby("oldest")
            console.log(question);
        } else if(e.target.id==="btnradio3"){
            console.log(e.target.id);
            setsortby("mostliked")
        } else if(e.target.id==="btnradio4"){
            console.log(e.target.id);
            setsortby("mostanswered")
        } else{
            console.log(e.target.id);
            setsortby("notanswered")
        }
    }

return <div className='row p-0' style={{ borderLeft: '.1rem solid lightgrey', paddingLeft: '.2rem', minHeight: '80vh' }}>
    <div style={{ padding: '.5%', borderBottom: '.1rem solid lightgrey' }}>
        <h1 class="d-inline-block">&nbsp;Top Questions </h1>
        <div class="btn-group float-end w-75-md w-100-sm my-2 p-2" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onChange={radiohandler}/>
            <label class={sortby=="newest"?"btn btn-outline-primary active":"btn btn-outline-primary"} for="btnradio1"  id="btnradioa">Newest</label>
            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off"  onChange={radiohandler}/>
            <label class="btn btn-outline-primary" for="btnradio2">Oldest</label>
            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off"  onChange={radiohandler}/>
            <label class="btn btn-outline-primary" for="btnradio3">Most Liked</label>
            <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off"  onChange={radiohandler}/>
            <label class="btn btn-outline-primary" for="btnradio4">Most Answered</label>
            <input type="radio" class="btn-check" name="btnradio" id="btnradio5" autocomplete="off"  onChange={radiohandler}/>
            <label class="btn btn-outline-primary" for="btnradio5">Not Answered</label>
        </div>
    </div>
    <div className='p-0'>
        {question.map((q) => {
        return <Questionbox questionid={q._id} likes={q.qlikes.length} questiontitle={q.question} answer={q.answers.length} tags={q.tags}
            data_aos={'fade-up'} userdname={q.userdname} date={q.date} />
        })}
        {!question && <Spinner />}
    </div>
</div>
}
AOS.init();