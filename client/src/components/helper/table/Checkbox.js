import React from "react";
import Classes from "./checkbox.module.css";
export const Checkbox = React.forwardRef(
  ({ indeterminate, className, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;
    const styles = Classes.label + " " + className;
    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <label className={styles}>
        <input type="checkbox" ref={resolvedRef} {...rest} />
        <span></span>
        Toggle All
      </label>
    );
  }
);
