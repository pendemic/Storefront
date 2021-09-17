import React from "react";
import ProductItem from "../ProductItem";
import withContext from "../withContext";
import '../Style.css';
const ProductList = props => {
  const { products } = props.context;

  return (
    <>
      <div>
          <img src="../img/Products.PNG">
          </img>
        
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withContext(ProductList);