import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductOverview from "./product-overview/ProductOverview";
import RelatedProductsComparison from "./related-products/RelatedProductsComparison";
import QuestionsAnswers from "./questions-answers/QuestionsAnswers";
import ProductReviews from "./product-reviews/ProductReviews";
import DataContext from "./context";

function App() {
  const [isBusy, setBusy] = useState(true);
  const [styles, setStyles] = useState(null);
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState({ id: 20100 });
  const [id, setId] = useState(20100);
  const [outfitCount, setOutfitCount] = useState(0);

  useEffect(() => {
    axios.all([
      axios.get(`/products/${id}/styles`),
      axios.get("/reviews/meta/", { params: { product_id: id } }),
      axios.get(`/products/${id}`),
    ])
      .then(
        axios.spread((stylesReturn, ratingReturn, productReturn) => {
          setStyles(stylesReturn.data.results);
          setRating(ratingReturn.data.ratings);
          setProduct(productReturn.data);
          setBusy(false);
        }),
      );
  }, [id]);
  const updateCount = () => {
    setOutfitCount(outfitCount + 1);
  };
  return (
    <div>
      <h1>Shopping</h1>
      {
        !isBusy
        && (
        <>
          <DataContext.Provider value={{
            product, styles, styleIndex: 0, rating, updateCount,
          }}
          >
            <ProductOverview />
            <RelatedProductsComparison setId={setId} />
            <QuestionsAnswers />
            <ProductReviews />
          </DataContext.Provider>
        </>
        )
      }
    </div>
  );
}

export default App;
