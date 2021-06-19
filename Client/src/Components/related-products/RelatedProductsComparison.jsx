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

const { getOutfit, removeFromOutfit, formatProduct } = helpers;

// imputs: type: function content: setter for App's id hook
// output: creates a card carousel for related products and a card carousel for products
// in the user's outfit, renders a modal comparing the features of the product displayed in the
// details module and features of a related product
// side effects: makes api requests
function RelatedProductsComparison({ setId }) {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  const [compareFeatures, setCompareFeatures] = useState();
  const [relatedProductIds, setRelatedProductIds] = useState([]);
  const {
    product, updateCount, getFromStorage, checkStorage, addToStorage,
  } = useContext(DataContext);
  // input: type: array of numbers
  // output: array of product objects
  // side effects: none
  const getProducts = (ids) => {
    const record = {};
    const formattedProducts = [];
    ids.forEach((id) => {
      if (getFromStorage(id) && !record[id]) {
        record[id] = id;
        const { stylesReturn, reviewsReturn, productReturn } = getFromStorage(id);
        formattedProducts.push(formatProduct(stylesReturn, reviewsReturn, productReturn));
      }
    });
    return formattedProducts;
  };
  useEffect(() => {
    axios.get(`/products/${product.id}/related/`)
      .then((res) => {
        const ids = res.data;
        setRelatedProductIds(ids);
        const promises = [];
        ids.forEach((id) => {
          if (!checkStorage(id)) {
            promises.push(
              axios.get("/all/", { params: { product_id: id } }),
            );
          }
        });
        if (!promises.length) {
          setIsBusy(false);
        }
        Promise.all(promises)
          .then((results) => {
            results.forEach((result) => {
              const {
                stylesReturn, ratingReturn, reviewsReturn, productReturn,
              } = result.data;
              addToStorage(stylesReturn, ratingReturn, reviewsReturn, productReturn);
            });
            setIsBusy(false);
          });
      });
  }, [product]);
  // input: object representation of product
  // output: none
  // side effects: updates compareFeatures, toggles comparison modal on
  const comparisonClick = (productCompare) => {
    console.log(productCompare);
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
    <div>
      {!isBusy
    && (
    <RecordClicks widget="related products comparison" element="carousel container">
      <div role="button" className={css.panel} onClick={isShowingModal ? pageOnClickEvent : undefined} onKeyDown={isShowingModal ? pageOnClickEvent : undefined} tabIndex={0}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        {isShowingModal && (
        <ComparisonModal
          currentProduct={product}
          compareProduct={compareFeatures}
        />
        )}
        <CardCarousel products={getProducts(relatedProductIds)} title="RELATED PRODUCTS" buttonOnClickEvent={comparisonClick} onClickEvent={setId} buttonCharacter="star" />
        <CardCarousel products={getProducts(getOutfit())} title="YOUR OUTFIT" buttonOnClickEvent={removeFromOutfitUpdateCount} buttonCharacter="circledX" defaultCard={<AddOutfitCard key="addThisToOutfit" />} />
      </div>
    </RecordClicks>
    )}

    </div>
  );
}

RelatedProductsComparison.propTypes = {
  setId: PropTypes.func.isRequired,
};
export default RelatedProductsComparison;
