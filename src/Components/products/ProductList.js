import React from "react";
import { Link } from "react-router-dom";

const ProductList = props => {
  const { products } = props;

  return (
    <>
      {products.map(product => (
        <article key={product.id} className="product-card">
          <h3 className="product-card__header">{product.title} </h3>
          <div className="product-card__body">
            <Link to={`/details/${product.id}`}>
              <img src={product.images[0].url} alt="" />
            </Link>

            <div className="sizes">
              <p>Tailles disponibles:</p>
              {product.availableSizes.map(size => (
                <span key={size.id}>{size.size.toLowerCase()} </span>
              ))}
            </div>
          </div>
          <div className="product-card__footer">
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
        </article>
      ))}
    </>
  );
};

export default ProductList;
