import React, { useMemo, useState, useRef } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { GROUPED_COLUMNS } from "./helper/table/columns";
import GlobalFilter from "./helper/table/GlobalFilter";
import { useExportData } from "react-table-plugins";
import Papa from "papaparse"; //JSON to CSV
import { Checkbox } from "./helper/table/Checkbox";
import XLSX from "xlsx";
import JsPDF from "jspdf";
import "jspdf-autotable";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Member from "./member.jsx";
// import "./css_stuff/paginationtable.css";
import FormControl from "react-bootstrap/FormControl";
import Classes from "./PaginationTable.module.css";

const MembersTable = (props) => {
  const columns = useMemo(() => GROUPED_COLUMNS, []); // table headers
  const filterRef = useRef();

  // const data = useMemo(() => props.data, [props.data]); // table data
  // const memberData = props.data.filter(
  //   (member) => member.Guardians.length === 0
  // );
  // const data = useMemo(() => memberData, [memberData]);
  const data = useMemo(() => {
    const membersData = props.data.filter(
      (member) => member.Guardians.length === 0
    );
    return membersData;
  }, [props.data]);
  const [showFilters, setShowFilters] = useState(false);
  const arrowIcon = showFilters ? (
    <div className={Classes.arrow_icon}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="black"
        class="bi bi-chevron-up"
        viewBox="1.5 0 16 16"
        onClick={() => {
          setShowFilters(false);
          filterRef.current.style.display = "none";
        }}
      >
        <path
          fill-rule="evenodd"
          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
        />
      </svg>
    </div>
  ) : (
    <div className={Classes.arrow_icon}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="black"
        class="bi bi-chevron-down"
        viewBox="1.5 0 16 16"
        onClick={() => {
          setShowFilters(true);
          filterRef.current.style.display = "block";
        }}
      >
        <path
          fill-rule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </div>
  );

  function getExportFileBlob({ columns, data, fileType, fileName }) {
    if (fileType === "csv") {
      // CSV example
      const headerNames = columns.map((col) => col.exportValue);
      const csvString = Papa.unparse({ fields: headerNames, data });
      return new Blob([csvString], { type: "text/csv" });
    } else if (fileType === "xlsx") {
      // XLSX example

      const header = columns.map((c) => c.exportValue);
      const compatibleData = data.map((row) => {
        const obj = {};
        header.forEach((col, index) => {
          obj[col] = row[index];
        });
        return obj;
      });

      let wb = XLSX.utils.book_new();
      let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
        header,
      });
      XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
      XLSX.writeFile(wb, `${fileName}.xlsx`);

      // Returning false as downloading of file is already taken care of
      return false;
    }
    //PDF example
    if (fileType === "pdf") {
      const headerNames = columns.map((column) => column.exportValue);
      const doc = new JsPDF();
      doc.autoTable({
        head: [headerNames],
        body: data,
        margin: { top: 10, bottom: 10 },

        styles: {
          minCellHeight: 15,
          halign: "left",
          valign: "center",

          fontSize: 8,
        },
      });
      doc.save(`${fileName}.pdf`);

      return false;
    }

    // Other formats goes here
    return false;
  }

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
      initialState: { pageIndex: 0, pageSize: 5 },

      getExportFileBlob,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useExportData
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
    allColumns,
    getToggleHideAllColumnsProps,
    exportData,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  // To Just send certain number of rows to the server
  // from the table we can use following code to slice rows from page
  // and then use those in place of using rows or page in table.

  // const firstPageRows = rows.slice(0, 10);
  return (
    <React.Fragment>
      <div className={Classes.navbar}>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

        <FormControl
          as="select"
          value="EXPORT"
          className={Classes.export_table}
          onChange={(e) => {
            if (e.target.value === "allcsv") {
              exportData("csv", true);
            } else if (e.target.value === "curcsv") {
              exportData("csv", false);
            } else if (e.target.value === "allxlsx") {
              exportData("xlsx", true);
            } else if (e.target.value === "curxlsx") {
              exportData("xlsx", false);
            } else if (e.target.value === "allpdf") {
              exportData("pdf", true);
            } else if (e.target.value === "curpdf") {
              exportData("pdf", false);
            }
          }}
        >
          <option value="EXPORT">EXPORT</option>
          <option value="allcsv">Export All as CSV</option>
          <option value="curcsv">Export Current View as CSV</option>
          <option value="allxlsx">Export All as xlsx</option>
          <option value="curxlsx">Export Current View as xlsx</option>
          <option value="allpdf">Export All as PDF</option>
          <option value="curpdf">Export Current View as PDF</option>
        </FormControl>

        <div>
          <div className={Classes.filter_container}>
            <text className={Classes.filter_text}>Filter Columns</text>
            {arrowIcon}
          </div>
          <div className={Classes.checkbox_container} ref={filterRef}>
            <Checkbox
              className="ml-4 mt-3 mr-1 mb-1"
              {...getToggleHideAllColumnsProps()}
            />
            ToggleAll
            {allColumns.map((column) =>
              column.checked ? (
                <div key={column.id}>
                  <Form.Check
                    type="checkbox"
                    label={column.Header}
                    id={column.Header + "check"}
                    className="ml-4 mr-5 mb-1"
                    {...column.getToggleHiddenProps()}
                  />
                </div>
              ) : null
            )}
          </div>
        </div>
        {/* <Button variant="dark" onClick={props.handleAddNewMember}>
          Add Member
        </Button> */}
      </div>

      <table
        // className="table"
        className={Classes.table}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className={Classes.tr} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) =>
                document.getElementById(column.Header + "check") &&
                column.checked ? (
                  <th
                    className={Classes.table_head}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {/* Apply Filter on column */}
                    {/* <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div> */}
                    {/*TOOK OUT FILTERS IN EACH COLUMN HERE*/}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? "⬇️"
                          : "⬆️"
                        : ""}
                    </span>
                  </th>
                ) : null
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr className={Classes.tr} {...row.getRowProps()}>
                {row.cells.map((cell) =>
                  cell.column.checked &&
                  cell.column.Header !== "View Member" ? (
                    <td className={Classes.td} {...cell.getCellProps}>
                      {cell.render("Cell")}
                    </td>
                  ) : cell.column.Header === "View Member" ? (
                    <Member
                      key={row.original._id}
                      member={row.original}
                      handleMemberEdit={props.updateMember}
                      isNewDep={false}
                    />
                  ) : null
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={Classes.page_container}>
        <div className={Classes.go_to_page}>
          <Button
            size="sm"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            style={{
              fontWeight: "bold",
            }}
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {"<"}
          </Button>

          <div>
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <span>
              {" "}
              | Go to Page:{" "}
              <input
                className={Classes.page_input}
                type="number"
                defaultValue={pageIndex + 1}
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

            <Button
              variant="secondary"
              size="sm"
              onClick={nextPage}
              disabled={!canNextPage}
            >
              {">"}
            </Button>
          </div>
          <Button
            size="sm"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>
        </div>
        <div>
          <select
            className={Classes.page_select}
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Records: {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MembersTable;
