import React from "react";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ component, path, ...rest }) {
  let token = localStorage.getItem("token");
  return !!token ? (
    <Redirect to="/" />
  ) : (
    <Route path={path} {...rest} component={component} />
  );
}

export default PublicRoute;
