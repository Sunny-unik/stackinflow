import React, { useCallback, useRef, useState } from "react";
import { useEffect } from "react";

export default function Dropdown({ availableTags, askTags, setAskTags }) {
  const [ValidTags, setValidTags] = useState(
    availableTags.filter((t) => !askTags.includes(t)) || []
  );
  const dropdownBtn = useRef(null);
  const dropdownInput = useRef(null);
  const dropdownList = useRef(null);

  const dropdownInputFocus = () => dropdownInput.current.focus();
  const handleInputKeyDown = (event) => {
    if (event.key === "Tab" && !event.shiftKey) {
      event.preventDefault();
      dropdownList.current.firstChild.focus();
    }
  };
  const handleListKeyDown = (event) => {
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
    dropdownList.current.addEventListener("keydown", handleListKeyDown);
    dropdownInput.current.addEventListener("keydown", handleInputKeyDown);
    dropdownBtn.current.addEventListener("click", dropdownInputFocus);
    return () => {
      listRef.removeEventListener("keydown", handleListKeyDown);
      inputRef.removeEventListener("keydown", handleInputKeyDown);
      btnRef.removeEventListener("click", dropdownInputFocus);
    };
  }, []);

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
              onChange={({ target }) =>
                setValidTags(
                  availableTags.filter(
                    (t) =>
                      t.toLowerCase().includes(target.value.toLowerCase()) &&
                      !askTags.includes(t)
                  )
                )
              }
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
