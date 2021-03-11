import React, { useState, useEffect } from "react";
import "./style.scss";
import google from "../../Assets/google.svg";
import { email, password } from "../../utils/validation.util";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import {
  varifyGUser,
  initNormalLogin,
  defaultSet,
} from "../../Redux/actions/user.action";

function Login({
  history,
  varifyGUser,
  loginStatus,
  initNormalLogin,
  loading,
  err,
  errMsg,
  defaultSet,
}) {
  const [load, setLoad] = useState(false);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function goToLogin() {
    history.push("/Register");
  }

  useEffect(() => {
    console.log(errMsg);
    setMsg({ msg: errMsg, color: "red" });
    setLoad(false)
  }, [err]);

  useEffect(() => {
    setLoad(loading);
  }, [loading]);

  useEffect(() => {
    clear();
    defaultSet();
    return;
  }, []);

  useEffect(() => {
    if (!!localStorage.getItem("token") && loginStatus) {
      history.push("/");
    }
  }, [loginStatus]);

  function change(e) {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  function clear() {
    setMsg({
      ...msg,
      msg: "",
    });
  }

  async function login() {
    setLoad(true);
    try {
      await email(data.email);
      await password(data.password);
      initNormalLogin(data.email, data.password);
    } catch (err) {
      if (err.hasOwnProperty("msg")) {
        setMsg({
          ...msg,
          msg: err.msg,
          color: "red",
        });
      } else {
        setMsg({
          ...msg,
          msg: "Registration Failed",
          color: "red",
        });
      }
      setLoad(false);
    }
  }

  function gSignIn(res) {
    varifyGUser(res.tokenId);
  }

  return (
    <div className="login-root">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <div className="login-form">
            <h1>Login</h1>
            <div className="social-container">
              <GoogleLogin
                clientId="901733398463-b4jegmu71643b8k6s2ilbnb5uoliivlp.apps.googleusercontent.com"
                render={(renderProps) => (
                  <div className="social">
                    <img
                      src={google}
                      className="fab fa-google-plus-g"
                      alt="Google"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    ></img>
                  </div>
                )}
                buttonText="Login"
                onSuccess={gSignIn}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div className="error" style={{ color: msg.color }}>
              {msg.msg}
            </div>
            <span></span>
            <input
              type="email"
              value={data.email}
              name="email"
              onFocus={clear}
              onChange={change}
              placeholder="Email"
            />
            <input
              type="password"
              value={data.password}
              name="password"
              onFocus={clear}
              onChange={change}
              placeholder="Password"
            />
            <button disabled={load} onClick={login}>
              {load ? <div className="load-circle" /> : "Login"}
            </button>
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={goToLogin} className="ghost">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapsDataToProps = (state) => {
  return {
    loginStatus: state.user.login,
    loading: state.user.loading,
    err: state.user.err,
    errMsg: state.user.errMsg,
  };
};

export default connect(mapsDataToProps, {
  varifyGUser,
  initNormalLogin,
  defaultSet,
})(Login);
