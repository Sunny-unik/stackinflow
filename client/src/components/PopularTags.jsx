import axios from "axios";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FcSearch } from "react-icons/fc";
import Spinner from "./loadings/Spinner";
import Error from "./Error";

export default function PopularTags(props) {
  const [searchTag, setSearchTag] = useState("");
  const [tagsLength, setTagsLength] = useState("{count loading...}");
  const [tags, setTags] = useState({
    data: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tag/count`)
      .then(({ data }) => setTagsLength(data.data))
      .catch(() => setTagsLength("count failed"));
    axios
      .get(`${process.env.REACT_APP_API_URL}/tag/on-page`)
      .then(({ data }) =>
        setTags({ data: data.data, loading: false, error: null })
      )
      .catch((error = {}) => setTags({ error, loading: false, data: null }));
  }, []);

  function questionsByTag(t, action) {
    if (action !== "search" && " ") props.history.push("/tagged/" + t);
    else {
      if (searchTag == null) alert("Enter some tags first in input box");
      else if (searchTag.includes(" ") === true)
        alert("Remove blank space from input box");
      else props.history.push("/tagged/" + searchTag);
    }
  }

  return (
    <div>
      <div className="container pb-3 border border-2 border-top-0 border-start-0 border-end-0">
        <div className="row flex-nowrap justify-content-between">
          <h1 className="py-1 d-inline-block w-50">Total {tagsLength} Tags</h1>
          <form
            className="ms-auto input-group w-25 flex-nowrap align-items-center"
            onSubmit={() => questionsByTag("notValid", "search")}
          >
            <input
              type="text"
              placeholder="Search Tags"
              onChange={(e) => setSearchTag(e.target.value)}
              value={searchTag}
              name="searchT"
              id="searchT"
              required
              className="form-control border-secondary px-2"
            />
            <button className="btn btn-outline-secondary">
              <FcSearch />
            </button>
          </form>
        </div>
        <h4 className="fw-normal pb-2">
          A tag is a keyword or label that categorizes your question with other,
          similar questions. Using the right tags makes it easier for others to
          find and answer your question. Listed tags are sorted as per higher
          popularity.
        </h4>
      </div>
      <div className="p-3" style={{ minHeight: "60vh" }}>
        {!tags.data ? (
          <Spinner />
        ) : (
          <div className="row gap-xl-4 gap-lg-5 gap-4 justify-content-center">
            {tags.data?.length ? (
              tags.data.map((t) => (
                <div
                  key={t._id + "-tag-btn"}
                  data-aos="zoom-in"
                  data-aos-offset="max-height"
                  data-aos-once="true"
                  data-aos-duration="200"
                  className="card px-0 col-md-3 col-xl-2 d-inline-block"
                  onClick={() => questionsByTag(t.name, "open")}
                >
                  <div className="card-body">
                    <span id="inTagsTag" className="badge bg-primary my-2">
                      {t.name}
                    </span>
                    <p className="card-text multiline-ellipsis">{t.detail}</p>
                  </div>
                  <div className="card-footer">
                    has{" "}
                    {!t.questionsCount
                      ? "0 question"
                      : t.questionsCount + " questions"}
                  </div>
                </div>
              ))
            ) : (
              <Error
                statusCode={
                  tags.data?.length === 0 ? 404 : tags.error.statusCode
                }
                message={tags.data?.length === 0 ? "No such data found" : null}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
AOS.init();
