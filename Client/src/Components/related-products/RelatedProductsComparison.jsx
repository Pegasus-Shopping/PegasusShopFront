/* eslint-disable import/extensions */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import css from "./styles.css";
import CardCarousel from "./CardCarousel";
import ComparisonModal from "./ComparisonModal";
import helper from "./helper-functions";
import DataContext from "../context";

const { formatProduct } = helper;

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
  const [compareFeatures, setCompareFeatures] = useState();
  const { product } = useContext(DataContext);
  useEffect(() => {
    // get related product ids
    axios.get(`/products/${product.id}/related/`)
      .then((res) => {
        setrelatedProductIds(res.data);
      });
  }, []);

  // input: object representation of product
  // output: none
  // side effects: upstates compareFeatures, toggles comparison modal on
  const comparisonClick = (productCompare) => {
    setCompareFeatures(productCompare);
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
        currentProduct={product}
        compareProduct={compareFeatures}
      />
      )}
      <CardCarousel ids={relatedProductIds} title="RELATED PRODUCTS" buttonOnClickEvent={comparisonClick} onClickEvent={updateDisplayedProduct} buttonCharacter="star" />
      <CardCarousel ids={mockLocalStorage.outfitIds} title="YOUR OUTFIT" buttonOnClickEvent={addToOutfits} onClickEvent={() => {}} buttonCharacter="circledX" />
    </div>
  );
}

export default RelatedProductsComparison;
