import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { tagRegex } from "../helper/RegexHelper";
import { authenticateUser, updateUserPoints } from "../action/userAction";

export default function AskQuestion(props) {
  const [askq, setaskq] = useState("");
  const [askqd, setaskqd] = useState("");
  const [asktag, setasktag] = useState("");
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(authenticateUser());
      return false;
    }
    document
      .querySelectorAll(".extraLink")
      .forEach((elem) => elem?.classList.add("active"));
    return () => {
      document
        .querySelectorAll(".extraLink")
        .forEach((elem) => elem?.classList.remove("active"));
    };
  }, [user, props.history, dispatch]);

  const validQuestion = (title, description, tags) => {
    const errors = [];
    // valid tags which doesn't includes symbol & empty space at any position
    const validTags = tags.filter((el) => tagRegex.test(el.trim()));

    if (!title.trim().length || !title)
      errors.push("question title is missing");
    if (!description.trim().length || !description)
      errors.push("question description is missing");
    if (tags.length < 0 || tags.length > 5)
      errors.push("tags length must be in between 1 to 5");
    if (validTags.length !== tags.length)
      errors.push("tags can't includes empty space & symbols");

    if (!!errors.length) {
      alert(errors.join(",\n"));
      setLoader(false);
    }
    return !errors.length;
  };

  const postQuestion = async () => {
    let validTitle = true;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/question/search?search=${askq}`
      );
      !!res.data.data.length && (validTitle = false);
    } catch (err) {
      validTitle = null;
    }
    if (!validTitle) {
      alert(
        validTitle === null
          ? "Some server side error occurred, try again later."
          : "This question is already asked by someone else."
      );
      return setLoader(false);
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/question`, {
        question: askq,
        tags: asktag.split(", "),
        userId: user?._id,
        questiondetail: askqd
      })
      .then((res) => {
        if (!res.data.msg) return;
        dispatch(updateUserPoints(user?._id, user?.userlikes + 10));
        alert("Question listed successfully.");
      })
      .catch(() => {
        alert("Some server side error occurred, try again later.");
      })
      .finally(setLoader(false));
  };

  return (
    <div className="bg-light" style={{ borderLeft: "2px solid lightgrey" }}>
      {user && (
        <div className="ask m-0 mb-1">
          <h1 className="p-2"> Ask a public question </h1>
          <div className="d-md-flex">
            <form className="col-sm-12 col-md-7 card bg-white p-3 mb-md-4 d-inline-block mx-md-4">
              <label htmlFor="askq">
                <b>Enter your question title</b>
              </label>
              <label>
                Be specific & imagine you’re asking a question to another person
              </label>
              <input
                className="mb-3 mt-1"
                type="text"
                value={askq}
                onChange={(e) => setaskq(e.target.value)}
                placeholder="Enter your question title"
                name="askq"
                id="askq"
                required
                style={{ width: "90%" }}
              />
              <label htmlFor="askqd">
                <b>Describe your question</b>
              </label>
              <label>
                Include all the information someone would need to answer your
                question
              </label>
              <textarea
                className="mb-3 mt-1"
                type="text"
                value={askqd}
                onChange={(e) => setaskqd(e.target.value)}
                placeholder="Describe your question"
                name="askqd"
                id="askqd"
                required
                rows="7"
                style={{ width: "90%" }}
              ></textarea>
              <label htmlFor="asktag">
                <b>Enter tags related to questions</b>
              </label>
              <label>
                Add up to 5 tags to describe what your question is about
              </label>
              <input
                className="mb-3 mt-1"
                type="text"
                value={asktag}
                onChange={(e) =>
                  setasktag(e.target.value.replaceAll(" ", ", "))
                }
                placeholder="Enter tags related to question"
                name="askt"
                id="asktag"
                required
                style={{ width: "90%" }}
              />
              <button
                type="reset"
                onClick={() => {
                  setLoader(true);
                  validQuestion(askq, askqd, asktag.split(",")) &&
                    postQuestion();
                }}
                className="submitFormBtn btn btn-primary"
                style={{
                  borderRadius: ".2em",
                  boxShadow: " .08em .2em #888888"
                }}
              >
                Publish Question{" "}
                {loader && (
                  <div
                    className="spinner-border spinner-border-sm ml-1"
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
            <div className="col-md-4 col-sm-11 d-inline-block mb-4 mx-1 card">
              <div className="card-header text-center">
                <h4>Tips for your question</h4>
              </div>
              <p className="p-2">
                The community is here to help you with specific coding,
                algorithm, or language problems.
                <br />
                Avoid asking opinion-based questions.
              </p>
              <details className="p-2">
                <summary style={{ fontFamily: "sans-serif" }}>
                  <h5 className="d-inline-block">1. Summarize the problem</h5>
                </summary>
                <p className="px-3 py-1">
                  Include details about your goal Describe expected and actual
                  results Include any error messages
                </p>
              </details>
              <details className="p-2">
                <summary style={{ fontFamily: "sans-serif" }}>
                  <h5 className="d-inline-block">
                    2. Describe what you’ve tried
                  </h5>
                </summary>
                <p className="px-3 py-1">
                  Show what you’ve tried and tell us what you found (on this
                  site or elsewhere) and why it didn’t meet your needs. You can
                  get better answers when you provide research.
                </p>
              </details>
              <details className="p-2">
                <summary style={{ fontFamily: "sans-serif" }}>
                  <h5 className="d-inline-block">3. How to tag</h5>
                </summary>
                <p>Tags help the right people find and answer your question.</p>
                <li>
                  Identify your tags by completing the sentence, "My question is
                  about…"
                </li>
                <li>
                  Include tags that are crucial to your question only, like{" "}
                  <NavLink to="/questionsBy/java">java</NavLink>
                </li>
                <li>
                  Only include version numbers, like c#-4.0, when absolutely
                  necessary
                </li>
                <li>Use existing popular tags</li>
              </details>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
