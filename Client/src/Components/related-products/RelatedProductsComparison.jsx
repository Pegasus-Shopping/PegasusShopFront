/* eslint-disable import/extensions */
import React, { useState, useEffect } from "react";
import axios from "axios";
import css from "./styles.css";
import CardCarousel from "./CardCarousel";
import ComparisonModal from "./ComparisonModal";
import helper from "./helper-functions";

const { formatProduct } = helper;

// mock data
const sampleProductDetails = {
  id: 20100,
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
    {
      feature: "Way Overpriced",
      value: true,
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
          url: "urlplaceholder/style_1_photo_number.jpg",
        },
        {
          thumbnail_url: "urlplaceholder/style_1_photo_number_thumbnail.jpg",
          url: "urlplaceholder/style_1_photo_number.jpg",
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
const formattedProduct = formatProduct(sampleProductDetails, productStyles.results);
const mockLocalStorage = { outfitIds: [20101, 20106] };
// placeholder functions, should be axios requests or interations with local storage
const addToOutfits = (product) => console.log("Should add product with id", product.id, "to the local storage");
const updateDisplayedProduct = () => console.log("You clicked an image, this should update the current product");

// imputs: none, uses React context to get ratings and information of current product
// output: creates a card carousel for related products and a card carousel for products
// in the user's outfit, renders a modal comparing the features of the product displayed in the
// details module and features of a related product
// side effects: makes api requests

function RelatedProductsComparison() {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [relatedProductIds, setrelatedProductIds] = useState([]);
  const [compareFeatures, setCompareFeatures] = useState(formattedProduct.features);

  useEffect(() => {
    // get related product ids
    axios.get(`/products/${formattedProduct.id}/related/`)
      .then((res) => {
        setrelatedProductIds(res.data);
      });
  }, []);

  // input: object representation of product
  // output: none
  // side effects: upstates compareFeatures, toggles comparison modal on
  const comparisonClick = (product) => {
    setCompareFeatures(product);
    setIsShowingModal(true);
  };
  // input: none
  // output: none
  // side effects: upstates compareFeatures, toggles comparison modal off
  const pageOnClickEvent = () => {
    setIsShowingModal(false);
  };
  return (
    <div role="button" className={css.panel} onClick={isShowingModal ? pageOnClickEvent : undefined} onKeyDown={isShowingModal ? pageOnClickEvent : undefined} tabIndex={0}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      {isShowingModal && (
      <ComparisonModal
        currentProduct={formattedProduct}
        compareProduct={compareFeatures}
      />
      )}
      <CardCarousel ids={relatedProductIds} title="RELATED PRODUCTS" buttonOnClickEvent={comparisonClick} onClickEvent={updateDisplayedProduct} buttonCharacter="star" />
      <CardCarousel ids={mockLocalStorage.outfitIds} title="YOUR OUTFIT" buttonOnClickEvent={addToOutfits} onClickEvent={() => {}} buttonCharacter="circledX" />
    </div>
  );
}

export default RelatedProductsComparison;
