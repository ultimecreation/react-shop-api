import React, { Component } from "react";

export const CartContext = React.createContext();
CartContext.displayName = "Cart";

export class CartProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      itemsCount: 0
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.registerItems = this.registerItems.bind(this);
    // this.getItemsCount = this.getItemsCount.bind(this);
  }

  componentDidMount() {
    if (JSON.parse(localStorage.getItem("cartItems")) !== null) {
      let cartItems = JSON.parse(localStorage.getItem("cartItems"));
      let itemsCount = cartItems.reduce((acc, item) => {
        return (acc += item.count);
      }, 0);
      this.setState({ cartItems, itemsCount });
    }
  }
  getItemsCount() {
    let cartItems = this.state.cartItems;
    let itemsCount = cartItems.reduce((acc, item) => {
      return (acc += item.count);
    }, 0);
    console.log(itemsCount);
    this.setState({ itemsCount });
  }
  getValidatedCart(validatedCartName) {
    const validatedCartData = JSON.parse(
      localStorage.getItem(validatedCartName)
    );

    return validatedCartData;
  }
  setValidatedCart(validatedCartName, validatedCartData) {
    localStorage.setItem(validatedCartName, JSON.stringify(validatedCartData));
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
        this.getItemsCount();
      }
    });

    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
      this.getItemsCount();
    }

    this.registerItems(cartItems);
  }
  removeFromCart(product, cartIndex) {
    let cartItems = this.state.cartItems;
    cartItems.forEach(item => {
      if (item.id === product.id) {
        item.count--;
        this.getItemsCount();
        if (item.count <= 0) {
          cartItems.splice(cartIndex, 1);
          this.getItemsCount();
        }
      }
    });
    this.registerItems(cartItems);
  }
  deleteFromCart(cartIndex) {
    let cartItems = this.state.cartItems;

    cartItems.splice(cartIndex, 1);
    this.registerItems(cartItems);
    this.getItemsCount();
  }
  render() {
    const cartState = {
      ...this.state,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      deleteFromCart: this.deleteFromCart,
      setValidatedCart: this.setValidatedCart,
      getValidatedCart: this.getValidatedCart
    };
    return (
      <CartContext.Provider value={cartState}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export const CartConsumer = CartContext.Consumer;
