import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Feedback() {
  const user = useSelector((state) => state.user);
  const [FeedbackHead, setemailhead] = useState("");
  const [FeedbackBody, setemailbody] = useState("");
  const [FeedbackFoot, setemailfoot] = useState("");
  const [loader, setLoader] = useState(false);

  const handlInputs = (target) => {
    target.name === "FeedbackHead" && setemailhead(target.value);
    target.name === "FeedbackBody" && setemailbody(target.value);
    target.name === "FeedbackFoot" && setemailfoot(target.value);
  };

  const submitFeedback = async () => {
    if (!user) {
      alert("For submit feedback you need to login first");
      return false;
    }
    const errors = [];
    setLoader(true);

    if (FeedbackHead.trim().length > 73 || FeedbackHead.trim().length < 4)
      errors.push("Feedback title length must between 4 to 73");
    if (FeedbackBody.trim().length > 1000 || FeedbackBody.trim().length < 6)
      errors.push("Feedback explaination length must between 10 to 1000");

    if (!!errors.length) {
      alert(errors.join(",\n"));
      setLoader(false);
      return false;
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/add-feedback?userEmail=${user?.email}`,
        {
          title: FeedbackHead,
          description: FeedbackBody,
          conclusion: FeedbackFoot,
          userId: user._id
        }
      )
      .then((res) => !!res.data.msg && alert("Thanks for sharing feedback 😊"))
      .catch((err) =>
        err.errors ? alert(err.errors.join(",\n")) : console.log(err)
      );
    setLoader(false);
  };

  return (
    <div
      className="w-100 card m-0 p-0"
      style={{ borderLeft: "1px solid lightgrey" }}
    >
      <h2 className="text-center display-5 btn-light"> Feedback</h2>
      <form
        className="col-sm-12 col-md-7 card bg-white p-3 mb-md-4 d-inline-block mx-md-4"
        style={{ height: "inherit" }}
      >
        <div className="card-header">
          <label htmlFor="ehead">
            <b>
              Enter your feedback title <span className="text-danger">*</span>
            </b>
          </label>
          <input
            type="text"
            value={FeedbackHead}
            onChange={(e) => handlInputs(e.target)}
            placeholder="Enter your feedback title"
            name="FeedbackHead"
            id="ehead"
            required
            style={{ width: "90%" }}
          />
        </div>
        <br />
        <div className="card-body bg-light">
          <label htmlFor="ebody">
            <b>
              Include all your reviews <span className="text-danger">*</span>
            </b>
          </label>
          <textarea
            type="text"
            value={FeedbackBody}
            onChange={(e) => handlInputs(e.target)}
            placeholder="Describe your views"
            name="FeedbackBody"
            id="ebody"
            required
            rows="7"
            style={{ width: "90%" }}
          ></textarea>
          <br />
        </div>
        <br />
        <div className="card-footer">
          <label htmlFor="efoot">
            <b>Enter footer content or conclusion</b>
          </label>
          <input
            type="text"
            value={FeedbackFoot}
            onChange={(e) => handlInputs(e.target)}
            placeholder="Enter footer content or conclusion"
            name="FeedbackFoot"
            id="efoot"
            required
            style={{ width: "90%" }}
          />
        </div>
        <br />
        <button
          type="reset"
          onClick={submitFeedback}
          className="float-end submitFormBtn btn btn-primary m-2 "
          style={{ borderRadius: ".2em", boxShadow: " .08em .2em #888888" }}
        >
          Submit Feedback{" "}
          {loader && (
            <div
              className="spinner-border text-white spinner-border-sm ml-1"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
        <style>{`
          .submitFormBtn:hover {
            color: pink !important;
          }
          .submitFormBtn:focus {
            color: pink !important;
          }
        `}</style>
      </form>
    </div>
  );
}
