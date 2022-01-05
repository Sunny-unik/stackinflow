import axios from 'axios';
import div, { useEffect, useState } from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { FcCollaboration } from 'react-icons/fc';
import { IoLocationSharp } from 'react-icons/io5';
import { NavLink, Route, Switch } from 'react-router-dom';
import Askedquestionbyuser from './Askedquestionbyuser';
import Givenaswerbyuser from './Givenaswerbyuser';
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
    const [addressbyudn, setaddressbyudn] = useState('')
    const [question, setquestion] = useState([])
    const [userlikes, setuserlikes] = useState()

    var uid = props.match.params._id;

    useEffect(() => {
        axios.get("http://localhost:3001/user-by-userdname/?_id=" + uid).then((res) => {
            console.log(res.data.data)
            setuserbyudn(res.data.data[0])
            setuserlikes(res.data.data[0].userlikes)
            setnamebyudn(res.data.data[0].name)
            setdnamebyudn(res.data.data[0].dname)
            setaboutbyudn(res.data.data[0].about)
            settilebyudn(res.data.data[0].title)
            setprofilebyudn(res.data.data[0].profile)
            setgitlinkbyudn(res.data.data[0].gitlink)
            setsociallinkbyudn(res.data.data[0].twitter)
            setweblinkbyudn(res.data.data[0].weblink)
            setaddressbyudn(res.data.data[0].address)
        })
        axios.get("http://localhost:3001/list-question").then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])
    console.log(userbyudn);

var answer = new Array
question.forEach((un)=>{if(un.answers.length>0){un.answers.forEach((i)=>{if(i.userdname==uid)answer.push(i)})}})
    
var questions = new Array
question.forEach((un)=>{ if(un.userdname==uid) questions.push(un)})

    return (<div style={{minHeight:"70vh"}}>
        {
            console.log(userbyudn.length)

        }
        {userbyudn.length!=0 ? <div>
        <div className="container">
        <div className='d-md-flex'>
         <div className="col-md-5 col-sm-10 col-lg-4 mx-auto proimgdiv"><br />
             <div className="profilepic col-sm-8" data-aos="flip-up" data-aos-once='true' data-aos-duration="600" >
                 <img className="col-sm-12" height="225rem" width="75rem" src={profilebyudn ? `http://localhost:3001/${profilebyudn}`
                  : "../assets/img/download.jpg"} alt="user profile" />
             </div>
         </div>
         <div data-aos="fade-left" data-aos-duration="600" className="px-md-4 col-md-8 col-lg-7 col-sm-10 procontent"><br />
             <div className='text-center'>
                <label style={{fontFamily:"SeogUI"}} >User's Name</label>
                <div><h2 className="my-0" style={{fontFamily:"Sans-Serif",fontWeight:"bold"}}>{namebyudn}</h2></div>
                <label style={{fontFamily:"SeogUI"}}>Display Name</label>
                <div><h3 style={{fontFamily:"Sans-Serif",fontWeight:"bold"}}>{dnamebyudn}</h3></div>
                {titlebyudn && <div><label style={{fontFamily:"SeogUI"}}>Work Title</label>
                <h3>{titlebyudn}</h3></div>}
                    {addressbyudn && <div><label style={{fontFamily:"SeogUI"}}>Address</label>
                    <h4 style={{fontFamily:"Sans-Serif"}}><IoLocationSharp/>&nbsp;{addressbyudn}</h4> </div>}
                <h4>{weblinkbyudn && <a target="_blank" href={weblinkbyudn}><abbr title={weblinkbyudn}><FcCollaboration /></abbr></a>}&nbsp;&middot;&nbsp;
                    {gitlinkbyudn && <a target="_blank" href={gitlinkbyudn}><abbr title={gitlinkbyudn}><FaGithub /></abbr></a>}&nbsp;&middot;&nbsp;
                {sociallinkbyudn && <a target="_blank" href={sociallinkbyudn}><abbr title={sociallinkbyudn}><FaTwitter /></abbr></a>}&nbsp;</h4>
                    <h4 style={{ fontFamily: 'SeogUI', fontWeight:"bold" }}>Total Points : {userlikes!=null ? userlikes : 0} </h4><br />
             </div>
         </div>
        </div>
         <div className="col-sm-10">
             {aboutbyudn && <div><label><h1>About </h1></label>
             <h3>{aboutbyudn}</h3> </div>}
         </div>
     </div><br />
<div class="row w-75">
        <div data-aos="zoom-out" data-aos-once='true' data-aos-duration="600" class="d-flex flex-sm-column flex-md-row text-center">
            <p className='mx-1 my-auto px-1'><NavLink class="btn mb-2 btn-info rounded" activeClassName="active" exact to={`/selfquestion/${uid}`}
             style={{ fontSize: 'large',boxShadow:"0.1em 0.1em 0.2em 0.2em grey" }}>
                {dnamebyudn}'s questions
            </NavLink></p>
            <p className='mx-1 my-auto px-1'><NavLink class="btn mb-2 btn-info rounded" activeClassName="active" exact to={`/selfanswer/${uid}`}
             style={{ fontSize: 'large',boxShadow:"0.1em 0.1em 0.2em 0.2em grey" }}>
                {dnamebyudn}'s answers
            </NavLink></p>
        </div>
</div>
     </div>  : <h1 className='text-danger text-center mt-5'>!User not found</h1> }
    </div>
    )
}
