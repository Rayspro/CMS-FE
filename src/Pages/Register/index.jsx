import React, { useEffect, useState } from "react";
import "./style.scss";
import axios from "axios";
import { SERVER_ENDPOINT } from "../../server.config";
import { email, password, nullValidation } from "../../utils/validation.util";

const SERVER = SERVER_ENDPOINT;

function Register({ history }) {
  const [load, setLoad] = useState(false);
  const [msg, setMsg] = useState({ msg: "", color: "green" });
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const header = {
    headers: {
      device: "web",
    },
  };

  async function goToSignUp() {
    history.push("/Login");
  }

  function clear() {
    setMsg({
      ...msg,
      msg: "",
    });
  }

  useEffect(() => {
    clear();
  }, []);

  async function signUp() {
    setLoad(true);
    try {
      await nullValidation("Name", data.name);
      await email(data.email);
      await password(data.password);
      let res = await axios.post(`${SERVER}/auth/Register`, data, header);
      setMsg({msg:res.data.msg,color:"green"})
      setLoad(false);
    } catch (err) {
      console.log(err);
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

  function change(e) {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="register-root">
      <div className="secondry-reg-panel">
        <div className="panel-reg-left">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button onClick={goToSignUp} className="ghost" id="signIn">
              Sign In
            </button>
          </div>
        </div>
        <div className="panel-reg-right">
          <div className="sign-up-form">
            <h1>Create Account</h1>
            <div className="error" style={{ color: msg.color }}>
              {msg.msg}
            </div>
            <span></span>
            <input
              type="text"
              name="name"
              onFocus={clear}
              onChange={change}
              placeholder="Name"
            />
            <input
              type="email"
              onFocus={clear}
              name="email"
              onChange={change}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              onFocus={clear}
              onChange={change}
              placeholder="Password"
            />
            <button disabled={load} onClick={signUp}>
              {load ? <div className="load-circle" /> : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
