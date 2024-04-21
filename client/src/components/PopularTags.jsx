import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "./loadings/Spinner";
import UseSearchParam from "../helper/UseSearchParam";
import Error from "./Error";
import Pagination from "./Pagination";
import { debounce } from "lodash";
import { NavLink } from "react-router-dom/";

export default function PopularTags(props) {
  const location = UseSearchParam(),
    limit = location.get("limit") || 45,
    pageNumber = +location.get("page") || 0,
    [currentPage, setCurrentPage] = useState(
      pageNumber < 1 ? 0 : pageNumber - 1
    ),
    [perPageLimit, setPerPageLimit] = useState(limit < 0 ? 10 : limit),
    [tagsLength, setTagsLength] = useState("{count loading...}"),
    searchTag = useRef(null),
    [tags, setTags] = useState({
      data: null,
      error: null,
      loading: true
    });

  const fetchTagsData = useCallback(
    async (value) => {
      const searchValue = searchTag.current?.value;
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/tag/count?search=${
            value || searchValue
          }`
        );
        setTagsLength(res.data.data);
      } catch (error) {
        setTagsLength("count failed");
      }
      axios
        .post(
          `${
            process.env.REACT_APP_API_URL
          }/tag/search?page=${currentPage}&limit=${perPageLimit}${
            value || searchValue ? `&search=${value || searchValue}` : ""
          }`
        )
        .then(({ data }) =>
          setTags({ data: data.data, loading: false, error: null })
        )
        .catch((error = {}) => setTags({ error, loading: false, data: null }));
    },
    [currentPage, perPageLimit]
  );

  useEffect(() => {
    fetchTagsData();
  }, [fetchTagsData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInputChange = useCallback(
    debounce(({ target }) => {
      fetchTagsData(target.value);
    }, 300),
    []
  );

  return (
    <div>
      <div className="container pb-3 border border-2 border-top-0 border-start-0 border-end-0">
        <div className="row flex-md-nowrap justify-content-between mb-2">
          <h1 className="py-1 d-inline-block col-md-6">
            Matched {tagsLength} Tags
          </h1>
          <div className="input-group w-auto flex-nowrap align-items-center">
            <input
              type="text"
              placeholder="Search Tags"
              onChange={handleInputChange}
              ref={searchTag}
              name="searchT"
              id="searchT"
              className="form-control border-secondary px-2"
            />
          </div>
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
              <>
                {tags.data.map((t) => (
                  <NavLink
                    key={t._id + "-tag-btn"}
                    data-aos="zoom-in"
                    data-aos-offset="max-height"
                    data-aos-once="true"
                    data-aos-duration="200"
                    className="card text-dark px-0 col-md-3 col-xl-2 d-inline-block"
                    to={`tagged/${t.name}`}
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
                  </NavLink>
                ))}
                <Pagination
                  {...{
                    limitValues: [15, 30, 45],
                    limitsMessage: "tags per page",
                    itemsLength: +tagsLength || 0,
                    perPageLimit,
                    setPerPageLimit,
                    currentPage,
                    setCurrentPage,
                    history: props.history,
                    route: "/tags"
                  }}
                />
              </>
            ) : (
              <Error
                statusCode={
                  tags.data?.length === 0 ? 404 : tags.error.statusCode
                }
                message={tags.data?.length === 0 ? "No such data found" : null}
                heading={tags.data?.length === 0 ? "Not found" : null}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
AOS.init();
