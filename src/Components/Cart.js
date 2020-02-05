import React, { Component } from "react";
import { CartContext, CartConsumer } from "../Context/CartContext";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }
  handleAddToCart(item) {
    this.context.addToCart(item);
  }
  handleRemoveFromCart(item, cartIndex) {
    this.context.removeFromCart(item, cartIndex);
  }
  render() {
    return (
      <CartConsumer>
        {cartState => {
          const { cartItems, addToCart } = { ...cartState };
          console.log(cartItems);
          return (
            <main id="cart-validation">
              <header>
                <h1>Détails du Panier </h1>
              </header>
              <section>
                <form>
                  {cartItems.map((item, cartIndex) => (
                    <div className="form-group" key={item.id}>
                      <p>
                        <input
                          type="text"
                          name="itemTitle"
                          value={item.title}
                          disabled
                        />
                      </p>
                      <p className="count">
                        <span onClick={this.handleAddToCart.bind(this, item)}>
                          +
                        </span>
                        <input
                          type="text"
                          name="itemCount"
                          value={item.count}
                          disabled
                        />
                        <span
                          onClick={this.handleRemoveFromCart.bind(
                            this,
                            item,
                            cartIndex
                          )}
                        >
                          -
                        </span>
                      </p>
                      <p>
                        <input
                          type="text"
                          name="itemPrice"
                          value={item.count * item.price}
                          disabled
                        />
                      </p>
                    </div>
                  ))}
                </form>
              </section>
            </main>
          );
        }}
      </CartConsumer>
    );
  }
}
Cart.contextType = CartContext;
