import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export default class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const token = localStorage.getItem("token");

    return (
      <Route
        {...rest}
        render={props =>
          token ? (
            <Component {...props} user={this.context.user} />
          ) : (
            <Redirect to="/connexion" />
          )
        }
      ></Route>
    );
  }
}
