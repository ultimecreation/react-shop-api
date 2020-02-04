import React, { Component } from "react";
import { ProductConsumer } from "../Context/ProductContext";
import ProductList from "./products/ProductList";

export default class Shop extends Component {
  render() {
    return (
      <ProductConsumer>
        {productState => (
          <main>
            <header>
              <h1>Boutique</h1>
            </header>
            <section id="shop">
              <ProductList products={productState.products} />
            </section>
          </main>
        )}
      </ProductConsumer>
    );
  }
}
