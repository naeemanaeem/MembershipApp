import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 500);

  return (
    <div
      style={{
        margin: 15,
        fontWeight: "bold",
        color: "#1941e3",
      }}
    >
      Search: {"   "}
      {/* <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} /> */}
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};
export default GlobalFilter;
