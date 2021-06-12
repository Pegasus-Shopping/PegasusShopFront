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
  const [styleIndex, setStyleIndex] = useState(0);
  useEffect(() => {
    // get styles
    axios.get(`/products/${id}/styles`)
      .then((res) => {
        setStyles(res.data.results);
      })
      .then( // get ratings
        () => axios.get("/reviews/meta/", { params: { product_id: id } })
          .then((res) => {
            setRating(res.data.ratings);
          }),
      ).then(
        () => ( // get details
          axios.get(`/products/${id}`)
            .then((res) => {
              // console.log(res);
              setProduct(res.data);
            })
        ),
      )
      .then(() => {
        setBusy(false);
      });
  }, [id]);
  return (
    <div>
      <h1>Shopping</h1>
      {
        !isBusy
        && (
        <>
          <DataContext.Provider
            value={{
              product, styles, styleIndex, rating,
            }}
          >
            <ProductOverview setStyleIndex={setStyleIndex} />
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
