import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { tagRegex } from "../helper/RegexHelper";
import { authenticateUser, updateUserPoints } from "../action/userAction";

export default function AskQuestion(props) {
  const askQTitle = useRef(null);
  const askQDescription = useRef(null);
  const [askTags, setAskTags] = useState([]);
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

  const validQuestion = () => {
    const errors = [],
      tagsToAppend = getTagsToAppend();
    // valid tags which doesn't includes symbol & empty space at any position
    const validTags = tagsToAppend.filter((tag) => tagRegex.test(tag.trim())),
      qTitle = askQTitle.current.value.trim(),
      qDescription = askQDescription.current.value.trim();

    if (qTitle.length < 4 || qTitle.length > 151)
      errors.push("title's characters length must in between 4 to 151");
    if (qDescription.length < 5 || qDescription.length > 5001)
      errors.push("description's characters length must in between 5 to 5000");
    if (tagsToAppend.length < 0 || tagsToAppend.length > 5)
      errors.push("number of tags must in between 1 to 5");
    if (validTags.length !== tagsToAppend.length)
      errors.push("tags can't includes symbol & empty spaces at any position");

    if (!!errors.length) {
      let errorsString = errors.join(",\n");
      alert(
        errorsString.replace(
          errorsString[0],
          errorsString[0].toLocaleUpperCase()
        ) + "."
      );
      setLoader(false);
    }
    return !errors.length;
  };

  const postQuestion = async () => {
    let validTitle = true;
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/question/search?search=${askQTitle}`
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
        question: askQTitle,
        tags: askTags.split(","),
        userId: user?._id,
        questiondetail: askQDescription
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

  const removeTag = (index) => {
    const tags = [...askTags];
    tags.splice(index, 1);
    setAskTags(tags);
  };

  const getTagsToAppend = () => {
    const tags = [...askTags];
    tags.splice(tags.length - 1, 1);
    return tags;
  };

  return (
    <div className="bg-light" style={{ borderLeft: "2px solid lightgrey" }}>
      {user && (
        <div className="ask m-0 mb-1">
          <h1 className="p-2"> Ask a public question </h1>
          <div className="d-md-flex">
            <form
              className="col-sm-12 col-md-7 card bg-white p-3 mb-md-4 d-inline-block mx-md-4"
              onSubmit={(e) => {
                e.preventDefault();
                setLoader(true);
                validQuestion() && postQuestion();
              }}
            >
              <label htmlFor="askQTitle">
                <b>Enter your question title</b>
                <br />
                Be specific & imagine you’re asking a question to another person
              </label>
              <input
                className="mb-3 mt-1"
                type="text"
                ref={askQTitle}
                placeholder="Enter your question title"
                name="askQTitle"
                id="askQTitle"
                required
              />
              <label htmlFor="askQDescription">
                <b>Describe your question</b>
                <br />
                Include all the information someone would need to answer your
                question
              </label>
              <textarea
                className="mb-3 mt-1"
                type="text"
                ref={askQDescription}
                placeholder="Describe your question"
                name="askQDescription"
                id="askQDescription"
                required
                rows="7"
              ></textarea>
              <label htmlFor="askTag">
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
                        onClick={(e) =>
                          removeTag(e.target.parentElement.id.at(-1))
                        }
                      >
                        X
                      </span>{" "}
                    </div>
                  ))}
                </div>
              ) : null}
              <input
                className="mb-3 mt-1"
                type="text"
                value={askTags.join(" ")}
                onChange={({ target }) => setAskTags(target.value.split(" "))}
                placeholder="Enter tags related to question"
                name="askTag"
                id="askTag"
                required
              />
              <button
                className="submitFormBtn btn btn-primary"
                style={{ boxShadow: " .08em .2em #888888" }}
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
