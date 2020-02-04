import React from "react";
import { NavLink, withRouter } from "react-router-dom";
const Navbar = props => {
  return (
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
          activeClassName={props.location.pathname === "/cart" ? "active" : ""}
        >
          <span>&#128717;</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default withRouter(Navbar);
