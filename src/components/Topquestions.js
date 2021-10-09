import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import './css/questions.css'
import './css/spinner.css'

export default function Topquestions() {

    const [question, setquestion] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])

    console.log(question)

    function addone(){
        alert('question liked')
        var like = document.getElementById('like');
        like.style.display = "none";
        var liked = document.getElementById('liked');
        liked.style.display = "block";
    }

    function minusone(){
        alert('undo like')
        var like = document.getElementById('liked');
        like.style.display = "none";
        var liked = document.getElementById('like');
        liked.style.display = "block";
    }

    return (
        <div className='container d-flex row'>
            <div class="headq">
                <h1 className="tqhead "> Top Questions </h1><br />
                <input type="text" placeholder="Find Question " name="searchq" id="searchq" required className="searchq" />
                <button class="searchb"><i className="glyphicon glyphicon-search"> </i> Search </button><br/>
                <div>
                    <button className=' bg-info' type='button'> Newest </button>
                    <button className=' bg-info' type='button'> Most Liked </button>
                    <button className=' bg-info' type='button'> Most Answered </button>
                </div><br/>
            </div>
            <div class="tqbody ">
            {question && question.map((q) => {
            return  <div key={q._id} >
                <div className="col-sm-12 bg-danger">
                    <h4>{q.question}</h4>
                <div className="container d-flex align-items-space-between">
                    <div className="col-md-6 ">
                    <button className="bg-primary tag" type="button" >{q.tag}</button>
                    </div>
                    <div className=" col-md-5">
                        <span className="text-info">{q.date}</span>&nbsp; &nbsp;
                        <span className="text-info">{q.username}</span>&nbsp; &nbsp;
                <button type="button" className=" bg-primary" id="like" onClick={addone}> <FaHeart color="white"/> </button>
                <button type="button" className=" bg-success" id="liked" onClick={minusone}> <FaHeart color="red"/> </button>
                    </div>
                </div>
                <hr />
                </div>
            </div>
        })}
            {!question && <div className="mt-md-2 mt-lg-2 loading text-center">
                {/* <div class="spinnerdiv"> */}
                <i class="spinner"></i>
                <p>loading..</p>
                {/* </div> */}
                <div>your network seems down or slow</div>
            </div>}
            </div>
        </div>
    )
}

