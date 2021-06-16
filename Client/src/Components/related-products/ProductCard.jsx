import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import css from "./styles.css";
import CardCarousel from "./CardCarousel";
import ComparisonModal from "./ComparisonModal";
import AddOutfitCard from "./AddOutfitCard";
import DataContext from "../context";
import helpers from "./helper-functions";
import RecordClicks from "../RecordClicks";

const { getOutfit, removeFromOutfit } = helpers;

// imputs: type: function content: setter for App's id hook
// output: creates a card carousel for related products and a card carousel for products
// in the user's outfit, renders a modal comparing the features of the product displayed in the
// details module and features of a related product
// side effects: makes api requests
function RelatedProductsComparison({ setId }) {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [relatedProductIds, setRelatedProductIds] = useState([]);
  const [compareFeatures, setCompareFeatures] = useState();
  const { product, updateCount } = useContext(DataContext);
  useEffect(() => {
    // get related product ids
    axios.get(`/products/${product.id}/related/`)
      .then((res) => {
        setRelatedProductIds(res.data);
      });
  }, [product]);
  // input: object representation of product
  // output: none
  // side effects: updates compareFeatures, toggles comparison modal on
  const comparisonClick = (productCompare) => {
    setCompareFeatures(productCompare);
    setIsShowingModal(true);
  };
  // input: none
  // output: none
  // side effects: toggles comparison modal off
  const pageOnClickEvent = () => {
    setIsShowingModal(false);
  };
  // inout: type: object with id property, content: object representation of product
  const removeFromOutfitUpdateCount = (cardProduct) => {
    removeFromOutfit(cardProduct);
    updateCount();
  };
  return (
    <RecordClicks widget="related products comparison" element="carousel container">
      <div role="button" className={css.panel} onClick={isShowingModal ? pageOnClickEvent : undefined} onKeyDown={isShowingModal ? pageOnClickEvent : undefined} tabIndex={0}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        {isShowingModal && (
        <ComparisonModal
          currentProduct={product}
          compareProduct={compareFeatures}
        />
        )}
        <CardCarousel ids={relatedProductIds} title="RELATED PRODUCTS" buttonOnClickEvent={comparisonClick} onClickEvent={setId} buttonCharacter="star" />
        <CardCarousel ids={getOutfit()} title="YOUR OUTFIT" buttonOnClickEvent={removeFromOutfitUpdateCount} buttonCharacter="circledX" defaultCard={<AddOutfitCard key="addThisToOutfit" />} />
      </div>
    </RecordClicks>
  );
}
RelatedProductsComparison.propTypes = {
  setId: PropTypes.func.isRequired,
};
export default RelatedProductsComparison;
