import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FcSearch } from 'react-icons/fc'
import Spinner from './spinner'
import ReactPaginate from 'react-paginate'

export default function Populartags(props) {

    const [questionlength, setquestionlength] = useState()
    const [question, setquestion] = useState([])
    var limit = 5;
    var currentpage = {selected:0};

    useEffect(() => {
        axios.get("http://localhost:3001/list-question-length").then((res) => {
            setquestionlength(res.data.data)
        })
        axios.get(`http://localhost:3001/list-question-bypage?page=${currentpage.selected}&limit=${limit}`).then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])
    console.log(question)
    console.log(questionlength)

    var alltags = question.map((d)=>{
        return d.tags
    })
    console.log(alltags)
    
    var uniquetags;
    uniquetags = new Set([].concat(...alltags))
    console.log(uniquetags);
    
    var printedtags = new Array;

    function questionsbytag(n){
        props.history.push('questionsby/'+n)
    }
    
    function pagechange(data) {
        console.log(data);
        currentpage = data;
        console.log(limit);
        axios.get(`http://localhost:3001/list-question-bypage?page=${currentpage.selected}&limit=${limit}`).then((res) => {
            console.log(res.data)
            setquestion(res.data.data)
        })
    }
    
    return <div style={{borderLeft:'2px solid lightgrey'}}>
        <div className="container" style={{ borderBottom: '2px solid lightgrey',paddingBottom:'.6rem' }}>
            <h1 style={{fontFamily:'sans-serif',marginTop:'.4rem'}}> Popular Tags </h1>
            <h4 style={{fontFamily:'Times',width:'95%'}}>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</h4>
            <input type="text" placeholder=" Search Tag" style={{ paddingLeft: '1%', fontFamily: 'monospace', fontWeight: 'bold' }} name="searcht" id="searcht" required className="searchtp" />
            <button class="searchb" style={{ fontFamily: 'Fantasy' }}><FcSearch /> Search</button>
        </div>
        <div style={{minHeight:'40vh'}}>
        {!question && <Spinner />}
        {question && uniquetags.forEach((y)=>{
            printedtags.push(y)
        })}
        {question && printedtags.map((t)=>{
            return <div data-aos="zoom-in" data-aos-offset='max-height' data-aos-once='true' data-aos-duration="200" style={{cursor:"pointer"}}
            className="col-md-2 d-inline-block text-center m-2 p-2 border border-3 border-secondary rounded-3 card-footer"
            onClick={()=>{questionsbytag(t)}}>{t}</div>
        })}
        {question && <div className="pt-3 pb-1">
            <ReactPaginate previousLabel={"<<"} nextLabel={">>"} breakLabel={"..."} marginPagesDisplayed={5} 
                pageCount={Math.floor(Math.ceil(questionlength/limit))} pageRangeDisplayed={2} onPageChange={pagechange}
                containerClassName={"pagination justify-content-center"} pageClassName={"page-item"}
                pageLinkClassName={"page-link"} previousClassName={"page-item"} previousLinkClassName={"page-link"}
                nextClassName={"page-item"} nextLinkClassName={"page-link"} breakClassName={"page-item"} 
                breakLinkClassName={"page-link"} activeClassName={"active"}
            />
        </div>}
        </div>
        </div>
}
AOS.init();