import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Editprofile(props) {
    
    const user = useSelector(state => state.user);
        useEffect(() => {
            if(user==null){
                alert("User need to login first")
                props.history.push('/Login')
            }
        })
        console.log(user)
        
        const objid = useSelector(state => state.user._id);
        const udname = useSelector(state => state.user.dname);
        const uname = useSelector(state => state.user.name);
        const utitle = useSelector(state => state.user.title);
        const uabout = useSelector(state => state.user.about);
        const uweblink = useSelector(state => state.user.weblink);
        const ugitlink = useSelector(state => state.user.gitlink);
        const utwitter = useSelector(state => state.user.twitter);
        const uaddress = useSelector(state => state.user.address);

        const [obid, setobid] = useState(objid)
        const [dname, setdname] = useState(udname)
        const [name, setname] = useState(uname)
        const [title, settitle] = useState(utitle)
        const [about, setabout] = useState(uabout)
        const [weblink, setweblink] = useState(uweblink)
        const [gitlink, setgitlink] = useState(ugitlink)
        const [twitter, settwitter] = useState(utwitter)
        const [address, setaddress] = useState(uaddress)
        
        // if(utitle===undefined){
        // const [title, settitle] = useState("")
        // }
        // if(uabout===undefined){
        // const [about, setabout] = useState("")
        // }
        // if(uweblink===undefined){
        //     const [weblink, setweblink] = useState("")
        // }
        // if(ugitlink===undefined){
        // const [gitlink, setgitlink] = useState("")
        // }
        // if(utwitter===undefined){
        // const [twitter, settwitter] = useState("")
        // }
        // if(uaddress===undefined){
        // const [address, setaddress] = useState("")
        // }

        function setValue(e){
            e.target.name==="edname" && setdname(e.target.value);
            e.target.name==="ename" && setname(e.target.value);
            e.target.name==="etitle" && settitle(e.target.value);
            e.target.name==="eabout" && setabout(e.target.value);
            e.target.name==="eweblink" && setweblink(e.target.value);
            e.target.name==="egitlink" && setgitlink(e.target.value);
            e.target.name==="etwitter" && settwitter(e.target.value);
            e.target.name==="eaddress" && setaddress(e.target.value);
        }

        function sendvalues(){
            // alert(dname)
            // alert(name)
            // alert(title)
            // alert(about)
            // alert(weblink)
            // alert(gitlink)
            // alert(twitter)
            // alert(address)
            alert(obid)
            var s = {
                obid,dname,name,title,about,weblink,gitlink,twitter,address
            }
            axios.post("http://localhost:3001/update-user",s).then((res) => {
            alert(res.data.data)
            // setquestion(res.data.data)
        })
        }
    
    return (
        <React.Fragment>
            <div><h1><b> Edit Your Profile </b></h1></div>
            <div className="container m-0 row ">
                {/* <div className=""> */}
                <div className="col-md-3">
                    <div><img className="uimge" src="" /></div>
                    <button type="button" className="editupbtn"> Edit Display Picture </button>
                </div>
                <div className="col-md-9">
                    {/* <div className="col-md-12"> */}
                    <label>Display name</label><br />
                    <input type="text" name="edname" value={dname} onChange={(e)=>{setValue(e)}} id="edname" placeholder="Display Name" required className="col-md-9"/><br /><br/>
                    {/* </div> */}
                    <label>Your Name</label><br />
                    <input type="text" name="ename" value={name} onChange={(e)=>{setValue(e)}} id="ename" placeholder="Your Name" required className="col-md-9"/><br /><br/>
                    <label>Title</label><br />
                    <input type="text" name="etitle" value={title} onChange={(e)=>{setValue(e)}} id="etitle" placeholder="Title" required className="col-md-9"/><br /><br/>
                </div>
                {/* </div> */}
                <div className="col-md-12">
                    About Me<br />
                    <textarea type="text" name="eabout" value={about} onChange={(e)=>{setValue(e)}} id="eabout" placeholder="explain about yourself" className="col-md-12" required />  
                </div>
                <div className="col-md-12">
                    Web Preference<br />
                    <div className="col-md-4">
                        website link<br />
                        <input type="text" name="eweblink" value={weblink} onChange={(e)=>{setValue(e)}} id="eweblink" placeholder="Website Link" required /><br />
                    </div>
                    <div className="col-md-4">
                        Github Link<br />
                        <input type="text" name="egitlink" value={gitlink} onChange={(e)=>{setValue(e)}} id="egitlink" placeholder="Github Link" required /><br />
                    </div>
                    <div className="col-md-4">
                        Twitter link<br />
                        <input type="text" name="etwitter" value={twitter} onChange={(e)=>{setValue(e)}} id="etwitter" placeholder="Twitter Link" required /><br />
                    </div>
                </div>
                <div className="col-md-12">
                    Address<br />
                    <input type="text" name="eaddress" value={address} onChange={(e)=>{setValue(e)}} id="eaddress" placeholder="Address" className="col-md-12" required /><br /><br/>
                </div>
                <div className="col-md-12 text-right">
                    <button type="button" className="updateprofile" onClick={sendvalues}> Update Profile </button>
                </div>
            </div>
        </React.Fragment>
    )
}
