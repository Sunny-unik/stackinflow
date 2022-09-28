import axios from 'axios';

export function checkLogin(u) {
  return dispatch => {
    dispatch({ type: 'LOADING_TRUE' });
    axios.post(`${process.env.REACT_APP_API_URL}/check-login`, u).then(res => {
      dispatch({ type: 'LOADING_FALSE' });
      if (res.data.status === 'ok') {
        dispatch({ type: 'LOGIN_USER', payload: res.data.data });
      } else {
        alert('Credential are not correct');
      }
    });
  };
}
