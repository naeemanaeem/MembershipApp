import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
// import MOCK_DATA from "./Data/MOCK_DATA.json";
import { GROUPED_COLUMNS } from "./Data/columns";
import "./PaginationTable.css";
import GlobalFilter from "./GlobalFilter";
import ColumnFilter from "./ColumnFilter";
import { useExportData } from "react-table-plugins";
import Papa from "papaparse"; //JSON to CSV
import { Checkbox } from "./Checkbox"; // column filteration
import XLSX from "xlsx";
import JsPDF from "jspdf";
import "jspdf-autotable";
import ExportData from "./ExportData";
import TableFooter from "./TableFooter";
// import SelectFilter from "./SelectFilter";

const PaginationTable = (props) => {
  const columns = useMemo(() => GROUPED_COLUMNS, []); // table headers

  // const data = useMemo(() => MOCK_DATA, []); // table data
  const data = useMemo(() => props.members, [props.members]); // table data
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

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
          // minCellHeight: 9,
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
      initialState: { pageIndex: 0 },
      defaultColumn,
      getExportFileBlob,
    },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useExportData
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
    allColumns,
    getToggleHideAllColumnsProps,
    exportData,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <React.Fragment>
      <ExportData exportData={exportData} />
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div id="main">
        <div className="checkbox-filter">
          <div className="filters-checkbox">
            <Checkbox id="toggle-all" {...getToggleHideAllColumnsProps()} />
            <label htmlFor="toggle-all">ToggleAll</label>
          </div>
          {allColumns.map((column) => (
            // <div key={column.id}>
            <div key={column.Header} className="filters-checkbox">
              <input
                type="checkbox"
                id={column.Header}
                {...column.getToggleHiddenProps()}
              />

              <label htmlFor={column.Header}> {column.Header}</label>
            </div>
          ))}
        </div>
        <div id="table">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {/* Apply Filter on column */}
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "⬇️"
                            : "⬆️"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, i) => (
                      <td key={i} {...cell.getCellProps}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
            <tfoot></tfoot>
          </table>
          <TableFooter
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            pageCount={pageCount}
            gotoPage={gotoPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            nextPage={nextPage}
            canNextPage={canNextPage}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaginationTable;
