import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import css from "./styles.css";
import CardCarousel from "./CardCarousel";
import ComparisonModal from "./ComparisonModal";
import AddOutfitCard from "./AddOutfitCard";
import DataContext from "../context";
// import LocalStorageContext from "./LocalStorageContext";
import helpers from "./helper-functions";

const { getOutfit, removeFromOutfit } = helpers;

// imputs: none, uses React context to get ratings and information of current product
// output: creates a card carousel for related products and a card carousel for products
// in the user's outfit, renders a modal comparing the features of the product displayed in the
// details module and features of a related product
// side effects: makes api requests

function RelatedProductsComparison({ setId }) {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [relatedProductIds, setrelatedProductIds] = useState([]);
  const [compareFeatures, setCompareFeatures] = useState();
  // const [outfitCount, setOutfitCount] = useState(0);
  const { product, updateCount } = useContext(DataContext);
  useEffect(() => {
    // get related product ids
    axios.get(`/products/${product.id}/related/`)
      .then((res) => {
        setrelatedProductIds(res.data);
      });
  }, [product]);

  // input: type: number, content: id of product in card
  // output: none
  // side effects: updates currently displayed product
  const updateDisplayedProduct = (id) => {
    setId(id);
  };
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
  // window.localStorage.clear();
  const removeFromOutfitUpdateCount = (id) => {
    removeFromOutfit(id);
    // setOutfitCount(outfitCount - 1);
    updateCount();
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
      {/* <LocalStorageContext.Provider value={{ outfitCount, setOutfitCount }}> */}
      <CardCarousel ids={relatedProductIds} title="RELATED PRODUCTS" buttonOnClickEvent={comparisonClick} onClickEvent={updateDisplayedProduct} buttonCharacter="star" />
      <CardCarousel ids={getOutfit()} title="YOUR OUTFIT" buttonOnClickEvent={removeFromOutfitUpdateCount} buttonCharacter="circledX" defaultCard={<AddOutfitCard />} />
      {/* </LocalStorageContext.Provider> */}
    </div>
  );
}

export default RelatedProductsComparison;
