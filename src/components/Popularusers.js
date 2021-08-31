import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Popularusers() {

    // const [popuser, setpopuser] = useState('')
    // const [liked, setliked] = useState('')
    const [users, setusers] = useState('')

    useEffect(() => {
        axios.get("http://localhost:3001/list-user").then((res) => {
            console.log(res.data.data)
            // setpopuser(res.data.data.dname)
            // setliked(res.data.data.liked)
            setusers(res.data.data)
        })
    }, [])
    // console.log(popuser)
    // console.log(liked)
    if (users != '') {
        var userlist = users.map((u) => {
            return <div key={u._id}>
                <div>{u.dname}</div>
                <div>{u.liked}</div>
            </div>
        })
    }

    return (<React.Fragment>
        <div>
            <h1> Popular Users </h1>
            <input type="text" placeholder="Search User " name="searchq" id="searchq" required className="searchq" />
            <button class="searchb"><i className="glyphicon glyphicon-search"> </i> Search</button><br/>
        </div>
        <div>
            {/* <div>{popuser}<br/>{liked}</div> */}
            {userlist}
            {!userlist && <div className="mt-md-2 mt-lg-2 loading text-center">
                <i class="spinner"></i>
                <p>loading..</p>
                {/* {setTimeout(() => {
                    alert("your network seems down or slow")
                }, 5000)} */}
                <div>your network seems down or slow</div>
            </div>}
        </div>
    </React.Fragment>)
}
