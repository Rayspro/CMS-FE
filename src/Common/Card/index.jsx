import React from "react";
import "./style.scss";

function Card({ children, width, height }) {
  return <div className="card-root" style={{width:width,height:height}}>{children}</div>;
}

Card.defaultProps = {
    width:"100%",
    height:"100%"
}

export default Card;
