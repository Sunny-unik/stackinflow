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
        const uprofile = useSelector(state => state.user.profile);
        const uemail = useSelector(state => state.user.email);

        const [obid, setobid] = useState(objid)
        const [dname, setdname] = useState(udname)
        const [name, setname] = useState(uname)
        const [title, settitle] = useState(utitle)
        const [about, setabout] = useState(uabout)
        const [weblink, setweblink] = useState(uweblink)
        const [gitlink, setgitlink] = useState(ugitlink)
        const [twitter, settwitter] = useState(utwitter)
        const [address, setaddress] = useState(uaddress)
        // const [y, sety] = useState([])
        var profile;
        const [uploadPercentage, setuploadPercentage] = useState('')

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

        function setProfile(e){
            profile= e.target.files[0];
            console.log(profile);
        }
        
        function sendvalues(){
        // axios.get("http://localhost:3001/list-user").then((res)=>{
        //     console.log(res.data.data)
        //     sety(res.data.data)
        // })
        // if(y!=dname){
            // if(dname!=udname){
            //     axios.post("http://localhost:3001/username-in-question",udname).then((res)=>{
            //         console.log(res.data.data)
            //         var qures = res.status
            //     })
            // }
// if(qures==="ok"){
            var formData = new FormData();
            formData.append("profile", profile);
            formData.append("obid", obid );
            formData.append("name", name)
            formData.append("dname",dname)
            formData.append("title",title)
            formData.append("about", about);
            formData.append("weblink", weblink);
            formData.append("gitlink", gitlink);
            formData.append("twitter", twitter);
            formData.append("address", address);    
        // }
        console.log(formData)
        axios.post("http://localhost:3001/update-user",formData,{
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress: function( progressEvent ) {
            console.log("file Uploading Progresss.......");
            console.log(progressEvent);
        setuploadPercentage( parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 )));
        //setfileInProgress(progressEvent.fileName)
        }
        }).then((res)=>{
            alert(res.data);
        }).catch(res=>{
          alert("sorry you are not authorised to do this action");
      });
// }
// else{
//     alert("some server side error")
// }
    }
    
    return (
        <React.Fragment>
            <div><h1><b> Edit Your Profile </b></h1></div>
            <div className="container m-0 row ">
                {/* <div className=""> */}
                <div className="col-md-3 ">
                        <span className="font-dark">Upload avatar</span>
                    <div >
                        <img className="col-sm-12" height="225px" width="75px" src={ uprofile ? `http://localhost:3001/${uprofile}` : "assets/img/crea15.jpg"} alt="user profile" />
                    </div>
                    <div className="bg-light ">
                        <input type="file" onChange={(e)=>{setProfile(e)}} /> 
                        {uploadPercentage } {uploadPercentage && '% uploaded'}
                    </div>
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
                <label>About Me</label><br />
                    <textarea type="text" name="eabout" value={about} onChange={(e)=>{setValue(e)}} id="eabout" placeholder="explain about yourself" className="col-md-12" required />  
                </div>
                <div className="col-md-12">
                <label>Web Preference</label><br />
                    <div className="col-md-4">
                    <b>website link</b><br />
                        <input type="text" name="eweblink" value={weblink} onChange={(e)=>{setValue(e)}} id="eweblink" placeholder="Website Link" required /><br />
                    </div>
                    <div className="col-md-4">
                    <b>Github Link</b><br />
                        <input type="text" name="egitlink" value={gitlink} onChange={(e)=>{setValue(e)}} id="egitlink" placeholder="Github Link" required /><br />
                    </div>
                    <div className="col-md-4">
                    <b>Twitter link</b><br />
                        <input type="text" name="etwitter" value={twitter} onChange={(e)=>{setValue(e)}} id="etwitter" placeholder="Twitter Link" required /><br />
                    </div>
                </div>
                <div className="col-md-12">
                <label>Address</label><br />
                    <input type="text" name="eaddress" value={address} onChange={(e)=>{setValue(e)}} id="eaddress" placeholder="Address" className="col-md-12" required /><br /><br/>
                </div>
                <div className="col-md-12 text-right">
                    <button type="button" className="updateprofile" onClick={sendvalues}> Update Profile </button>
                </div>
            </div>
            <br/>
        </React.Fragment>
    )
}
