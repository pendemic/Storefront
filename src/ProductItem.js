import React from "react";
import TagManager from 'react-gtm-module';
const ProductItem = props => {
  const { product } = props;
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID
  }
  TagManager.initialize(tagManagerArgs)
  return (
    <div className=" column is-one-quarter">
      <div className="tile is-parent">
        <div className="tile is-child notification is-white">
            <figure className="image is-4by5">
              <img
                src={`./img/${product.name}.jpg`}
                alt={product.shortDesc}
              />
            </figure>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-warning">${product.price}</span>
            </b>
            <div>{product.shortDesc}</div>
            {product.stock > 0 ? (
              <small>{product.stock + " Available"}</small>
            ) : (
              <small className="has-text-danger">Out Of Stock</small>
            )}
            <div className="is-clearfix">
              <button
                className="button is-small has-background-success-light gtmAdd"
                onClick={() =>
                  props.addToCart({
                    id: product.name,
                    product,
                    amount: 1,
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;