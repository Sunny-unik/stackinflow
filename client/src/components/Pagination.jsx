import React, { useCallback } from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({
  limitValues,
  limitsMessage,
  itemsLength,
  perPageLimit,
  setPerPageLimit,
  currentPage,
  setCurrentPage,
  history,
  route
}) {
  const handleLimitChange = useCallback(
    ({ target }) => {
      const limitCount = +target.dataset.limit;
      setPerPageLimit(limitCount || 10);
      setCurrentPage(0);
      history.push(`${route}?limit=${limitCount}`);
    },
    [history, setCurrentPage, setPerPageLimit, route]
  );

  return (
    <div className="container">
      <div className="pt-3 pb-1 px-md-5 d-flex flex-column-reverse flex-sm-row">
        <div className="mb-2 d-inline-block text-center gap-1 d-flex align-items-end justify-content-center limit-buttons">
          {limitValues.map((l) => (
            <div
              key={"limit-" + l}
              className={
                "btn btn-light border " + (+perPageLimit === +l ? "active" : "")
              }
              data-limit={l}
              onClick={handleLimitChange}
            >
              {l}
            </div>
          ))}
          {limitsMessage}
        </div>
        <div className="flex-grow-1"></div>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"_"}
          marginPagesDisplayed={3}
          pageCount={Math.ceil(itemsLength / perPageLimit)}
          pageRangeDisplayed={1}
          onPageChange={(pageData) => {
            setCurrentPage(pageData.selected);
            history.push(`${route}?page=${+pageData.selected + 1}`);
          }}
          containerClassName={
            "pagination justify-content-center align-items-end mb-2"
          }
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
          forcePage={+currentPage}
        />
      </div>
    </div>
  );
}
