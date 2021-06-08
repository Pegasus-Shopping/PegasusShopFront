/* eslint-disable import/extensions */
import React from "react";
import css from "./styles.css";
import CardCarousol from "./CardCarousel";

const sampleProductDetails = {
  id: 11,
  name: "Air Minis 250",
  slogan: "Full court support",
  description: "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
  category: "Basketball Shoes",
  default_price: "0",
  features: [
    {
      feature: "Sole",
      value: "Rubber",
    },
    {
      feature: "Material",
      value: "FullControlSkin",
    },
  // ...
  ],
};
const productStyles = {
  product_id: "1",
  results: [
    {
      style_id: 1,
      name: "Forest Green & Black",
      original_price: "140",
      sale_price: "0",
      "default?": true,
      photos: [
        {
          thumbnail_url: "urlplaceholder/style_1_photo_number_thumbnail.jpg",
          url: "urlplaceholder/style_1_photo_number.jpg"
        },
        {
          thumbnail_url: "urlplaceholder/style_1_photo_number_thumbnail.jpg",
          url: "urlplaceholder/style_1_photo_number.jpg"
        },
      ],
      skus: {
        37: {
          quantity: 8,
          size: "XS",
        },
        38: {
          quantity: 16,
          size: "S",
        },
        39: {
          quantity: 17,
          size: "M",
        },
      },
    },

  ],
};
const formattedProduct = {
  id: sampleProductDetails.id,
  name: sampleProductDetails.name,
  category: sampleProductDetails.category,
  price: productStyles.results[0].original_price,
  imgUrl: productStyles.results[0].photos[0].thumbnail_url,
  rating: 3.5,
};
const relatedProductsArray = [formattedProduct, formattedProduct, formattedProduct,
  formattedProduct, formattedProduct, formattedProduct];
const outfitProductsArray = [formattedProduct, formattedProduct, formattedProduct,
  formattedProduct, formattedProduct, formattedProduct];
const printX = (x) => console.log("Do something with the id:", x);
const clickedFunc = () => console.log("You clicked an image, this should update the current product");

function RelatedProductsComparison() {
  return (
    <div className={css.panel}>
      <CardCarousol productInfo={relatedProductsArray} title="Related Products" buttonOnClickEvent={printX} onClickEvent={clickedFunc} />
      <CardCarousol productInfo={outfitProductsArray} title="Your Outfit" buttonOnClickEvent={printX} onClickEvent={clickedFunc} />
    </div>
  );
}

export default RelatedProductsComparison;
