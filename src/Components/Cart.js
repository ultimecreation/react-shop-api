import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CartContext, CartConsumer } from "../Context/CartContext";
export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      validatedCart: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddToCart(item) {
    this.context.addToCart(item);
  }
  handleRemoveFromCart(item, cartIndex) {
    this.context.removeFromCart(item, cartIndex);
  }
  handleDeleteFromCart(cartIndex) {
    this.context.deleteFromCart(cartIndex);
  }
  handleSubmit(e) {
    e.preventDefault();
    let formGroups = document.querySelectorAll(".form-group");
    let errors = [];
    formGroups.forEach((formGroup, i) => {
      let validatedCart = this.state.validatedCart;

      if (formGroup.children[2].children[0].value === "") {
        errors.push(
          `la taille n'a pas été confirmée pour: ${formGroup.children[1].children[0].value}`
        );
        this.setState({ errors });
        return errors;
      }

      if (
        validatedCart.find(
          registeredItem =>
            registeredItem.itemId === formGroup.children[0].children[0].value &&
            registeredItem.itemCount !== formGroup.children[3].children[1].value
        )
      ) {
        validatedCart[i].itemCount = formGroup.children[3].children[1].value;
        return;
      }
      if (
        validatedCart.find(
          registeredItem =>
            registeredItem.itemId === formGroup.children[0].children[0].value
        )
      ) {
        errors["duplicate"] = ["duplicate"];
        return;
      } else {
        let currentItem = {};
        currentItem = {
          [formGroup.children[0].children[0].name]:
            formGroup.children[0].children[0].value,
          [formGroup.children[1].children[0].name]:
            formGroup.children[1].children[0].value,
          [formGroup.children[2].children[0].name]:
            formGroup.children[2].children[0].value,
          [formGroup.children[3].children[1].name]:
            formGroup.children[3].children[1].value,
          [formGroup.children[5].children[0].name]:
            formGroup.children[5].children[0].value
        };

        validatedCart.push(currentItem);
        this.setState({ validatedCart, errors: [] });
      }
      if (formGroups.length === validatedCart.length) {
        this.context.setValidatedCart(
          "validatedCart",
          this.state.validatedCart
        );
        this.props.history.push("/paiement");
      }
    });

    //
  }
  render() {
    let token;
    token = token ? localStorage.getItem("token") : null;
    return (
      <CartConsumer>
        {cartState => {
          const { cartItems } = { ...cartState };
          const { errors } = this.state;
          return (
            <main id="cart-validation">
              <header>
                <h1>Valider ma commande</h1>
              </header>
              {cartItems.length < 1 && (
                <section>
                  <p>Aucun article dans votre panier</p>
                </section>
              )}
              {cartItems.length > 0 && (
                <section>
                  {errors.length > 0 &&
                    errors.map((error, errorIndex) => {
                      return (
                        <p key={errorIndex} className="error-message">
                          {error}
                        </p>
                      );
                    })}
                  <form onSubmit={this.handleSubmit}>
                    {cartItems.map((item, cartIndex) => {
                      let sizesArr = [];
                      for (let key in item.availableSizes) {
                        sizesArr.push(item.availableSizes[key].size);
                      }

                      return (
                        <div className="form-group" key={item.id}>
                          <p>
                            <input
                              type="hidden"
                              name="itemId"
                              value={item.id}
                            />
                          </p>
                          <p>
                            <input
                              type="text"
                              name="itemTitle"
                              value={item.title}
                              disabled
                            />
                          </p>
                          <p>
                            <select name="selectedSize">
                              <option value="">taille</option>
                              {sizesArr.map((size, index) => (
                                <option key={index} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </p>
                          <p className="count">
                            <span
                              onClick={this.handleRemoveFromCart.bind(
                                this,
                                item,
                                cartIndex
                              )}
                            >
                              &#8861;
                            </span>
                            <input
                              type="text"
                              name="itemCount"
                              value={item.count}
                              disabled
                            />
                            <span
                              onClick={this.handleAddToCart.bind(this, item)}
                            >
                              &oplus;
                            </span>
                          </p>
                          <p>
                            <input
                              type="text"
                              name="itemPrice"
                              value={new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR"
                              }).format((item.count * item.price).toFixed(2))}
                              disabled
                            />
                          </p>
                          <p>
                            <input
                              type="hidden"
                              name="itemPrice"
                              value={item.price}
                              disabled
                            />
                          </p>
                          <p>
                            <span
                              className="trash"
                              onClick={this.handleDeleteFromCart.bind(
                                this,
                                cartIndex
                              )}
                            >
                              &#128465;
                            </span>
                          </p>
                        </div>
                      );
                    })}
                    {token !== null ? (
                      <input type="submit" value="Valider le Panier" />
                    ) : (
                      <Link to="connexion" className="submit-connect">
                        Se Connecter
                      </Link>
                    )}
                  </form>
                </section>
              )}
            </main>
          );
        }}
      </CartConsumer>
    );
  }
}
Cart.contextType = CartContext;
