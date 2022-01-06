import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
        <React.Fragment>
            <footer style={{fontFamily:'Poppins, sans-serif',position:'relative',width:'100%',background:'black',minHeight:'100px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <ul className='socialicon' >
                    <li><FaFacebook className='ficon'/></li>
                    <li><FaInstagram className='ficon'/></li>
                    <li><FaTwitter className='ficon'/></li>
                    <li><FaLinkedin className='ficon'/></li>
                    <li><FaGithub className='ficon'/></li>
                </ul>
                <ul className='fnav'>
                    <NavLink  to={'/'}><h6>Home</h6></NavLink>
                    <NavLink to={'/about'}><h6>About</h6></NavLink>
                    <NavLink to={'/feedback'}><h6>Feedback</h6></NavLink>
                </ul>
                <p className="fline">Copyright © 2021 Stackinflow Pvt. Ltd. All rights reserved.</p>
                <p className="fline">Made by Sunny Creations @ 2021</p>
            </footer>
        </React.Fragment>
    )
}
