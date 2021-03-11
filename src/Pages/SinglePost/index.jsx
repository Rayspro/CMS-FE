import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import { SERVER_ENDPOINT } from "../../server.config";
import parse from "html-react-parser";
import Loader from "../../Common/Loader/index";

function SinglePost(props) {
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [com, setCom] = useState("");
  const [allCom, setAllCom] = useState([]);
  const [load, setLoad] = useState(false);
  const [loadComment, setLoadComment] = useState(false);

  useEffect(() => {
    setLoad(true);
    axios
      .get(`${SERVER_ENDPOINT}/post/getSinglePost/${props.location.state}`)
      .then((d) => {
        setHtml(d.data.body);
        setTitle(d.data.title);
        setAuthor(d.data.author.name)
        setAllCom([...d.data.comment]);
        setLoad(false);
      });
  }, []);

  async function post() {
    if (!com.length > 0) {
      return;
    }
    setLoadComment(true);
    try {
      const res = await axios.post(
        `${SERVER_ENDPOINT}/post/createComment`,
        { comment: com, postId: props.location.state },
        { headers: { token: localStorage.getItem("token") } }
      );

      setAllCom([...allCom, res.data]);
      setCom("");
      setLoadComment(false);
    } catch (err) {
      setLoadComment(false);
    }
  }

  return load ? (
    <Loader />
  ) : (
    <div className="single-root">
      <div>
        <div className="title">{title}</div>
        <div>{parse(html)}</div>
        <div className="single-dot">***</div>
        <div className="single-author">
          <span>{author}</span>
          <span>Author</span>
        </div>
      </div>
      <div className="comment">
        <div className="input">
          <textarea
            value={com}
            onChange={(e) => setCom(e.target.value)}
            placeholder="Write your comment"
          />
          <div className="btn-comment">
            <button disabled={loadComment} onClick={post}>
              {loadComment ? <div className="load-circle" /> : "Post"}
            </button>
          </div>
        </div>
        <div className="post-comment">
          {allCom.map((d) => (
            <div className="post-box">
              <div className="post-round">{d.user.name[0]}</div>
              <div className="post-con">
                <span>{d.user.name}</span>
                <span>{d.comment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
