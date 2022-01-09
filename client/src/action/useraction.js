import axios from 'axios';

export function checkLogin(u){
    return (dispatch)=>{
        // alert("in check login");
        dispatch({type:"LOADING_TRUE"});
        axios.post("http://localhost:3001/check-login",u).then((res)=>{
            dispatch({type:"LOADING_FALSE"})
            // alert(JSON.stringify(res.data));
            if(res.data.status==="ok")
            {
                dispatch({type:"LOGIN_USER", payload:res.data.data})
            }
            else{
                alert("Credential are not correct");
            }
        })
    }
}