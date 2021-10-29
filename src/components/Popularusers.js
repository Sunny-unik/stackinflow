import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FcSearch } from 'react-icons/fc';
import Spinner from './spinner';
import { NavLink } from 'react-router-dom';

export default function Popularusers() {

    const [users, setusers] = useState('')

    useEffect(() => {
        axios.get("http://localhost:3001/list-user").then((res) => {
            console.log(res.data.data)
            setusers(res.data.data)
        })
    }, [])
    
    if (users != '') {
        var userlist = users.map((u) => {
            return <React.Fragment>
                <div data-aos="flip-up" data-aos-once='true' data-aos-duration="500" key={u._id} className="col-md-3 ">
                    <NavLink style={{color:'indigo',fontFamily:'cursive'}} to={`./user/${u.dname}`}>{u.dname}</NavLink>
                    <div>{u.liked}5464</div>
                    <hr className="bg-primary" />
                </div>
            </React.Fragment>
        })
    }

    return (<React.Fragment>
        <div>
            <h1 style={{fontFamily:'Fantasy'}}> Popular Users </h1>
            <input type="text" placeholder=" Search User " style={{paddingLeft:'1%',fontFamily:'monospace',fontWeight:'bold'}} name="searchq" id="searchq" required className="searchq" />
            <button class="searchb" type='button' style={{fontFamily:'Fantasy'}} ><FcSearch/> Search </button><br />
        </div><br/>
        <div>
            {userlist}
            {userlist}
            {userlist}
            {userlist}
            {userlist}
            {!userlist && <Spinner/>}
        </div>
    </React.Fragment>)
}
AOS.init();