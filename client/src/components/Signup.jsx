import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FaHome,
  FaQuestionCircle,
  FaRegistered,
  FaSignInAlt,
  FaTags,
  FaUsers,
  FaWindowClose,
} from 'react-icons/fa';
import { FcMenu } from 'react-icons/fc';
import { useEffect } from 'react';

export default function Signup(props) {
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [dname, setdname] = useState('');
  const [password, setpassword] = useState('');
  const [otp, setotp] = useState('');
  const [randomotp, setrandomotp] = useState('');
  const [title, settitle] = useState('');
  const [about, setabout] = useState('');
  const [weblink, setweblink] = useState('');
  const [gitlink, setgitlink] = useState('');
  const [twitter, settwitter] = useState('');
  const [address, setaddress] = useState('');

  useEffect(() => closeSlideMenu(), []);

  function setvalue(e) {
    e.target.name === 'cemail' && setemail(e.target.value);
    e.target.name === 'cname' && setname(e.target.value);
    e.target.name === 'cdname' && setdname(e.target.value);
    e.target.name === 'cpassword' && setpassword(e.target.value);
    e.target.name === 'otp' && setotp(e.target.value);
  }

  function unikemail() {
    const em = { email };
    axios.post(`${process.env.REACT_APP_API_URL}/valid-email`, em).then(res => {
      res.data.status === 'ok' ? unikdname() : alert(res.data.data);
    });
  }

  function unikdname() {
    const dn = { dname };
    axios.post(`${process.env.REACT_APP_API_URL}/valid-dname`, dn).then(res => {
      res.data.status === 'ok' ? hidereg() : alert(res.data.data);
    });
  }

  function hidereg() {
    let isValid = true;
    const emailregex =
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailregex.test(email)) {
      alert('Email is not valid');
      isValid = false;
    }
    if (name === '' || name == null || name === ' ') {
      isValid = false;
      alert('please enter your name');
    }
    if (dname === '' || dname == null || dname === ' ') {
      isValid = false;
      alert('please enter username');
    }
    const passregex =
      // eslint-disable-next-line no-useless-escape
      /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    if (!passregex.test(password)) {
      alert(
        'Password should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long'
      );
      isValid = false;
    }
    if (isValid === true) {
      const random = Math.floor(Math.random() * 1000000 + 1);
      setrandomotp(random);
      axios
        .post(`${process.env.REACT_APP_API_URL}/send-user-otp`, { email, otp: random })
        .then(res => {
          if (res.data.status === 'ok') {
            alert('otp sent to your email');
            document.getElementById('createdetail').style.display = 'none';
            document.getElementById('createotp').style.display = 'block';
          } else alert('some server error occured');
        });
    }
  }

  function create() {
    const userlikes = 0;
    const profile = null;
    const s = {
      email,
      name,
      dname,
      password,
      title,
      about,
      weblink,
      gitlink,
      twitter,
      address,
      userlikes,
      profile,
    };
    axios.post(`${process.env.REACT_APP_API_URL}/create-user`, s).then(res => {
      if (res.data.status === 'ok') {
        alert('Registration Successfull');
        props.history.push('/Login');
      } else {
        alert('! some server error occured try again ');
        props.history.push('/Signup');
      }
    });
  }

  function otpcheck() {
    if (otp === randomotp) {
      create();
    } else {
      alert('! incorrect otp ');
      props.history.push('/Signup');
    }
  }

  function goreg() {
    document.getElementById('createotp').style.display = 'none';
    document.getElementById('createdetail').style.display = 'block';
  }

  function openSlideMenu() {
    document.getElementById('sidemenuopen').style.display = 'none';
    document.getElementById('sidemenuclose').style.display = 'block';
    document.getElementById('hiddennav').style.display = 'block';
  }
  function closeSlideMenu() {
    document.getElementById('sidemenuclose').style.display = 'none';
    document.getElementById('sidemenuopen').style.display = 'block';
    document.getElementById('hiddennav').style.display = 'none';
  }

  return (
    <React.Fragment>
      <button
        type='button'
        id='sidemenuopen'
        className='m-1 fixed-top btn-info rounded'
        onClick={openSlideMenu}
      >
        <FcMenu />
      </button>
      <button
        type='button'
        id='sidemenuclose'
        className='m-1 fixed-top btn-dark rounded'
        onClick={closeSlideMenu}
      >
        <FaWindowClose />
      </button>
      <div id='hiddennav' className='py-2 px-2'>
        <NavLink activeClassName='active1' exact to='/' onClick={closeSlideMenu}>
          <FaHome /> Home{' '}
        </NavLink>
        <br />
        <br />
        <NavLink activeClassName='active1' to='/questions' onClick={closeSlideMenu}>
          <FaQuestionCircle /> Questions{' '}
        </NavLink>
        <br />
        <br />
        <NavLink activeClassName='active1' to='/populartags' onClick={closeSlideMenu}>
          <FaTags /> Popular Tags{' '}
        </NavLink>
        <br />
        <br />
        <NavLink activeClassName='active1' to='/popularusers' onClick={closeSlideMenu}>
          <FaUsers /> Popular Users{' '}
        </NavLink>
        <br />
        <br />
        <NavLink activeClassName='active1' to='/Login' onClick={closeSlideMenu}>
          <FaSignInAlt />
          LogIn
        </NavLink>
        <br />
        <br />
        <NavLink activeClassName='active1' to='/Signup' onClick={closeSlideMenu}>
          <FaRegistered />
          SignUp
        </NavLink>
        <br />
        <br />
      </div>
      <div className='text-center'>
        <div className='container signupcon'>
          <div
            data-aos='flip-right'
            data-aos-once='true'
            data-aos-duration='500'
            className='col-md-8 col-lg-4 '
            id='createdetail'
          >
            <form
              style={{
                padding: '3%',
                margin: '4px 0',
                borderRadius: '2%',
                boxShadow: '3px 4px 3px 3px #888888',
              }}
            >
              <h1>Create an account</h1>
              <p>Please fill this form and get verified for register.</p>
              <hr className='signuphr' />
              <label for='createemail'>
                <b>Your Email</b>
              </label>
              <input
                type='email'
                style={{ fontFamily: 'sans-serif' }}
                value={email}
                onChange={e => {
                  setvalue(e);
                }}
                minlength='5'
                placeholder='example@eg.co'
                name='cemail'
                id='createemail'
                required
              />
              <label for='createname'>
                <b>Your Name</b>
              </label>
              <input
                type='text'
                style={{ fontFamily: 'sans-serif' }}
                value={name}
                onChange={e => {
                  setvalue(e);
                }}
                placeholder='firstname lastname'
                name='cname'
                id='createname'
                required
              />
              <label for='createdname'>
                <b>Display Name</b>
              </label>
              <input
                type='text'
                style={{ fontFamily: 'sans-serif' }}
                value={dname}
                onChange={e => {
                  setvalue(e);
                }}
                placeholder='display_name'
                name='cdname'
                id='createdname'
                required
              />
              <label for='createpassword'>
                <b>Password</b>
              </label>
              <input
                type='password'
                style={{ fontFamily: 'sans-serif' }}
                value={password}
                onChange={e => {
                  setvalue(e);
                }}
                minlength='8'
                maxLength='16'
                placeholder='password should be strong'
                name='cpassword'
                id='createpassword'
                required
              />
              <hr className='signuphr' />
              <button type='button' class='registerbtn' onClick={unikemail}>
                {' '}
                Sign Up{' '}
              </button>
            </form>
          </div>
          <div
            data-aos='flip-right'
            data-aos-once='true'
            data-aos-duration='1000'
            class='col-md-5 col-lg-4'
            id='createotp'
          >
            <form
              className='d-inline-block'
              style={{
                padding: '3%',
                margin: '4px 0',
                borderRadius: '2%',
                boxShadow: '3px 4px 3px 2px #888888',
              }}
            >
              <h1 style={{ display: 'inline-block', width: '82%' }}>Confirm Email</h1>
              <button
                type='button'
                onClick={goreg}
                className='border btn btn-warning float-end'
                style={{
                  fontWeight: '600',
                  fontFamily: 'sans-serif',
                  padding: '2% 1%',
                  margin: '0',
                  borderRadius: '10%',
                  boxShadow: '2px 3px 2px 3px #888888',
                }}
              >
                {' '}
                Go Back{' '}
              </button>
              <p>Please fill 6alphanumeric code for create your account.</p>
              <hr className='signuphr' />
              <label for='otp' className='inputotp'>
                <b>Otp sent on gievn email-address</b>
              </label>
              <input
                style={{ fontFamily: 'sans-serif' }}
                type='text'
                value={otp}
                onChange={e => {
                  setvalue(e);
                }}
                placeholder='Enter Verfication Code'
                name='otp'
                id='otp'
                required
              />
              <hr className='signuphr' />
              <button type='button' class='registerbtn' onClick={otpcheck}>
                {' '}
                Submit{' '}
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
AOS.init();