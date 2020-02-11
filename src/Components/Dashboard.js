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
  }

  getMyOrders() {
    const { email } = this.context.user;
    fetch("http://localhost/shop-api/api/v1/ordres/mes-ordres", {
      method: "POST",
      body: JSON.stringify({ email: email })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status, "pas ok");
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
  render() {
    this.getMyOrders();
    const { orders } = this.state;
    return (
      <main id="orders-summary">
        <header>
          <h1>Mes Ordres</h1>
        </header>
        <section>
          {orders.length > 0 &&
            orders.map(order => (
              <article key={orders.id}>
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
