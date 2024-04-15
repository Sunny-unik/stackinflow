import axios from "axios";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Feedback() {
  const isTagRequest = useParams().type?.toLowerCase() === "tag";
  const user = useSelector((state) => state.user);
  const [FeedbackHead, setFeedbackHead] = useState(
    isTagRequest ? "Add new tags" : ""
  );
  const [FeedbackBody, setFeedbackBody] = useState("");
  const [FeedbackFoot, setFeedbackFoot] = useState(isTagRequest ? [] : "");
  const [loader, setLoader] = useState(false);

  const removeTag = useCallback(
    (index) => {
      const tags = [...FeedbackFoot];
      tags.splice(index, 1);
      setFeedbackFoot(tags);
    },
    [FeedbackFoot]
  );

  const getTagsToAppend = useCallback(() => {
    const tags = [...FeedbackFoot];
    tags.splice(tags.length - 1, 1);
    return tags;
  }, [FeedbackFoot]);

  const handleInputs = useCallback(
    ({ target }) => {
      target.name === "FeedbackHead" && setFeedbackHead(target.value);
      target.name === "FeedbackBody" && setFeedbackBody(target.value);
      target.name === "FeedbackFoot" &&
        setFeedbackFoot(isTagRequest ? target.value.split(" ") : target.value);
    },
    [isTagRequest]
  );

  const submitFeedback = useCallback(
    async (e) => {
      e.preventDefault();
      if (!user)
        return alert(
          `For submit ${
            isTagRequest ? "request" : "feedback"
          } you need to login first`
        );
      const errors = [],
        tagsToAppend = getTagsToAppend();
      setLoader(true);

      if (FeedbackHead.trim().length > 73 || FeedbackHead.trim().length < 4)
        errors.push("Feedback title length must between 4 to 73");
      if (FeedbackBody.trim().length > 1000 || FeedbackBody.trim().length < 6)
        errors.push("Feedback explanation length must between 10 to 1000");
      if (isTagRequest && (tagsToAppend.length < 1 || tagsToAppend.length > 5))
        errors.push("number of tags must in between 1 to 5");

      if (!!errors.length) {
        const errorsString = errors.join(",\n");
        alert(
          `${errorsString.charAt(0).toUpperCase()}${errorsString.slice(1)}.`
        );
        setLoader(false);
        return false;
      }

      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/add-feedback?userEmail=${user?.email}`,
          {
            title: FeedbackHead,
            description: FeedbackBody,
            [isTagRequest ? "tags" : "conclusion"]: FeedbackFoot,
            userId: user._id,
            isTagRequest
          }
        )
        .then(
          (res) => !!res.data.msg && alert("Thanks for sharing feedback 😊")
        )
        .catch((err) =>
          err.errors ? alert(err.errors.join(",\n")) : console.log(err)
        );
      setLoader(false);
    },
    [
      FeedbackHead,
      FeedbackBody,
      FeedbackFoot,
      user,
      getTagsToAppend,
      isTagRequest
    ]
  );

  return (
    <div
      className="w-100 card m-0 p-0"
      style={{ borderLeft: "1px solid lightgrey" }}
    >
      <h2 className="text-center display-5 btn-light">
        {" "}
        {isTagRequest ? "Tags Request" : "Feedback"}
      </h2>
      <form
        className="col-sm-12 col-md-8 card bg-white p-3 mb-md-4 d-inline-block mx-auto"
        onSubmit={submitFeedback}
      >
        <div className="card-header">
          <label htmlFor="eHead">
            <b>
              {isTagRequest ? "Request Subject" : "Enter your feedback title"}
              <span className="text-danger"> *</span>
            </b>
          </label>
          <input
            type="text"
            value={FeedbackHead}
            onChange={handleInputs}
            placeholder="Enter your feedback title"
            name="FeedbackHead"
            id="eHead"
            disabled={isTagRequest}
            required
            className="w-100 px-2"
          />
        </div>
        <br />
        <div className="card-body bg-light">
          <label htmlFor="eBody">
            <b>
              {isTagRequest
                ? "Explain why you want to add these tags"
                : "Explain which features you like most about our service or fields where need to improve"}
              <span className="text-danger"> *</span>
            </b>
          </label>
          <textarea
            type="text"
            value={FeedbackBody}
            onChange={handleInputs}
            placeholder="Describe your views"
            name="FeedbackBody"
            id="eBody"
            required
            rows="7"
            className="w-100 px-2"
          ></textarea>
          <br />
        </div>
        <br />
        <div className="card-footer">
          <label htmlFor="eFoot">
            <b>
              {isTagRequest ? "Add up to 5 tags to add" : "Optional conclusion"}
            </b>
          </label>
          {isTagRequest ? (
            <div id="askTagsWrapper">
              {getTagsToAppend().map((tag, i) => (
                <div id={"askTagSpan" + i} key={"askTagSpan" + i}>
                  {tag.trim()}
                  <span
                    onClick={(e) => removeTag(e.target.parentElement.id.at(-1))}
                  >
                    X
                  </span>{" "}
                </div>
              ))}
            </div>
          ) : null}
          <input
            type="text"
            value={isTagRequest ? FeedbackFoot.join(" ") : FeedbackFoot}
            onChange={handleInputs}
            placeholder={
              isTagRequest
                ? "Enter tags you want to add"
                : "Enter summary, short-note or conclusion"
            }
            name="FeedbackFoot"
            id="eFoot"
            required
            className={"w-100 px-2 " + (isTagRequest ? "mt-2" : "")}
          />
        </div>
        <br />
        <button
          className="float-end submitFormBtn btn btn-primary m-2"
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
      </form>
    </div>
  );
}
