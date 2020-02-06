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
      // Congratulation, it came here means everything's fine!
      console.log(payment, "The payment was succeeded!");
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
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
            currency={"EUR"}
            total={montant}
            onSuccess={onSuccess}
          />
        </section>
      </main>
    );
  }
}

export default Checkout;
Checkout.contextType = CartContext;
