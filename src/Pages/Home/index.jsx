import React, { useState, useEffect } from "react";
import "./style.scss";
import Card from "../../Common/Card/index";
import { connect } from "react-redux";
import imgCard from "../../Assets/card.png";
import { getAllPost } from "../../Redux/actions/post.action";
import Loader from "../../Common/Loader/index";
import axios from "axios";
import { SERVER_ENDPOINT } from "../../server.config";

function Home(props) {
  const [cat, setCat] = useState([]);
  const [post, setPost] = useState([]);
  const [select, setSelect] = useState(null);

  useEffect(() => {
    axios.get(`${SERVER_ENDPOINT}`)
    
    props.getAllPost();
    setCat([...props.cat.categories]);
  }, [props.cat.categories]);

  function singlePost(id) {
    props.history.push({
      pathname: "/single",
      state: id,
    });
  }

  useEffect(() => {
    if (select != null) {
      let newData = props.allPost.post.filter((d) => {
        if (d.category._id === select) {
          return true;
        } else {
          return false;
        }
      })
      setPost([...newData]);
    } else {
      setPost([...props.allPost.post]);
    }
  }, [select,props.allPost]);

  function filter(id) {
    setSelect(id);
  }

  return props.allPost.loading?<Loader/>:(
    <div className="root-home">
      <div className="category-home">
        <div onClick={() => filter(null)}className={select===null?"item-active":"item"}>All</div>
        {cat.map((d, i) => (
          <div onClick={() => filter(d._id)} key={d._id} className={select===d._id?"item-active":"item"}>
            {d.name}
          </div>
        ))}
      </div>
      <div className="grid-container">
        {post.map((d) => (
          <Card key={d._id} className="grid-item" width="300px" height="400px">
            <div className="lg-root">
              <div className="head">
                <div className="img-back" />
                <div className="head-type">{d.category.name}</div>
              </div>
              <div className="head-content">
                <div className="bold-data">{d.title.slice(0, 50)}</div>
                <p>{d.des.slice(0, 60)}</p>
                <div onClick={() => singlePost(d._id)} className="link">
                  Continue Reading
                </div>
              </div>
            </div>
          </Card>
        ))}
        {!post.length>0?<div className="noPost">No Post</div>:""}
      </div>
    </div>
  );
}

Home.defaultProps = {
  img: imgCard,
};

const mapsDataToProps = (state) => {
  return {
    cat: state.categoey,
    allPost: state.post,
  };
};

export default connect(mapsDataToProps, { getAllPost })(Home);
