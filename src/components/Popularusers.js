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
    
    return (<div style={{borderLeft:'2px solid lightgrey'}}>
        <div className="container" style={{borderBottom:'.1rem solid lightgrey',paddingBottom:'.6rem'}}>
            <h1 style={{fontFamily:'sans-serif',marginTop:'.4rem'}}> Popular Users </h1>
            <h4 style={{fontFamily:'Times',width:'95%'}}>These users are arranged in sequence as higher points to lowest.</h4>
            <input type="text" placeholder=" Search User" style={{paddingLeft:'1%',fontFamily:'monospace',fontWeight:'bold'}} name="searchp" id="searchp" required className="searchtp"/>
            <button class="searchb" style={{fontFamily:'Fantasy'}}><FcSearch/> Search</button>
        </div>
        <div style={{minHeight:'80vh'}}>
        {!users && <Spinner />}
        {users && users.map((p) => {
            return <div className="mr-5 text-center " style={{padding:'1rem',display:'inline-block',width:'23%'}}>
                <div className="border border-1 border-secondary rounded-top m-0 p-0 card-header"> {p.dname} </div>
                <div className="border border-1 border-secondary rounded-bottom m-0 p-0 card-body"> Points: {p.userlikes} </div>
            </div>
        })}
        </div>
    </div>
    )
}
AOS.init();