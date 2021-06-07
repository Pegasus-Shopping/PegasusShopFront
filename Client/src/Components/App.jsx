/* eslint-disable import/extensions */
import React from "react";
import ProductOverview from "./product-overview/ProductOverview.jsx";
import RelatedProductsComparison from "./related-products/RelatedProductsComparison.jsx";
import QuestionsAnswers from "./questions-answers/QuestionsAnswers.jsx";
import ProductReviews from "./product-reviews/ProductReviews.jsx";

function App() {
  return (
    <div>
      <h1>Shopping</h1>
      <ProductOverview />
      <RelatedProductsComparison />
      <QuestionsAnswers />
      <ProductReviews />
    </div>
  );
}

export default App;
