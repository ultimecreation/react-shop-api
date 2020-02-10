import React, { Component } from "react";
import { UserContext } from "../../Context/UserContext";
import { Route, Redirect } from "react-router-dom";

export default class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const { isAuthenticated } = this.context;

    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} user={this.context.user} />
          ) : (
            <Redirect to="/connexion" />
          )
        }
      ></Route>
    );
  }
}
ProtectedRoute.contextType = UserContext;
