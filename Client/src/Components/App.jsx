import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductOverview from "./product-overview/ProductOverview";
import RelatedProductsComparison from "./related-products/RelatedProductsComparison";
import ProductReviews from "./product-reviews/ProductReviews";
import DataContext from "./context";
import css from "./styles.css";

function App() {
  const [isBusy, setBusy] = useState(true);
  const [styles, setStyles] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(null);
  const [product, setProduct] = useState({ id: 20100 });
  const [id, setId] = useState(20100);
  const [outfitCount, setOutfitCount] = useState(0);
  const [styleIndex, setStyleIndex] = useState(0);
  const [productStorage, setProductStorage] = useState([]);

  // input: number
  // output: boolean
  // side effects: none
  // behavior: tests if product with input id is present in storage
  const checkStorage = (idQuery) => {
    let isPresent = false;
    productStorage.forEach((productObj) => {
      if (productObj.productReturn.id === idQuery) {
        isPresent = true;
      }
    });
    return isPresent;
  };
  // input: properties of product data object returned by GET /all
  // output: none
  // side effects: puts object representing product in storage
  const addToStorage = (stylesReturn, ratingReturn, reviewsReturn, productReturn) => {
    productStorage.push({
      stylesReturn, ratingReturn, reviewsReturn, productReturn,
    });
    setProductStorage(productStorage);
  };
  // input: number
  // output: object represention of product or null if object is not present
  // side effects: none
  const getFromStorage = (idQuery) => {
    let productData = null;
    productStorage.forEach((productObj) => {
      if (productObj.productReturn.id === idQuery) {
        productData = productObj;
      }
    });
    return productData;
  };
  // input: properties of product data object returned by GET /all
  // output: none
  // side effects: updates hooks for current product
  const setCurrent = (stylesReturn, ratingReturn, reviewsReturn, productReturn) => {
    setStyles(stylesReturn.results);
    setRating(ratingReturn.ratings);
    setReviews(reviewsReturn);
    setProduct(productReturn);
    setBusy(false);
  };
  useEffect(() => {
    if (checkStorage(id)) {
      const {
        stylesReturn, ratingReturn, reviewsReturn, productReturn,
      } = getFromStorage(id);
      setCurrent(stylesReturn, ratingReturn, reviewsReturn, productReturn);
    } else {
      axios.get("/all/", { params: { product_id: id } })
        .then((res) => {
          const {
            stylesReturn, ratingReturn, reviewsReturn, productReturn,
          } = res.data;

          addToStorage(stylesReturn, ratingReturn, reviewsReturn, productReturn);
          setCurrent(stylesReturn, ratingReturn, reviewsReturn, productReturn);
        });
    }
  }, [id]);
  const updateCount = () => {
    setOutfitCount(outfitCount + 1);
  };
  return (
    <div className={css.background}>
      <h1 className={css.header}>
        Pegasus Shopping
      </h1>
      {
        !isBusy
        && (
        <div className={css.app}>
          <DataContext.Provider
            value={{
              product,
              styles,
              styleIndex,
              rating,
              reviews,
              updateCount,
              getFromStorage,
              checkStorage,
              addToStorage,
            }}
          >
            <ProductOverview setStyleIndex={setStyleIndex} id={id} />
            <RelatedProductsComparison setId={setId} />
            <ProductReviews id={id} />
          </DataContext.Provider>
        </div>
        )
      }
    </div>
  );
}

export default App;
