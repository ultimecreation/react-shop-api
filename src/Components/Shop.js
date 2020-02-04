import React, { Component } from "react";
import { ProductConsumer } from "../Context/ProductContext";
import ProductList from "./products/ProductList";
import { CartConsumer } from "../Context/CartContext";

export default class Shop extends Component {
  render() {
    return (
      <CartConsumer>
        {cartState => (
          <ProductConsumer>
            {productState => (
              <main>
                <header>
                  <h1>Boutique</h1>
                </header>
                <section id="shop">
                  <ProductList
                    products={productState.products}
                    addToCart={cartState.addToCart}
                  />
                </section>
              </main>
            )}
          </ProductConsumer>
        )}
      </CartConsumer>
    );
  }
}
