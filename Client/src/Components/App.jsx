/* eslint-disable import/extensions */
import React from "react";
import ProductOverview from "./product-overview/ProductOverview.jsx";
import RelatedProductsComparison from "./related-products/RelatedProductsComparison.jsx";
import QuestionsAnswers from "./questions-answers/QuestionsAnswers.jsx";
import ProductReviews from "./product-reviews/ProductReviews.jsx";
import DataContext from "./context";

const data = {
  product: {
    id: 11,
    name: "Air Minis 250",
    slogan: "Full court support",
    description: "This optimized air cushion...",
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
    ],
  },
  styles: [
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
    {
      style_id: 2,
      name: "Desert Brown & Tan",
      original_price: "140",
      sale_price: "0",
      "default?": false,
      photos: [
        {
          thumbnail_url: "urlplaceholder/style_2_photo_number_thumbnail.jpg",
          url: "urlplaceholder/style_2_photo_number.jpg",
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
  styleIndex: 0,
};

function App() {
  return (
    <div>
      <DataContext.Provider value={data}>
        <ProductOverview />
      </DataContext.Provider>
      <RelatedProductsComparison />
      <QuestionsAnswers />
      <ProductReviews />
    </div>
  );
}

export default App;
