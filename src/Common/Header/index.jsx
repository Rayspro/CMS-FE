import React, { useState, useEffect } from "react";
import "./style.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { logout } from "../../Redux/actions/user.action";

function Header(props) {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    setLogin(!!token);
  }, [localStorage.getItem("token")]);

  function logout() {
    props.logout();
    props.history.push("/");
  }

  function loginPage() {
    props.history.push("/Login");
  }

  function registerPage() {
    props.history.push("/Register");
  }

  function create() {
    props.history.push("/create");
  }

  function home() {
    props.history.push("/");
  }

  return (
    <div className="header-root">
      <span onClick={home} className="logo">
        CMS
      </span>
      <div className="right-header">
        <span onClick={loginPage} style={{ display: login ? "none" : "block" }}>
          Login
        </span>
        <span onClick={create} style={{ display: !login ? "none" : "block" }}>
          Create Post
        </span>
        <span onClick={logout} style={{ display: !login ? "none" : "block" }}>
          Logout
        </span>
        <span
          onClick={registerPage}
          style={{ display: login ? "none" : "block" }}
        >
          Register
        </span>
      </div>
    </div>
  );
}

const mapsDataToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapsDataToProps, { logout })(withRouter(Header));
