import axios from "axios";
import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FcSearch } from "react-icons/fc";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroller";

export default function Populartags(props) {
  const [tags, settags] = useState([]);
  const [searchTag, setsearchTag] = useState("");
  const [isLastPage, setisLastPage] = useState(false);

  const fetchTags = (pageNumber = 0) => {
    if (!isLastPage) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/question/tags?page=${pageNumber}`,
          { oldTags: tags }
        )
        .then((res) => {
          console.log(res.data.data, "aaya");
          JSON.stringify(res.data.data) === tags.toString()
            ? setisLastPage(true)
            : settags(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const questionsByTag = (tag, action) => {
    if (action !== "search" && " ") props.history.push("questionsby/" + tag);
    else {
      if (searchTag == null) alert("Enter some tags first in input box");
      else if (searchTag.includes(" ") === true)
        alert("Remove blank space from input box");
      else props.history.push("questionsby/" + searchTag);
    }
  };

  return (
    <div>
      <div
        className="container"
        style={{ borderBottom: "2px solid lightgrey", paddingBottom: ".6rem" }}
      >
        <h1 style={{ fontFamily: "sans-serif", marginTop: ".4rem" }}>
          Popular Tags
        </h1>
        <h4 style={{ fontFamily: "Times", width: "95%" }}>
          A tag is a keyword or label that categorizes your question with other,
          similar questions. Using the right tags makes it easier for others to
          find and answer your question.
        </h4>
        <div className="row g-3">
          <div className="col-auto">
            <input
              type="text"
              placeholder="Search Tags"
              style={{ fontFamily: "monospace" }}
              list="searchTag"
              onChange={(e) => setsearchTag(e.target.value)}
              value={searchTag}
              name="searcht"
              id="searcht"
              required
              className="form-control border-dark px-2 d-inline-block"
            />
            <datalist id="searchTag">
              {tags.map((u) => (
                <option>{u}</option>
              ))}
            </datalist>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-light border-dark"
              style={{ fontFamily: "Fantasy" }}
              onClick={() => questionsByTag("notvalid", "search")}
            >
              <FcSearch /> Search
            </button>
          </div>
        </div>
      </div>
      <div className="p-3" style={{ minHeight: "60vh" }}>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchTags}
          hasMore={true}
          loader={
            <div className="loader" key={0}>
              <Spinner />
            </div>
          }
        >
          {tags.map((t, i) => {
            return (
              <button
                key={i}
                data-aos="zoom-in"
                data-aos-offset="max-height"
                data-aos-once="true"
                data-aos-duration="200"
                className="btn btn-light m-2 border d-block border-3 border-secondary"
                id="tagButton"
                onClick={() => questionsByTag(t, "open")}
              >
                {t}
              </button>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
AOS.init();
