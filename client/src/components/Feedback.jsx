import axios from "axios";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { tagRegex } from "../helper/RegexHelper";

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
      if (!user) return alert("For submit feedback you need to login first");
      const errors = [],
        tagsToAppend = getTagsToAppend(),
        validTags = tagsToAppend.filter((tag) => tagRegex.test(tag.trim()));
      setLoader(true);

      if (FeedbackHead.trim().length > 73 || FeedbackHead.trim().length < 4)
        errors.push("Feedback title length must between 4 to 73");
      if (FeedbackBody.trim().length > 1000 || FeedbackBody.trim().length < 6)
        errors.push("Feedback explaination length must between 10 to 1000");
      if (tagsToAppend.length < 0 || tagsToAppend.length > 5)
        errors.push("number of tags must in between 1 to 5");
      if (validTags.length !== tagsToAppend.length)
        errors.push(
          "tags can't includes symbol & empty spaces at any position"
        );

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
            conclusion: FeedbackFoot,
            userId: user._id
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
    [FeedbackHead, FeedbackBody, FeedbackFoot, user]
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
            style={{ width: "90%" }}
          />
        </div>
        <br />
        <div className="card-body bg-light">
          <label htmlFor="eBody">
            <b>
              Explain why you want to add these tags
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
            style={{ width: "90%" }}
          ></textarea>
          <br />
        </div>
        <br />
        <div className="card-footer">
          <label htmlFor="eFoot">
            <b>Enter tags related to questions</b>
            <br />
            Add up to 5 tags to describe what your question is about
          </label>
          {getTagsToAppend().length ? (
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
                : "Enter footer content or conclusion"
            }
            name="FeedbackFoot"
            id="eFoot"
            required
            style={{ width: "90%" }}
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
