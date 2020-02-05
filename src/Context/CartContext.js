import React, { Component } from "react";

export const CartContext = React.createContext();
CartContext.displayName = "Cart";

export class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("cartItems")) !== null) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }
  }
  addToCart(product) {
    let cartItems = this.state.cartItems;
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item.id === product.id) {
        alreadyInCart = true;
        item.count++;
      }
    });

    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }

    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  removeFromCart(product, cartIndex) {
    let cartItems = this.state.cartItems;
    cartItems.forEach(item => {
      if (item.id === product.id) {
        item.count--;
        if (item.count <= 0) {
          cartItems.splice(cartIndex, 1);
        }
      }
    });
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(cartIndex);
  }
  render() {
    const cartState = {
      ...this.state,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart
    };
    return (
      <CartContext.Provider value={cartState}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export const CartConsumer = CartContext.Consumer;
