import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { UserConsumer } from "../Context/UserContext";
import { CartConsumer } from "../Context/CartContext";
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

        <CartConsumer>
          {cartState => (
            <NavLink
              to="/cart"
              activeClassName={
                props.location.pathname === "/cart" ? "active" : ""
              }
            >
              <span>
                &#128717;<small>({cartState.itemsCount})</small>
              </span>
            </NavLink>
          )}
        </CartConsumer>

        <NavLink
          to="/mon-compte"
          activeClassName={
            props.location.pathname === "/mon-compte" ? "active" : ""
          }
        >
          Mon Compte
        </NavLink>
      </nav>
    </div>
  );
};

export default withRouter(Navbar);
