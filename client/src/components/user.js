import axios from 'axios';
import { useEffect, useState } from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { FcCollaboration } from 'react-icons/fc';
import { IoLocationSharp } from 'react-icons/io5';
import Questionbox from './questionbox';
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
    const [notfound, setnotfound] = useState(null)

    var uid = props.match.params._id;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user-by-userdname/?_id=` + uid).then((res) => {
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
        }).catch(res=>{
          setnotfound(`!User not found`)
        })
        axios.get(`${process.env.REACT_APP_API_URL}/list-question`).then((res) => {
            console.log(res.data.data)
            setquestion(res.data.data)
        })
    }, [])
    console.log(userbyudn.length);

var answer = new Array
question.forEach((un)=>{if(un.answers.length>0){un.answers.forEach((i)=>{if(i.userdname==uid)answer.push(i)})}})
    
var questions = new Array
question.forEach((un)=>{ if(un.userdname==uid) questions.push(un)})

    const [allquestions, setquestions] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/list-question`).then((res) => {
            console.log(res.data.data)
            setquestions(res.data.data)
        })
    }, [])

    var askedquestion = questions.filter((un)=>{return un.userdname==uid})

    return (<div style={{minHeight:"70vh"}}>
        {userbyudn.length!=0 ? <div>
        <div className="container">
        <div className='d-md-flex'>
         <div className="col-md-5 col-sm-10 text-center col-lg-4 mx-auto proimgdiv"><br />
             <div className="profilepic col-sm-8" data-aos="flip-up" data-aos-once='true' data-aos-duration="600" >
                 <img className="col-sm-12 m-auto" height="225rem" width="225rem" src={profilebyudn ? `http://localhost:3001/${profilebyudn}`
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
     </div><hr className='mb-0 mt-5'/><br />
     <div>
        {askedquestion.length>0
        ?<div>
            <h1><label>These Questions Asked by {dnamebyudn}.</label></h1>
        </div>
        :<h1 className='text-center text-secondary'>{dnamebyudn} not post any question.</h1>
        }
        <div>
            {askedquestion && askedquestion.map((q) => {
        return <Questionbox questionid={q._id} likes={q.qlikes.length} questiontitle={q.question} answer={q.answers.length} tags={q.tags}
            data_aos={'fade-up'} userdname={q.userdname} date={q.date} />
            })}
            {!askedquestion && <Spinner/>}
        </div>
     </div>
        </div> : notfound!=null ? <h1 className='text-danger text-center mt-5'>{notfound}</h1> : <Spinner/> }
    </div>
    )
}
