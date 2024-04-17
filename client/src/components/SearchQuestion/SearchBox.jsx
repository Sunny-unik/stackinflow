import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function SearchBox() {
  const [questionSearch, setquestionSearch] = useState("");

  return (
    <div className="d-flex flex-grow-1">
      <input
        type="text"
        placeholder="Search Question"
        className="form-control me-1"
        name="question-search"
        value={questionSearch}
        onChange={(e) => setquestionSearch(e.target.value)}
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
