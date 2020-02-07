import React, { Component } from "react";
import { CartContext } from "../Context/CartContext";
import PaypalExpressBtn from "react-paypal-express-checkout";
export class Checkout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const validatedCart = this.context.getValidatedCart("validatedCart");
    const client = {
      sandbox:
        "ARfF7X6QHlMiDMt-dQSu4Xi0cz5u7vQm55mRI3EmZkf5S7XFlds_EkoMu2U0tC77S1TNoPtdZF8q9Ar1",
      production: "YOUR-PRODUCTION-APP-ID"
    };
    const onSuccess = payment => {
      fetch("http://localhost/shop-api/api/v1/ordres/creer", {
        method: "POST",
        body: JSON.stringify({
          paymentStatus: payment.paid,
          paymentId: payment.paymentID,
          validatedCart: validatedCart
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === "success") {
            this.props.history.push("/");
          }
        });
    };

    const montant = validatedCart.reduce(
      (sum, item) => (sum += item.itemPrice * item.itemCount),
      0
    );

    return (
      <main id="checkout">
        <header>
          <h1>Régler ma commande</h1>
        </header>
        <section>
          <ul className="item-line__header">
            <li>Désignation</li>
            <li>Taille</li>
            <li>Qté x PU</li>
            <li>Total</li>
          </ul>
          {validatedCart.map((item, index) => (
            <ul className="item-line" key={index}>
              <li>{item.itemTitle}</li>
              <li>{item.selectedSize}</li>
              <li>
                {item.itemCount}x {item.itemPrice}
              </li>
              <li>{item.itemCount * item.itemPrice}</li>
            </ul>
          ))}
          <h3>
            Montant à régler:{" "}
            {montant.toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR"
            })}
          </h3>
          <PaypalExpressBtn
            client={client}
            currency="EUR"
            total={montant.toFixed(2)}
            onSuccess={onSuccess}
          />
        </section>
      </main>
    );
  }
}

export default Checkout;
Checkout.contextType = CartContext;
