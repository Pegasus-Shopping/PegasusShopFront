/* eslint-disable import/extensions */
import React from "react";
import ProductOverview from "./product-overview/ProductOverview.jsx";
import RelatedProductsComparison from "./related-products/RelatedProductsComparison.jsx";
import QuestionsAnswers from "./questions-answers/QuestionsAnswers.jsx";
import ProductReviews from "./product-reviews/ProductReviews.jsx";
import DataContext from "./context";

function App() {
  return (
    <div>
      <React.Provider>
        <ProductOverview />
        <RelatedProductsComparison />
        <QuestionsAnswers />
        <ProductReviews />
      </React.Provider>
    </div>
  );
}

export default App;
