import React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Footer() {
    return (
        <React.Fragment>
            <footer style={{fontFamily:'Poppins, sans-serif',position:'relative',width:'100%',background:'black',minHeight:'100px',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                {/* <div className='waves'>
                    <div id="wave1" className='wave'></div>
                    <div id="wave2" className='wave'></div>
                    <div id="wave3" className='wave'></div>
                    <div id="wave4" className='wave'></div>
                </div> */}
                <ul className='socialicon' >
                    <li><FaFacebook className='ficon'/></li>
                    <li><FaInstagram className='ficon'/></li>
                    <li><FaTwitter className='ficon'/></li>
                    <li><FaLinkedin className='ficon'/></li>
                    <li><FaGithub className='ficon'/></li>
                </ul>
                <ul className='fnav'>
                    <li><h6>Home</h6></li>
                    <li><h6>About</h6></li>
                    <li><h6>Services</h6></li>
                    <li><h6>Contact</h6></li>
                </ul>
                <p className="fline">Copyright © 2021 Stackinflow Pvt. Ltd. All rights reserved.</p><p className="fline">Made by Sunny Creations © 2021</p>
            </footer>
        </React.Fragment>
    )
}
