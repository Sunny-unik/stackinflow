import axios from 'axios';
import div, { useEffect, useState } from 'react'
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
            var dn = { dname,obid }
            axios.post('http://localhost:3001/valid-dname', dn).then((res) => {
                if (res.data.status === 'ok') {
                    hidereg()
                } else {
                    if(res.data.status!=obid)
                    alert(res.data.data);
                    else
                    hidereg()
                }
            })
        }
        function hidereg(){
        //     var formData = new FormData();
        //     formData.append("profile", profile);
        //     formData.append("obid", obid );
        //     formData.append("name", name)
        //     formData.append("dname",dname)
        //     formData.append("title",title)
        //     formData.append("about", about);
        //     formData.append("weblink", weblink);
        //     formData.append("gitlink", gitlink);
        //     formData.append("twitter", twitter);
        //     formData.append("address", address);    
        // console.log(formData)
        // axios.post("http://localhost:3001/update-user",formData,{
        // headers: {'Content-Type': 'multipart/form-data'},
        // onUploadProgress: function( progressEvent ) {
        //     console.log("file Uploading Progresss.......");
        //     console.log(progressEvent);
        // setuploadPercentage( parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 )));
        // //setfileInProgress(progressEvent.fileName)
        // }
        // }).then((res)=>{
        //     alert(res.data);
        // }).catch(res=>{
        //   alert("sorry you are not authorised to do this action");
        // })
            var isvalid = true;
            // eslint-disable-next-line
            if(name=="" || name==null || name==" ") {
            isvalid=false;
            alert("please enter your name");
            }
            // eslint-disable-next-line
            if(dname=="" || dname==null || dname==" ") {
            isvalid=false;
            alert("please enter username");
            }
        if (isvalid === true) {    
        var updateuserdetails = { obid, dname, name, title, about, weblink, gitlink, twitter, address };
        console.log(updateuserdetails);
        axios.post('http://localhost:3001/update-user-details', updateuserdetails).then((res) => {
            alert(res.data.data);
        }).catch(res => {
            alert("Some error in update user details 😯");
        })
        }
        }
    
    return (<div className='py-1'>
<div><h1><b> Edit Your Profile </b></h1></div>
<div className="container bg-light py-3 m-0 row ">
    <div className="col-md-6">
    <label><b>Display name</b></label><br />
    <input type="text" name="edname" value={dname} onChange={(e)=>{setValue(e)}} id="edname" placeholder="Display Name" required className="col-md-9"/><br/>
    <label><b>Your Name</b></label><br />
    <input type="text" name="ename" value={name} onChange={(e)=>{setValue(e)}} id="ename" placeholder="Your Name" required className="col-md-9"/><br/>
    <label><b>Work Title</b></label><br />
    <input type="text" name="etitle" value={title} onChange={(e)=>{setValue(e)}} id="etitle" placeholder="Work Title" required className="col-md-9"/><br/>
    </div>
    <div className="col-md-6">
    <label><b>Web Preference</b></label><br />
        <div>
        Website link<br />
    <input style={{width:"80%"}} type="text" className='rounded' name="eweblink" value={weblink} onChange={(e)=>{setValue(e)}} id="eweblink" placeholder="Website Link" required /><br />
        </div>
        <div>
        Github Link<br />
    <input style={{width:"80%"}} type="text" className='rounded' name="egitlink" value={gitlink} onChange={(e)=>{setValue(e)}} id="egitlink" placeholder="Github Link" required /><br />
        </div>
        <div>
        Twitter link<br />
    <input style={{width:"80%"}} type="text" className='rounded' name="etwitter" value={twitter} onChange={(e)=>{setValue(e)}} id="etwitter" placeholder="Twitter Link" required /><br />
        </div>
    </div>
    <div className="col-md-12">
    <label><b>About Me</b></label><br />
        <textarea type="text" name="eabout" value={about} onChange={(e)=>{setValue(e)}} id="eabout" placeholder="explain about yourself" className="col-md-12" required />  
    </div>
    <div className="col-md-12">
    <label><b>Address</b></label><br />
        <input type="text" name="eaddress" value={address} onChange={(e)=>{setValue(e)}} id="eaddress" placeholder="Address" className="col-md-12" required /><br /><br/>
    </div>
    <div className="col-md-12 text-right">
        <button type="button" className="updateprofile btn btn-success float-end" onClick={sendvalues}> Update User Details </button>
    </div>
</div><br/>
    </div>)
}
