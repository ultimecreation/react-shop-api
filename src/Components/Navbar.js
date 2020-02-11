import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { CartConsumer } from "../Context/CartContext";
const Navbar = props => {
  let token = localStorage.getItem("token");

  return (
    <div className="main-nav ">
      <div className="brand">
        <NavLink to="/">
          {" "}
          <strong>React Shop Api</strong>
        </NavLink>
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
              to={token === null ? "/connexion" : "/commande"}
              activeClassName={
                props.location.pathname === "/commande" ? "active" : ""
              }
            >
              <span>
                &#128717;
                <small>({cartState.itemsCount})</small>
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
