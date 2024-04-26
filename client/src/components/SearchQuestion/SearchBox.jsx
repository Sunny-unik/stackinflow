import React, { useCallback, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";

export default function SearchBox() {
  const paths = useLocation().pathname.split("/");
  const initialSearch = paths[2] || "";
  const [questionSearch, setQuestionSearch] = useState(
    paths[1] === "search" ? initialSearch : ""
  );

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Enter") event.target.nextSibling?.click();
  }, []);

  return (
    <div className="d-flex flex-grow-1">
      <input
        type="text"
        placeholder="Search Question"
        className="form-control me-1"
        name="question-search"
        value={questionSearch}
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuestionSearch(e.target.value)}
        id="questionSearch"
      />
      <NavLink
        id="questionSearchBtn"
        className="btn btn-primary"
        to={{
          pathname: `/search/${questionSearch}`,
          searchedQuestion: questionSearch
        }}
      >
        <FaSearch color="white" />
      </NavLink>
    </div>
  );
}
