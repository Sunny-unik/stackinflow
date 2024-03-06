export default function setLoading(value) {
  return (dispatch) => {
    dispatch({ type: value ? "LOADING_TRUE" : "LOADING_FALSE" });
  };
}
