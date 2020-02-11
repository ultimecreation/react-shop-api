import React, { Component } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { Link } from "react-router-dom";
export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    fetch(`http://localhost/shop-api/api/v1/products/${id}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }));
  }
  //   let id = this.props.match.params.id;
  //   fetch(`http://localhost/shop-api/api/v1/products/${id}`)
  //     .then(res => res.json())
  //     .then(data => this.setState({ product: data }));
  render() {
    const { product } = this.state;
    let imageUrl;
    let imageAlt;
    for (let key in product.images) {
      imageUrl = product.images[0].url;
      imageAlt = product.images[0].name;
    }
    const sizes = [];
    for (let key in product.availableSizes) {
      sizes.push(product.availableSizes[key].size + "");
    }

    return (
      <main id="single-product">
        <header>
          <Link to="/"> &lt;&lt; Retour</Link>
          <h1>Détails {product.title} </h1>
        </header>
        <section>
          <div className="single-product__body">
            <img src={imageUrl} alt={imageAlt} />
            <p>{product.description} </p>
            <p>Tailles disponibles</p>
            <p>
              {" "}
              {sizes.map((size, index) => (
                <span key={index}>{size} </span>
              ))}
            </p>
          </div>
          <div className="single-product__footer">
            <p>
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR"
              }).format(product.price)}
            </p>
            <span role="img" aria-label="caddie">
              &#128722;
            </span>
          </div>
        </section>
      </main>
    );
  }
}
ProductDetails.contextType = ProductContext;
