import React from "react";
import "./ExportData.css";
const ExportData = (props) => {
  return (
    <div id="exportData">
      <button
        className="btn-export"
        onClick={() => {
          props.exportData("csv", true);
        }}
      >
        Export All as CSV
      </button>
      <button
        className="btn-export"
        onClick={() => {
          props.exportData("csv", false);
        }}
      >
        Export Current View as CSV
      </button>
      <button
        className="btn-export"
        onClick={() => {
          props.exportData("xlsx", true);
        }}
      >
        Export All as xlsx
      </button>
      <button
        className="btn-export"
        onClick={() => {
          props.exportData("xlsx", false);
        }}
      >
        Export Current View as xlsx
      </button>
      <button
        className="btn-export"
        onClick={() => {
          props.exportData("pdf", true);
        }}
      >
        Export All as PDF
      </button>{" "}
      <button
        className="btn-export"
        onClick={() => {
          props.exportData("pdf", false);
        }}
      >
        Export Current View as PDF
      </button>
    </div>
  );
};
export default ExportData;
