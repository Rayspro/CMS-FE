import React, { useEffect } from "react";
import "./style.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";

function Dashboard({ children, login, history }) {

  useEffect(()=>{
   if(!login){
     history.push("/")
   }
  },[login])

  return (
    <>
      <div className="private-root">
        <div className="full-width">
          {children}
        </div>
      </div>
    </>
  );
}

const mapDataToProps = state => {
  return {
    login:state.user.login
  }
}

export default connect(mapDataToProps)(withRouter(Dashboard));