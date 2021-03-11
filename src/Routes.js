import React, {useEffect} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Private from "./PrivateRoutes";
import Public from "./PublicRoutes";
import Login from "./Pages/Login/index";
import Register from "./Pages/Register/index";
import Home from "./Pages/Home/index";
import "./style.scss";
import Header from "./Common/Header/index";
import NewPost from "./Pages/NewPost/index";
import SinglePost from "./Pages/SinglePost/index";
import { connect } from "react-redux";
import { getAllPost } from "./Redux/actions/category.action";

function Routes({getAllPost}) {

  useEffect(()=>{
    getAllPost()
  },[])

  return (
    <div className="Routes">
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Public path="/Login" component={Login} />
          <Public path="/Register" component={Register} />
          <Private path="/create" component={NewPost}/>
          <Route path="/single" component={SinglePost} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default connect(null,{getAllPost})(Routes);