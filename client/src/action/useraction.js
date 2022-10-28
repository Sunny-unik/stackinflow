import axios from "axios";
import showErrors from "../helper/showErrors";

function checkLogin(credentials) {
  return (dispatch) => {
    dispatch({ type: "LOADING_TRUE" });
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, credentials)
      .then((res) => {
        dispatch({ type: "LOADING_FALSE" });
        if (res.data.errors) showErrors(res.data.errors);
        else if (res.data.msg === "Credentials Matched") {
          localStorage.setItem("stackinflowToken", res.data.token);
          dispatch({ type: "LOGIN_USER", payload: res.data.data });
        } else alert(res.data.msg);
      })
      .catch((err) => console.log(err));
  };
}

function authenticateUser(token) {
  return (dispatch) => {
    dispatch({ type: "LOADING_TRUE" });
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/authenticate`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`
        }
      })
      .then((res) => {
        dispatch({ type: "LOADING_FALSE" });
        if (res.data.status === "ok") {
          dispatch({ type: "LOGIN_USER", payload: res.data.data });
        } else if (res.data === "token expired") {
          console.log(res.data);
          if (window.location.pathname.includes("/profile"))
            window.location.pathname = "/login";
          localStorage.removeItem("stackinflowToken");
        } else {
          alert("Credential are not correct");
        }
      })
      .catch((err) => console.log(err));
  };
}

export { checkLogin, authenticateUser };
