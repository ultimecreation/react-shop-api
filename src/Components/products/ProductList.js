import React from "react";

const ProductList = props => {
  const { products } = props;

  return (
    <>
      {products.map(product => (
        <article key={product.id}>
          <h2>{product.title} </h2>
        </article>
      ))}
    </>
  );
};

export default ProductList;
