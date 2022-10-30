import React, { useEffect, useState } from "react";
import { FcDislike, FcLike, FcLikePlaceholder } from "react-icons/fc";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./css/qls.css";
import Spinner from "./spinner";
import handleDate from "../helper/dateHelper";

export default function Question(props) {
  const [question, setquestion] = useState("");
  const [qusername, setqusername] = useState("");
  const [questiondetail, setquestiondetail] = useState("");
  const [tag, settag] = useState([]);
  const [qdate, setqdate] = useState();
  const [qlikes, setqlikes] = useState([]);
  const [answer, setanswer] = useState([]);
  const [postanswer, setpostanswer] = useState();
  const [alikes, setalikes] = useState([]);
  const [quser, setquser] = useState("");
  const [date, setdate] = useState(Date);
  const [statechange, setstatechange] = useState(1);

  const user = useSelector((state) => state.user);
  const qid = props.match.params.id;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question?id=` + qid)
      .then((res) => {
        console.log(res.data);
        setquestion(res.data.data.question);
        setqusername(res.data.data.userdname);
        settag(res.data.data.tags);
        setqdate(res.data.data.date);
        setqlikes(res.data.data.qlikes);
        setanswer(res.data.data.answers);
        setquser(res.data.data.userId);
        setquestiondetail(res.data.data.questiondetail);
      })
      .catch((err) => console.log("In question fetch: ", err));
  }, []);

  const setposta = (e) =>
    e.target.name === "seta" && setpostanswer(e.target.value);

  function listanswer() {
    if (user === null) {
      alert("For submit your answer you need to login first");
    } else {
      if (postanswer.length > 10) {
        const a = [];
        answer.forEach((o) => a.push(o.answer));
        if (a.includes(postanswer) !== true) {
          setdate(Date);
          const uid = user._id;
          const answer = postanswer;
          const lista = { uid, date, answer, alikes, qid };
          axios
            .post(`${process.env.REACT_APP_API_URL}/create-answer`, lista)
            .then((res) => {
              if (res.data.status === "ok") {
                let userpoint = user.userlikes + 10;
                if (userpoint < 0) {
                  userpoint = 0;
                }
                if (user._id !== qusername) {
                  const userdname = user._id;
                  const uid = { userdname, userpoint };
                  axios
                    .post(
                      `${process.env.REACT_APP_API_URL}/update-user-point`,
                      uid
                    )
                    .then((res) => {
                      console.log(res.data.data);
                    });
                }
              }
            });
          document.getElementById("thanksforanswer").style.display = "block";
          setstatechange(statechange + 1 + 1);
        } else {
          alert("This answer is already posted.");
        }
      } else {
        alert("your answer is to short please explain in detail");
      }
    }
  }

  function likeclick() {
    if (!user) {
      alert("for do this action you need to login first");
    } else if (qlikes.includes(user._id) === true) {
      const indexforpop = qlikes.indexOf(user._id);
      setqlikes(qlikes.splice(indexforpop, 1));
      setstatechange(statechange + 1 + 1);
      const removeqlike = { qid, qlikes };
      axios
        .post(`${process.env.REACT_APP_API_URL}/remove-qlike`, removeqlike)
        .then((res) => {
          console.log(res.data.data);
        });
    } else {
      const uid = user._id;
      setqlikes(qlikes.push(uid));
      const addqlike = { uid, qid };
      axios
        .post(`${process.env.REACT_APP_API_URL}/add-qlike`, addqlike)
        .then((res) => console.log(res.data.data));
      setstatechange(statechange + 1 + 1);
    }
  }

  function answerlikeadd(al, ad) {
    if (!user) {
      alert("for do this action you need to login first");
    } else if (al.includes(user._id) === true) {
      const indexforpop = al.indexOf(user._id);
      al.splice(indexforpop, 1);
      const removealike = { ad, al, qid };
      axios
        .post(`${process.env.REACT_APP_API_URL}/remove-alike`, removealike)
        .then((res) => {
          console.log(res.data.data);
        });
      setstatechange(statechange + 1 + 1);
    } else {
      const uid = user._id;
      const addqlike = { uid, qid, ad };
      axios
        .post(`${process.env.REACT_APP_API_URL}/add-alike`, addqlike)
        .then((res) => {
          console.log(res.data.data);
        });
      setstatechange(statechange + 1 + 1);
    }
  }

  let amain;
  let qd = questiondetail.replace(/(?:\r\n|\r|\n)/g, "<br/>");
  const ausernames = answer.map((a) => a.uid);

  function deleteHandler() {
    const deleteQues = { qid };
    axios
      .post(`${process.env.REACT_APP_API_URL}/delete-question`, deleteQues)
      .then((res) => {
        if (res.data.status === "ok") {
          const userdname = user._id;
          let userpoint = user.userlikes - 5;
          if (userpoint < 0) {
            userpoint = 0;
          }
          const uid = { userdname, userpoint };
          axios
            .post(`${process.env.REACT_APP_API_URL}/update-user-point`, uid)
            .then((res) => console.log(res.data.data));
          if (ausernames.length > 0) {
            ausernames.forEach((e) => {
              const userdname = e;
              if (user._id !== e) {
                const auser = undefined;
                let userpoint = auser.userlikes - 10;
                if (userpoint < 0) {
                  userpoint = 0;
                }
                const uid = { userdname, userpoint };
                axios
                  .post(
                    `${process.env.REACT_APP_API_URL}/update-user-point`,
                    uid
                  )
                  .then((res) => console.log(res.data.data + " alikes"));
              }
            });
          }
          alert(res.data.data);
          props.history.push("/");
        }
      });
  }

  return question ? (
    <div>
      <div key={qid}>
        <h2
          className="col-sm-10 text-left"
          style={{
            fontFamily: "sans-serif",
            textShadow: ".01em .02em yellow",
            display: "inline-block"
          }}
        >
          Q. {question}
        </h2>
        <button
          type="reset"
          className="col-sm-1 btn btn-light likebtn"
          onClick={() => likeclick()}
          style={{ height: "min-content", width: "min-content" }}
        >
          {user ? (
            qlikes.toString().includes(user._id) === true ? (
              <FcLike />
            ) : (
              <FcLikePlaceholder />
            )
          ) : (
            <FcDislike />
          )}
          {qlikes ? (qlikes.length !== undefined ? qlikes.length : "0") : "0"}
        </button>
        <br />
        <div>
          Asked By{" "}
          <NavLink style={{ fontFamily: "cursive" }} to={`/user/${qusername}`}>
            {quser}
          </NavLink>{" "}
          {handleDate(qdate) !== 0
            ? "on " + handleDate(qdate) + " day ago"
            : "today"}
          .
        </div>
        <hr className="col-sm-11" />
        <h5 className="px-2 " id="hu">
          {qd.split("<br/>").map(function (item) {
            return <p>{item}</p>;
          })}
        </h5>
      </div>
      <h4 className="col-sm-11">
        <button
          className="btn mx-1 btn-outline-dark float-end mr-"
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://stackinflow.netlify.app/question/${qid}`
            );
          }}
        >
          Copy Link
        </button>
        {user != null && user._id === qusername ? (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure to delete this question?")) {
                deleteHandler();
              }
            }}
            className="btn mx-2 btn-outline-danger"
          >
            {" "}
            Delete Question{" "}
          </button>
        ) : (
          <div></div>
        )}
        {user != null && user._id === qusername ? (
          <NavLink
            className="btn mx-1 btn-outline-primary"
            to={{
              pathname: `/editQuestion/${qid}`,
              questionid: qid,
              questiontitle: question,
              questiondetails: questiondetail,
              questiontags: tag,
              questionlikes: qlikes,
              questiondate: qdate,
              quserdname: qusername,
              qanswers: answer
            }}
          >
            Edit Question{" "}
          </NavLink>
        ) : (
          <div></div>
        )}
      </h4>
      <br />
      {answer !== "" && <h2> Given Answers</h2>}
      {answer !== "" &&
        answer.map((a) => {
          return (
            <div className="m-2 mb-0" key={a.uid}>
              <div className="answersec">
                <h4 className="col-sm-10 mx-2">
                  <div style={{ display: "none" }}>
                    {(amain = a.answer.replace(/(?:\r\n|\r|\n)/g, "\n"))}
                  </div>
                  {amain.split("\n").map(function (i) {
                    return <p>{i}</p>;
                  })}
                </h4>
                <button
                  type="reset"
                  className="col-sm-1 float-end mx-4 likebtn"
                  style={{
                    height: "min-content",
                    border: "0",
                    width: "min-content",
                    fontSize: "large"
                  }}
                  onClick={() => answerlikeadd(a.alikes, a.date)}
                >
                  {user ? (
                    a.alikes.toString().includes(user._id) === true ? (
                      <FcLike />
                    ) : (
                      <FcLikePlaceholder />
                    )
                  ) : (
                    <FcDislike />
                  )}
                  {a.alikes ? a.alikes.length : 0}
                </button>
                <div className="col-sm-4 mx-2">
                  Given By{" "}
                  <NavLink
                    style={{ fontFamily: "cursive" }}
                    to={`/user/${a.uid}`}
                  >
                    {quser}
                  </NavLink>{" "}
                  <br />{" "}
                  {handleDate(a.date) !== 0
                    ? "on " + handleDate(a.date) + " day ago"
                    : "today"}
                  .
                </div>
              </div>
            </div>
          );
        })}
      {answer === "" && (
        <h3 className="text-secondary">
          <b> No answer given</b>
        </h3>
      )}
      {answer !== "" && <br />}
      <h2 className="m-2 mb-0">Your Answer</h2>
      <form>
        <div className="col-sm-11 ">
          <textarea
            className="w-100"
            onChange={(e) => setposta(e)}
            name="seta"
            id="seta"
            style={{
              height: "30vh",
              marginBottom: ".6rem",
              fontSize: "1.4rem"
            }}
          ></textarea>
        </div>
        <h6 className="col-sm-11">
          <button
            type="reset"
            onClick={listanswer}
            className="btn float-end btn-success postans rounded-3 mx-1"
            style={{ marginBottom: "1.5rem", fontSize: "large" }}
          >
            Post Answer
          </button>
        </h6>
      </form>
      <br />
      <div
        className="col-sm-11 bg-danger mt-3 text-info rounded-3 mx-1"
        id="thanksforanswer"
        style={{ display: "none" }}
      >
        Thanks for contributing an answer to Stackinflow!
        <br />
        Please be sure to answer the question. Provide details and share your
        research!
        <br />
        But avoid …<br />
        <br />
        Asking for help, clarification, or responding to other answers.
        <br />
        Making statements based on opinion; back them up with references or
        personal experience.
      </div>
      <br />
      <h3
        className="col-sm-11 px-1"
        style={{ display: "inline-block", margin: "1rem 1rem 1rem 0rem" }}
      >
        Browse other questions tagged{" "}
        {tag.map((o) => {
          if (o !== "" && " ")
            return (
              <NavLink
                style={{ fontFamily: "monospace" }}
                className="btn btn-link btn-outline-dark m-1 rounded"
                to={`/questionsBy/${o}`}
              >
                {o.replace(",", "")}
              </NavLink>
            );
        })}{" "}
        {user ? (
          <span>
            {" "}
            or{" "}
            <NavLink
              style={{ fontFamily: "monospace" }}
              className="btn btn-primary ayoq"
              to={`/AskQuestion`}
            >
              ask you questions.
            </NavLink>
          </span>
        ) : (
          <span>
            or{" "}
            <NavLink className="btn btn-primary" to={"/login"}>
              login
            </NavLink>{" "}
            first for ask your questions.
          </span>
        )}
      </h3>
    </div>
  ) : (
    <Spinner />
  );
}