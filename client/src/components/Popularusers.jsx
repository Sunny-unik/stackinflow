import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FcSearch } from 'react-icons/fc';
import Spinner from './spinner';
import { NavLink } from 'react-router-dom';

export default function Popularusers(props) {
  const [users, setusers] = useState('');
  const [searchuser, setsearchuser] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/list-user`).then(res => {
      setusers(
        res.data.data
          .sort((a, b) => {
            return a.userlikes - b.userlikes;
          })
          .reverse()
      );
    });
  }, []);

  function gotouser() {
    if (searchuser === null) alert('Enter some tags first in input box');
    else if (searchuser.includes(' ') === true) alert('Remove blank space from input box');
    else props.history.push('/user/' + searchuser);
  }

  return (
    <div>
      <div
        className='container'
        style={{ borderBottom: '.1rem solid lightgrey', paddingBottom: '.6rem' }}
      >
        <h1 style={{ fontFamily: 'sans-serif', marginTop: '.4rem' }}> Popular Users </h1>
        <h4 style={{ fontFamily: 'Times', width: '95%' }}>
          These all users are arranged in sequence as higher points to lowest.
        </h4>
        <input
          type='text'
          list='usearch'
          placeholder=' Search User'
          name='searchp'
          id='searchp'
          required
          className='searchtp'
          style={{ paddingLeft: '1%', fontFamily: 'monospace', fontWeight: 'bold' }}
          onChange={e => {
            setsearchuser(e.target.value);
          }}
          value={searchuser}
        />
        <datalist id='usearch'>
          {users &&
            users.map(u => {
              return <option value={u._id}>{u.dname}</option>;
            })}
        </datalist>
        <button class='searchb' style={{ fontFamily: 'Fantasy' }} onClick={gotouser}>
          <FcSearch /> Search
        </button>
      </div>
      <div style={{ minHeight: '60vh' }}>
        {!users && <Spinner />}
        {users &&
          users.map(p => {
            return (
              <div
                className='mr-5'
                data-aos='flip-up'
                data-aos-once='true'
                data-aos-duration='500'
                key={p._id}
                style={{ padding: '1rem', display: 'inline-block', width: '23%' }}
              >
                <div className='bg-dark rounded-2 text-center' style={{ width: 'fit-content' }}>
                  <div className='border border-1 border-secondary rounded-top m-0 p-0 card-header'>
                    <div className='profilepic mx-2 col-sm-3 my-1 p-0  d-inline-block'>
                      <img
                        className='col-sm-12 '
                        height='50rem'
                        width='60rem'
                        src={
                          p.profile
                            ? `${process.env.REACT_APP_API_URL}/${p.profile}`
                            : 'assets/img/download.jpg'
                        }
                        alt='user profile'
                      />
                    </div>
                    <div className='col-sm-7 d-inline-block text-center'>
                      <NavLink
                        style={{ fontFamily: 'cursive', display: 'inline-block' }}
                        to={`/user/${p._id}`}
                      >
                        {p.dname}
                      </NavLink>
                      <br />
                    </div>
                  </div>
                  <div className='border text-center bg-light border-1 border-secondary rounded-bottom m-0 p-0 card-body'>
                    Points: {p.userlikes == null ? 0 : p.userlikes}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
AOS.init();
