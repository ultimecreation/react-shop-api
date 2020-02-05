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
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.registerItems = this.registerItems.bind(this);
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("cartItems")) !== null) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }
  }
  registerItems(cartItems) {
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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

    this.registerItems(cartItems);
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
    this.registerItems(cartItems);
  }
  deleteFromCart(cartIndex) {
    let cartItems = this.state.cartItems;

    cartItems.splice(cartIndex, 1);
    this.registerItems(cartItems);

    console.log(cartIndex, cartItems);
  }
  render() {
    const cartState = {
      ...this.state,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      deleteFromCart: this.deleteFromCart
    };
    return (
      <CartContext.Provider value={cartState}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export const CartConsumer = CartContext.Consumer;
