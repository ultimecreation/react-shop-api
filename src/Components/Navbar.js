import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { UserConsumer } from "../Context/UserContext";
const Navbar = (props, context) => {
  console.log(props, context);
  return (
    <UserConsumer>
      {userState => (
        <div className="main-nav ">
          <div className="brand">
            <p>
              <strong>React Shop Api</strong>
            </p>
          </div>
          <nav>
            <NavLink
              to="/"
              activeClassName={props.location.pathname === "/" ? "active" : ""}
            >
              Boutique
            </NavLink>

            <NavLink
              to="/cart"
              activeClassName={
                props.location.pathname === "/cart" ? "active" : ""
              }
            >
              <span>&#128717;</span>
            </NavLink>
            {!userState.isAuthenticated && (
              <NavLink
                to="/connexion"
                activeClassName={
                  props.location.pathname === "/connexion" ? "active" : ""
                }
              >
                Connexion
              </NavLink>
            )}
            {userState.isAuthenticated && (
              <NavLink
                to="/dashboard"
                activeClassName={
                  props.location.pathname === "/dashboard" ? "active" : ""
                }
              >
                Mon Compte
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </UserConsumer>
  );
};

export default withRouter(Navbar);
