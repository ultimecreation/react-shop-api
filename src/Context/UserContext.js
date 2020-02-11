import React, { Component } from "react";

export const UserContext = React.createContext();
UserContext.displayName = "User";

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
      user: {}
    };
    this.setToken = this.setToken.bind(this);
  }
  componentDidMount() {
    this.getTokenData();
  }
  getTokenData() {
    if (localStorage.getItem("token") !== null) {
      let token = JSON.parse(localStorage.getItem("token"));
      const userData = JSON.parse(atob(token.split(".")[1]));
      const timestamp = new Date().getTime() / 1000;

      if (userData.exp - timestamp > 0) {
        this.setState({ isAuthenticated: true, user: userData.user });
      } else {
        this.setState({ isAuthenticated: false, user: {} });
        localStorage.removeItem("token");
      }
    }
  }
  setToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
    this.getTokenData();
  }
  render() {
    const userState = {
      ...this.state,
      setToken: this.setToken
    };

    return (
      <UserContext.Provider value={userState}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const UserConsumer = UserContext.Consumer;
