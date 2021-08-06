import React from 'react'
import './css/questions.css'

export default function Allquestions() {
    return (
        <div>
            <div class="headq">
            <h1 className="allq">All Questions</h1><br />
            <input type="text" placeholder="Enter question or tags" name="searchq" id="searchq" required className="searchq" />
            <button class="searchb"><i className="glyphicon glyphicon-search"> </i> Search</button>
            </div>
            <div class="container questions">
                {/* Some bootstrap classes not working */}
                <p>Why we use html for web app development?</p>
                <a href="https://www.stackoverflow.com/questions/tagged/json" class="post-tag flex--item" title="show questions tagged 'json'" rel="tag">json</a>
                <br/>
                <br/>
                <answer>HTML for Web Development like: Building the Bones of Your Website.</answer>
                <br/>
                <br/>
                <div>
<div class="flex--item ml-auto fl-shrink0 started mt0 d-block ">
    <div class="user-info ">
        <div class="user-gravatar32 ">
            <span onClick={console.log("not ready")}>
                <div class="gravatar-wrapper-32">
                    <img src="https://graph.facebook.com/2045105442409749/picture?type=large" alt="" width="32" height="32" class="bar-sm"/>
                </div>
            </span>
        </div>
        <div class="user-details">
            <a href="/users/9456490/venkatesh-deo">Venkatesh Deo</a>
        </div>
    </div>
</div>
            </div>
                <br/>
                {/* <div class="container"> */}
                <input class=" p-0 m0" type="text" name="answer" id="answer" placeholder="Give your answer" ></input>
                {/* </div> */}
            </div>
        </div>
    )
}

