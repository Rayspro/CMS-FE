import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { options } from "./driver";
import { connect } from "react-redux";
import axios from "axios";
import { nullValidation } from "../../utils/validation.util";
import { SERVER_ENDPOINT } from "../../server.config";

function NewPost({ categories, history }) {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [type, setType] = useState(0);
  const [cat, setCat] = useState([]);
  const [err, setError] = useState({ msg: "", color: "" });
  const [load, setLoad] = useState(false);
  const [postcreation, setPostCreation] = useState(false);

  useEffect(() => {
    setCat([...categories]);
  }, [categories]);

  async function createPost() {
    try {
      setLoad(true);
      await nullValidation("Description", des);
      await nullValidation("Title", title);
      await nullValidation("Category", type);
      await axios.post(`${SERVER_ENDPOINT}/post/create`, {
        body: editor.current.editor.getContents(),
        title: title,
        des: des,
        catId: type,
      },{headers:{token:localStorage.getItem("token")}});
      setPostCreation(true);
      setLoad(false);
    } catch (err) {
      setLoad(false);
      if (!!err.msg) {
        setError({ msg: err.msg, color: "red" });
        setTimeout(() => {
          setError({ msg: "", color: "" });
        }, 3000);
      }
      console.log(err);
    }
  }

  return postcreation ? (
    <CompleteOverlay {...history} />
  ) : (
    <div className="create">
      <div className="create-head">
        <span style={{ color: err.color }}>{err.msg}</span>
        <button disabled={load} onClick={createPost}>
          {load ? <div className="load-circle" /> : "Create Post"}
        </button>
      </div>
      <input
        className="title"
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Enter your blog title..."
      />
      <textarea
        className="des"
        onChange={(e) => setDes(e.target.value)}
        type="text"
        placeholder="Enter your blog description..."
      />
      <select value={type} onChange={(e)=>setType(e.target.value)}>
        <option value={0}> Select Category</option>
        {cat.map((d, i) => (
          <option value={d._id} key={i}>
            {d.name}
          </option>
        ))}
      </select>
      <SunEditor ref={editor} setOptions={options} />
    </div>
  );
}

function CompleteOverlay({push}) {
  function post() {
    push("/");
  }

  return (
    <div className="complete-overlay">
      <h1>Post create sucessfully</h1>
      <button onClick={post}>Go to post</button>
    </div>
  );
}

const mapsDataToProps = (state) => {
  return {
    categories: state.categoey.categories,
  };
};

export default connect(mapsDataToProps, null)(NewPost);
