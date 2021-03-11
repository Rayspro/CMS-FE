import React from "react";
import "./style.scss"

function Loader(){
    return (<div className="info-root">
        <div className="load"></div>
        <span className="sp2">Loading</span>
        <span className="sp1">Loading your post</span>
    </div>)
}

export default Loader;