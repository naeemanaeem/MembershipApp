import React from "react";
import "./TableFooter.css";
const TableFooter = ({
  pageIndex,
  pageOptions,
  pageCount,
  gotoPage,
  pageSize,
  setPageSize,
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage,
}) => {
  return (
    <div className="footer-pagination">
      <div>
        <span>
          Page
          <strong> {pageIndex + 1} </strong> of
          <strong> {pageOptions.length} </strong>
          {"  "} |
        </span>
        <span>
          {"  "}
          Go to Page:{"  "}
          <input
            id="page-input"
            type="number"
            default={pageIndex + 1}
            min="1"
            max={pageCount}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          />
        </span>
        <select
          id="select-page-size"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Records: {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="goto-page-btn">
        <button
          className="skip-page"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>

        <button
          // className="goto-page-btn"
          onClick={nextPage}
          disabled={!canNextPage}
        >
          Next
        </button>
        <button
          className="skip-page"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};
export default TableFooter;
