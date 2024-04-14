import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function TagsDropdown({ askTags, setAskTags }) {
  const [ValidTags, setValidTags] = useState([]),
    dropdownBtn = useRef(null),
    dropdownInput = useRef(null),
    dropdownList = useRef(null);

  const dropdownInputFocus = () => dropdownInput.current.focus(),
    handleInputKeyDown = (event) => {
      if (event.key === "Tab" && !event.shiftKey) {
        event.preventDefault();
        dropdownList.current.firstChild.focus();
      }
    },
    handleListKeyDown = (event) => {
      if (
        event.key === "Tab" &&
        event.shiftKey &&
        !event.target.previousSibling
      ) {
        event.preventDefault();
        dropdownInput.current.focus();
      } else if (
        event.key === "Tab" &&
        !event.shiftKey &&
        !event.target.nextSibling
      ) {
        event.preventDefault();
        dropdownList.current
          .closest(".dropdown")
          .parentElement.parentElement.querySelector("button.submitFormBtn")
          .focus();
      }
    };

  useEffect(() => {
    const listRef = dropdownList.current,
      inputRef = dropdownInput.current,
      btnRef = dropdownBtn.current;
    axios
      .get(`${process.env.REACT_APP_API_URL}/tag/on-page?limit=1000`)
      .then((res) => {
        const tags = [];
        res.data.data.forEach(
          ({ name }) => !askTags.includes(name) && tags.push(name)
        );
        setValidTags(tags);
      })
      .catch(() => console.log("Unable to fetch tags now, try again later"));
    dropdownList.current.addEventListener("keydown", handleListKeyDown);
    dropdownInput.current.addEventListener("keydown", handleInputKeyDown);
    dropdownBtn.current.addEventListener("click", dropdownInputFocus);
    return () => {
      listRef.removeEventListener("keydown", handleListKeyDown);
      inputRef.removeEventListener("keydown", handleInputKeyDown);
      btnRef.removeEventListener("click", dropdownInputFocus);
    };
  }, [askTags]);

  const handleInputChange = useCallback(
    ({ target }) => {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/tag/search?search=${target.value}`,
          { askedTags: askTags }
        )
        .then((res) => setValidTags(res.data.data.map((t) => t.name)))
        .catch(() => console.log("Unable to fetch tags now, try again later"));
    },
    [askTags]
  );

  const removeTag = useCallback(
    (index) => {
      const tags = [...askTags];
      const removedTag = tags.splice(index, 1)[0];
      setAskTags(tags);
      setValidTags((current) => [...current, removedTag]);
    },
    [askTags, setAskTags]
  );

  return (
    <>
      <label htmlFor="askTagsWrapper">
        <b>Enter tags related to questions</b>
        <br />
        Add up to 5 tags to describe what your question is about
      </label>
      <div className="d-flex align-items-center justify-content-between mt-2">
        <div id="askTagsWrapper" className="w-75 d-inline-block">
          {askTags.map((tag, i) => (
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
        <div className="dropdown d-inline-block m-0">
          <button
            className="btn btn-secondary dropdown-toggle"
            ref={dropdownBtn}
            type="button"
            id="dropdownAskTag"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Tags
          </button>
          <div className="dropdown-menu pt-0" aria-labelledby="dropdownAskTag">
            <input
              className="mb-3 mt-1 form-control mx-auto"
              ref={dropdownInput}
              type="text"
              tabIndex={0}
              placeholder="Search tags.."
              onChange={handleInputChange}
              name="askTag"
              id="askTag"
            />
            <div
              ref={dropdownList}
              className="suggestedTags px-1"
              style={{ maxHeight: "280px", overflowY: "auto" }}
            >
              {ValidTags.map((tag, i) => (
                <button
                  key={tag + "-li"}
                  tabIndex={i + 1}
                  className="btn btn-secondary w-100 mb-1"
                  onClick={({ target }) => {
                    setAskTags((previousValue) => [
                      ...new Set([...previousValue, target.innerText])
                    ]);
                    setValidTags((currentValidTags) =>
                      currentValidTags.filter((t) => t !== target.innerText)
                    );
                    dropdownBtn.current.focus();
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}
