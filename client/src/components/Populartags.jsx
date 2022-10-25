import axios from "axios";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FcSearch } from "react-icons/fc";
import Spinner from "./spinner";

export default function Populartags(props) {
  const [question, setquestion] = useState([]);
  let searchtag = null;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/question/list`)
      .then((res) => setquestion(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const alltags = question.map((d) => d.tags);
  const uniquetags = new Set([].concat(...alltags));
  const printedtags = [];

  function questionsbytag(n, action) {
    if (action !== "search" && " ") props.history.push("questionsby/" + n);
    else {
      if (searchtag == null) alert("Enter some tags first in input box");
      else if (searchtag.includes(" ") === true)
        alert("Remove blank space from input box");
      else props.history.push("questionsby/" + searchtag);
    }
  }

  return (
    <div>
      <div
        className="container"
        style={{ borderBottom: "2px solid lightgrey", paddingBottom: ".6rem" }}
      >
        <h1 style={{ fontFamily: "sans-serif", marginTop: ".4rem" }}>
          {" "}
          Popular Tags{" "}
        </h1>
        <h4 style={{ fontFamily: "Times", width: "95%" }}>
          A tag is a keyword or label that categorizes your question with other,
          similar questions. Using the right tags makes it easier for others to
          find and answer your question.
        </h4>
        <input
          type="text"
          placeholder=" Search Tags"
          style={{ paddingLeft: "1%", fontFamily: "monospace" }}
          list="searchtag"
          onChange={(e) => e.target.value}
          value={searchtag}
          name="searcht"
          id="searcht"
          required
          className="searchtp"
        />
        <datalist id="searchtag">
          {question && uniquetags.forEach((y) => printedtags.push(y))}
          {printedtags.map((u) => (
            <option>{u}</option>
          ))}
        </datalist>
        <button
          className="searchb"
          onClick={() => questionsbytag("notvalid", "search")}
          style={{ fontFamily: "Fantasy" }}
        >
          <FcSearch /> Search
        </button>
      </div>
      <div style={{ minHeight: "40vh" }}>
        {!question && <Spinner />}
        {question &&
          printedtags.map((t) => {
            return (
              <button
                data-aos="zoom-in"
                data-aos-offset="max-height"
                data-aos-once="true"
                data-aos-duration="200"
                className="btn btn-light m-2 border border-3 border-secondary"
                id="tagButton"
                onClick={() => questionsbytag(t, "open")}
              >
                {t}
              </button>
            );
          })}
      </div>
    </div>
  );
}
AOS.init();
