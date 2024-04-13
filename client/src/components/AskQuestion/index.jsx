import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { tagRegex } from "../../helper/RegexHelper";
import { authenticateUser } from "../../action/userAction";
import AskQuestionGuide from "./AskQuestionGuide";

export default function AskQuestion(props) {
  const { questionTitle, questionDetails, questionTags } = props.location;
  const questionId = useParams().qid;
  const [askQTitle, setQTitle] = useState(questionTitle || "");
  const [askQDescription, setQDescription] = useState(questionDetails || "");
  const [askTags, setAskTags] = useState(
    questionId && questionTags ? [...questionTags, ""] : []
  );
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(authenticateUser());
      return false;
    } else if (questionId) {
      if (!askQTitle)
        axios
          .get(`${process.env.REACT_APP_API_URL}/question?id=${questionId}`)
          .then((res) => {
            console.log(res.data.data);
            setQTitle(res.data.data.question);
            setQDescription(res.data.data.questiondetail);
            setAskTags([...res.data.data.tags, ""]);
          })
          .catch((err) => console.log("In question fetch: ", err));
    } else
      document
        .querySelectorAll(".extraLink")
        .forEach((elem) => elem?.classList.add("active"));
    return () => {
      document
        .querySelectorAll(".extraLink")
        .forEach((elem) => elem?.classList.remove("active"));
    };
  }, [user, dispatch, questionId, askQTitle]);

  const removeTag = useCallback(
    (index) => {
      const tags = [...askTags];
      tags.splice(index, 1);
      setAskTags(tags);
    },
    [askTags]
  );

  const getTagsToAppend = useCallback(() => {
    const tags = [...askTags];
    tags.splice(tags.length - 1, 1);
    return tags;
  }, [askTags]);

  const validQuestion = useCallback(() => {
    const errors = [],
      tagsToAppend = getTagsToAppend();
    // valid tags which doesn't includes symbol & empty space at any position
    const validTags = tagsToAppend.filter((tag) => tagRegex.test(tag.trim())),
      qTitle = askQTitle.trim(),
      qDescription = askQDescription.trim();

    if (qTitle.length < 4 || qTitle.length > 151)
      errors.push("title's characters length must in between 4 to 151");
    if (qDescription.length < 5 || qDescription.length > 5001)
      errors.push("description's characters length must in between 5 to 5000");
    if (tagsToAppend.length < 0 || tagsToAppend.length > 5)
      errors.push("number of tags must in between 1 to 5");
    if (validTags.length !== tagsToAppend.length)
      errors.push("tags can't includes symbol & empty spaces at any position");

    if (!!errors.length) {
      const errorsString = errors.join(",\n");
      alert(`${errorsString.charAt(0).toUpperCase()}${errorsString.slice(1)}.`);
      setLoader(false);
    }
    return !errors.length;
  }, [askQDescription, askQTitle, getTagsToAppend]);

  const validUniqueTitle = useCallback(async () => {
    let validTitle = true;
    try {
      console.log(askQTitle);
      const res = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }/question/search?search=${askQTitle.trim()}&qid=${questionId}`
      );
      if (res.data.data.length) validTitle = false;
    } catch (err) {
      validTitle = null;
    }
    if (!validTitle) {
      alert(
        validTitle === null
          ? "Some server-side error occurred, try again later."
          : "This question title is already listed."
      );
      setLoader(false);
      return false;
    }
    return true;
  }, [askQTitle, questionId]);

  const postQuestion = useCallback(async () => {
    if (!validUniqueTitle) return false;
    axios
      .post(`${process.env.REACT_APP_API_URL}/question`, {
        question: askQTitle.trim(),
        tags: getTagsToAppend(),
        userId: user._id,
        questiondetail: askQDescription.trim()
      })
      .then(() => alert("Question listed successfully."))
      .catch(() => alert("Some server-side error occurred, try again later."))
      .finally(() => setLoader(false));
  }, [
    getTagsToAppend,
    askQDescription,
    askQTitle,
    user?._id,
    validUniqueTitle
  ]);

  const updateQuestion = useCallback(async () => {
    if (!validUniqueTitle) return false;
    axios
      .put(`${process.env.REACT_APP_API_URL}/question/`, {
        question: askQTitle.trim(),
        tags: getTagsToAppend(),
        id: questionId,
        questionDetail: askQDescription.trim()
      })
      .then(({ data }) => {
        alert(data.msg);
        !data.msg.includes("No changes") &&
          props.history.push(`/question/${questionId}`);
      })
      .catch((error) =>
        alert(
          error.message,
          "Some server-side error occurred, try again later."
        )
      )
      .finally(() => setLoader(false));
  }, [
    askQTitle,
    askQDescription,
    questionId,
    getTagsToAppend,
    props.history,
    validUniqueTitle
  ]);

  return (
    <div className="bg-light" style={{ borderLeft: "2px solid lightgrey" }}>
      {user && (
        <div className="ask m-0 mb-1">
          <h1 className="p-2">
            {questionId ? " Edit Question " : " Ask a public question"}{" "}
          </h1>
          <div className="d-md-flex">
            <form
              className="col-sm-12 col-md-7 card bg-white p-3 mb-md-4 d-inline-block mx-md-4"
              onSubmit={(e) => {
                e.preventDefault();
                setLoader(true);
                if (validQuestion())
                  questionId ? updateQuestion() : postQuestion();
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
                value={askQTitle}
                onChange={(e) => setQTitle(e.target.value)}
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
                value={askQDescription}
                onChange={(e) => setQDescription(e.target.value)}
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
                {questionId ? "Update" : "Publish"} Question{" "}
                {loader && (
                  <div
                    className="spinner-border spinner-border-sm ml-1"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </button>
            </form>
            <AskQuestionGuide />
          </div>
        </div>
      )}
    </div>
  );
}
