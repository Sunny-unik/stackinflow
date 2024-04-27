import React from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../action/userAction";

export default function DeleteButton({ answerObj, setQuestion, userId }) {
  const dispatch = useDispatch();
  const clickHandler = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/answer/`, {
        data: { answerId: answerObj._id, userId }
      })
      .then(() => {
        setQuestion((prevState) => {
          return {
            loading: false,
            error: null,
            data: {
              ...prevState.data,
              answers: prevState.data.answers.filter(
                ({ _id }) => _id !== answerObj._id
              )
            }
          };
        });
        dispatch(authenticateUser());
      })
      .catch(() => alert("Server failure, try again later"));
  };

  return (
    <button
      type="button"
      className="btn btn-outline-danger border-light likeButton m-1 mb-0"
      onClick={() => {
        if (window.confirm("Are you sure to delete this answer?"))
          clickHandler();
      }}
      style={{ width: "min-content" }}
    >
      {userId ? <FaTrash /> : null}
    </button>
  );
}
