import React from 'react'

export default function Askaquestion() {
    return (
        <div>
            <div class="ask mb-1"><b>
            <h1>Ask any Question</h1></b>
            <form>
            <label for="aquestion"><b>Enter your Question</b></label>
            <input type="text" placeholder="Enter your question" name="aquestion" id="aquestion" required />
            <label for="atags"><b>Enter tags related to questions</b></label>
            <input type="text" placeholder="Enter tags" name="atags" id="atags" required />
            <button type="submit" class="submitquestion">Submit Question</button>
            </form>
            </div>
        </div>
    )
}
