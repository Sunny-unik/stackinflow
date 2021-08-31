import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Populartags() {

    const [tag, settag] = useState('')

    useEffect(() => {
        axios.get("http://localhost:3001/list-tag").then((res) => {
            console.log(res.data.data.tag)
            settag(res.data.data.tag)
        })
    }, [])

    return (
        <div>
            <h1> Popular Tags </h1>
            <input type="text" placeholder="Search Tag " name="searchq" id="searchq" required className="searchq" />
            <button class="searchb"><i className="glyphicon glyphicon-search"> </i> Search</button><br/>
            <br />
            {!tag && <div className="mt-md-2 mt-lg-2 loading text-center">
                {/* <div class="spinnerdiv"> */}
                <i class="spinner"></i>
                <p>loading..</p>
                {/* </div> */}
                <div>your network seems down or slow</div>
            </div>}
            <div>{tag}</div>&nbsp;
        </div>
    )
}
