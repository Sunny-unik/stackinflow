import axios from 'axios';
import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import AOS from 'aos'
import 'aos/dist/aos.css'
import Spinner from './spinner'
import Reactpaginate from 'react-paginate'

export default function Allquestions() {

    const [questionlength, setquestionlength] = useState()
    const [alluser, setalluser] = useState([])
    const [questions, setquestions] = useState([])
    
    var limit = 4;
    var currentpage = {selected:0};

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            setquestionlength(res.data.data.length)
        })
        axios.get("http://localhost:3001/list-user").then((res) => {
            setalluser(res.data.data)
        })
        axios.get(`http://localhost:3001/list-question-bypage?page=${currentpage.selected}&limit=${limit}`).then((res) => {
            setquestions(res.data.data)
        })
    }, [])
    console.log(questions)
    console.log(questionlength)
    console.log(alluser)

    // function changelimit(l) {
    //     console.log(l.target.innerText);
    //     limit = l.target.innerText;
    //     // console.log(currentpage);
    //     pagechange(currentpage)
    // }

    function pagechange(data) {
        console.log(data);
        // console.log(data.selected)
        currentpage = data;
        console.log(limit);
        axios.get(`http://localhost:3001/list-question-bypage?page=${currentpage.selected}&limit=${limit}`).then((res) => {
            console.log(res.data)
            setquestions(res.data.data)
        })
    }

return (
    <div class="row" style={{ borderLeft: '2px solid lightgrey', minHeight: '80vh' }}>
        <div>
            <h1 style={{ padding: '0px 1%', margin: '.4rem 0 .4rem 0', fontFamily: 'sans-serif' }}>
                Total {questionlength} Questions Asked
            </h1>
            <div class="btn-group" style={{ margin: '0px .3rem 0px .8rem', borderBottom: '.1rem solid lightgrey' }}>
                <span class="btn btn-primary active" type='button' aria-current="page"> Oldest </span><vr />
                <span class="btn btn-primary" type='button'> Not Answered </span>
            </div><hr style={{ marginBottom: '0' }} />
        </div>
        <div style={{ background: '#fdf7e2' }}>
            {questions && questions.map((q) => {
            return (
            <div key={q._id}>
                <div style={{ borderBottom: '.1rem solid lightgrey' }}>
                    <h4 data-aos="fade-left" data-aos-offset='max-height' data-aos-once='true' data-aos-duration="400" className='mainqdiv'>
                        <NavLink style={{ textDecorationLine: "none" }} to={`/question/${q._id}`}>{q.question}</NavLink>
                    </h4>
                    <div class="qla bg-secondary"> Likes: {q.qlikes.length}  </div>
                    <div class="qla bg-secondary">
                        <NavLink style={{ color: 'black', textDecoration: 'none' }} to={`/question/${q._id}`}> Answer: {q.answers.length} </NavLink>
                    </div><br />
                    {q.tags.map((o) => {
                        return <NavLink style={{ color: 'white', fontFamily: 'monospace', padding: '.2rem' }} className="rounded-2 bg-dark" to={`/questionsby/${o}`}>
                            {o}
                        </NavLink>
                    })}
                    <div style={{ width: '37%', display: 'inline-block', margin: '6px', fontFamily: 'Times' }}>asked at {q.date}</div>
                    <div class="maindnamediv" style={{ fontSize: '.9rem', fontFamily: 'cursive' }}>asked by
                        <NavLink style={{ color: 'navy', fontFamily: 'cursive' }} to={`/user/${q.userdname}`}>
                            {alluser.map((r) => { if (r._id == q.userdname) return ' ' + r.dname })}
                        </NavLink>
                    </div>
                </div>
            </div>)
            })}
        </div>
        <div className="container">
            <div className="row m-2">
            {questions && <div><div className="pt-3 pb-1">
                <Reactpaginate previousLabel={"<<"} nextLabel={">>"} breakLabel={"..."} marginPagesDisplayed={5} 
                    pageCount={questionlength/limit} pageRangeDisplayed={2} onPageChange={pagechange}
                    containerClassName={"pagination justify-content-center"} pageClassName={"page-item"}
                    pageLinkClassName={"page-link"} previousClassName={"page-item"} previousLinkClassName={"page-link"}
                    nextClassName={"page-item"} nextLinkClassName={"page-link"} breakClassName={"page-item"} 
                    breakLinkClassName={"page-link"} activeClassName={"active"}
                />
            </div>
            {/* <br/> */}
            {/* <div class="btn-group" style={{margin:'0px .3rem 0px .8rem'}}>
                <span class="btn btn-primary" type='button' onClick={changelimit} aria-current="page">4</span><vr/>
                <span class="btn btn-primary" type='button' onClick={changelimit} >10</span>
                <span class="btn btn-primary" type='button' onClick={changelimit} >15</span>
            </div> */}
            </div>}
            </div>
        </div>
        {!questions && <Spinner />}
    </div >
)
}
AOS.init();