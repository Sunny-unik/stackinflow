import axios from "axios";

function checkLogin(credentials) {
  return (dispatch) => {
    dispatch({ type: "LOADING_TRUE" });
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, credentials)
      .then((res) => {
        dispatch({ type: "LOADING_FALSE" });
        if (res.data.errors) alert(res.data.errors.join(",\n"));
        else if (res.data.msg === "Credentials Matched") {
          localStorage.setItem("stackinflowToken", res.data.token);
          dispatch({ type: "LOGIN_USER", payload: res.data.data });
        } else alert(res.data.msg);
      })
      .catch((err) => {
        dispatch({ type: "LOADING_FALSE" });
        console.log(err);
      });
  };
}

function updateUserPoints(userId, updatepoint) {
  return (dispatch) => {
    dispatch({ type: "LOADING_TRUE" });
    axios
      .put(`${process.env.REACT_APP_API_URL}/user/points`, {
        id: userId,
        userpoint: updatepoint
      })
      .then((res) => {
        dispatch({ type: "LOADING_FALSE" });
        console.log(res.data);
        !!res.data.msg &&
          dispatch({ type: "UPDATE_POINTS", payload: updatepoint });
      })
      .catch((err) => {
        dispatch({ type: "LOADING_FALSE" });
        console.log(err);
      });
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
          if (
            window.location.pathname.includes("/profile") ||
            window.location.pathname.includes("/askquestion")
          )
            window.location.pathname = "/login";
          console.log(res.data);
          localStorage.removeItem("stackinflowToken");
        } else {
          alert("Credential are not correct");
        }
      })
      .catch((err) => {
        dispatch({ type: "LOADING_FALSE" });
        console.log(err);
      });
  };
}

export { checkLogin, authenticateUser, updateUserPoints };
