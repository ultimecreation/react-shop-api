import React, { Component } from "react";

export const ProductContext = React.createContext();
ProductContext.displayName = "Product";

export class ProductProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productDetails: null
    };
    this.getProductList = this.getProductList.bind(this);
    this.getSingleProduct = this.getSingleProduct.bind(this);
  }
  componentDidMount() {
    this.getProductList();
  }
  getProductList() {
    fetch(`http://localhost/shop-api/api/v1/products`)
      .then(res => res.json())
      .then(data => this.setState({ products: data }));
  }

  getSingleProduct(id) {
    return fetch(`http://localhost/shop-api/api/v1/products/${id}`)
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }

  render() {
    const productState = {
      ...this.state,
      getSingleProduct: this.getSingleProduct
    };

    return (
      <ProductContext.Provider value={productState}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export const ProductConsumer = ProductContext.Consumer;
