import React from "react";
import classes from "./Checkbox.module.css";
const Checkbox = (props) => {
  const styles = classes.label + " " + props.className;
  return (
    <div>
      <label className={styles}>
        <input type="checkbox" {...props} />
        <span></span>
        <input
          type="text"
          {...props}
          value={props.name}
          readOnly
          style={{
            border: "2px solid grey",
            padding: "15px",
            width: "60vw",
            fontSize: "1.5em",
            paddingLeft: "80px",
            height: "40px",
            marginBottom: "10px",
            color: "blue",
            fontFamily: "robo",
          }}
        />
      </label>
    </div>
  );
};
export default Checkbox;
