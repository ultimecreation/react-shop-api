import React, { Component } from "react";
import { UserContext } from "../Context/UserContext";
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
      user: {},
      orders: []
    };
    this.logout = this.logout.bind(this);
  }

  getMyOrders() {
    const { email } = this.context.user;
    fetch("https://shop-api.frameworks.software/api/v1/ordres/mes-ordres", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ email: email })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => {
        this.setState(() => ({
          orders: data
        }));
      })
      .catch(err => console.log(err));
  }
  logout() {
    localStorage.removeItem("token");
    this.props.history.push("/");
  }
  render() {
    this.getMyOrders();
    const { orders } = this.state;
    return (
      <main id="orders-summary">
        <header>
          <h1>Mes Ordres</h1>
          <p onClick={this.logout}>Déconnexion</p>
        </header>

        <section>
          {orders.length > 0 &&
            orders.map((order, orderIndex) => (
              <article key={orderIndex}>
                <p>
                  Achat du:
                  <span>{order.created_at} </span>
                </p>
                <p>
                  Status:{" "}
                  <small> {order.payment_status ? "Payé" : "Inconnu"} </small>
                </p>
                <p>
                  ID:
                  <small>{order.payment_id} </small>
                </p>
                <details>
                  <summary>Voir le détail</summary>
                  <p key="-1">
                    <span>Produit</span>
                    <span>Taille</span>
                    <span>Qté</span>
                    <span>Prix</span>
                  </p>
                  <hr />
                  {order.lines.map((line, index) => (
                    <p key={index}>
                      <span>{line.product_title}</span>
                      <span>{line.product_size} </span>
                      <span>{line.product_count} </span>
                      <span>{line.product_price} </span>
                    </p>
                  ))}
                </details>
              </article>
            ))}
        </section>
      </main>
    );
  }
}
Dashboard.contextType = UserContext;
