import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { FcCollaboration } from 'react-icons/fc';
import Spinner from './spinner';

export default function User(props) {

    const [userbyudn, setuserbyudn] = useState([])
    const [profilebyudn, setprofilebyudn] = useState('')
    const [namebyudn, setnamebyudn] = useState('')
    const [dnamebyudn, setdnamebyudn] = useState('')
    const [titlebyudn, settilebyudn] = useState('')
    const [aboutbyudn, setaboutbyudn] = useState('')
    const [sociallinkbyudn, setsociallinkbyudn] = useState('')
    const [weblinkbyudn, setweblinkbyudn] = useState('')
    const [gitlinkbyudn, setgitlinkbyudn] = useState('')
    const [question, setquestion] = useState([])
    const [users, setusers] = useState([])

    var uid = props.match.params._id;

    useEffect(() => {
        axios.get("http://localhost:3001/user-by-userdname/?_id=" + uid).then((res) => {
            console.log(res.data.data)
            setuserbyudn(res.data.data)
            setnamebyudn(res.data.data[0].name)
            setdnamebyudn(res.data.data[0].dname)
            setaboutbyudn(res.data.data[0].about)
            settilebyudn(res.data.data[0].title)
            setprofilebyudn(res.data.data[0].profile)
            setgitlinkbyudn(res.data.data[0].gitlink)
            setsociallinkbyudn(res.data.data[0].twitter)
            setweblinkbyudn(res.data.data[0].weblink)
        })
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
        axios.get("http://localhost:3001/list-user").then((res)=>{
            console.log(res.data.data)
            setusers(res.data.data)
        })
    }, [])

var answer = new Array
question.forEach((un)=>{if(un.answers.length>0){un.answers.forEach((i)=>{if(i.userdname==uid)answer.push(i)})}})
    
var questions = new Array
question.forEach((un)=>{ if(un.userdname==uid) questions.push(un)})

    return (<React.Fragment>
        {/* {userbyudn==[] ?  */}
        <div className="container">
            <div className="col-md-3 col-lg-3 col-sm-3 proimgdiv"><br />
                <div className="profilepic" data-aos="flip-up" data-aos-once='true' data-aos-duration="600" >
                    <img className="col-sm-12" height="225px" width="75px" src={profilebyudn ? `http://localhost:3001/${profilebyudn}` : "assets/img/crea15.jpg"} alt="user profile" />
                </div>
            </div>
            <div data-aos="fade-left" data-aos-duration="600" className="col-md-9 col-lg-8 col-sm-9 procontent"><br />
                <label>User's Name</label><div><h2 className="my-0">{namebyudn}</h2></div>
                <label>Display Name</label><div><h3 >{dnamebyudn}</h3></div>
                {titlebyudn && <div><label>Work Title</label><h3>{titlebyudn}</h3></div>}
                <h4>{weblinkbyudn && <a target="_blank" href={weblinkbyudn}><abbr title={weblinkbyudn}><FcCollaboration/></abbr></a>}&nbsp;&middot;&nbsp;
                {gitlinkbyudn && <a target="_blank" href={gitlinkbyudn}><abbr title={gitlinkbyudn}><FaGithub/></abbr></a>}&nbsp;&middot;&nbsp;
                {sociallinkbyudn && <a target="_blank" href={sociallinkbyudn}><abbr title={sociallinkbyudn}><FaTwitter/></abbr></a>}&nbsp;</h4>
            </div>
            <div className="col-sm-9">
                <p style={{ fontSize: 'large', fontFamily: 'sans-serif' }}>Total Likes : likesbyudn </p ><br />
                <p style={{ fontSize: 'large', fontFamily: 'sans-serif' }}>Total Answers : {answer.length} </p ><br />
                <p style={{ fontSize: 'large', fontFamily: 'sans-serif' }}>Total Questions : {questions.length} </p ><br />
            </div>
            <div className="col-sm-12">
            {aboutbyudn && <div><label><h1>About </h1></label>
            <h3>{aboutbyudn}</h3> </div>}
            </div>
        </div>
         {/* : <Spinner/> } */}
    </React.Fragment>
    )
}
