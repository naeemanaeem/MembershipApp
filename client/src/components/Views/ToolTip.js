import React from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
const RenderTooltip = (props) => {
  return (
    <OverlayTrigger
      key={props.id}
      placement={props.placement}
      overlay={
        <Tooltip id={props.id}>
          <strong>{props.tooltip}</strong>
        </Tooltip>
      }
    >
      {props.children}
    </OverlayTrigger>
  );
};
export default RenderTooltip;
