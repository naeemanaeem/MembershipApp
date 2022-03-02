import React from "react";
import Carousel from "react-bootstrap/Carousel";
import slide_vol from "./imgs/community-work-day-flat-vector-illustration.jpg";
import slide_act from "./imgs/act.jpeg";

const SlideShow = (props) => {
  return (
    <Carousel.Item>
      <img
        //className="d-block w-100"
        style={{
          width: "1950px",
          height: "350px",
        }}
        src={props.image}
        alt={props.alt}
      />
      <Carousel.Caption>
        <h3>{props.title}</h3>
        <p>{props.description}.</p>
      </Carousel.Caption>
    </Carousel.Item>
  );
};
export default SlideShow;

