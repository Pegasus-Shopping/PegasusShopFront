import React from "react";
import ReviewList from "./review-list/ReviewList";

// Passes in an example review list pulled from altiere API.
// ProductReviews pass in the list to ReviewList.
function ProductReviews() {
  const reviewListExample = [
    {
      review_id: 248268,
      rating: 4,
      summary: "I am liking these glasses",
      recommend: true,
      response: "Glad you're enjoying the product!",
      body: "They are very dark. But that's good because I'm in very sunny spots",
      date: "2019-06-23T00:00:00.000Z",
      reviewer_name: "bigbrotherbenjamin",
      helpfulness: 15,
      photos: [],
    },
    {
      review_id: 248270,
      rating: 3,
      summary: "I'm enjoying wearing these shades",
      recommend: true,
      response: "",
      body: "Comfortable and practical.",
      date: "2019-04-14T00:00:00.000Z",
      reviewer_name: "shortandsweeet",
      helpfulness: 14,
      photos: [
        {
          id: 417326,
          url: "https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80",
        },
        {
          id: 417327,
          url: "https://images.unsplash.com/photo-1561693532-9ff59442a7db?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80",
        },
        {
          id: 417328,
          url: "https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
        },
      ],
    },
    {
      review_id: 248272,
      rating: 2,
      summary: "This product was ok!",
      recommend: false,
      response: "",
      body: "They're fine but I wouldn't buy again.",
      date: "2019-05-23T00:00:00.000Z",
      reviewer_name: "anyone",
      helpfulness: 7,
      photos: [],
    },
    {
      review_id: 248269,
      rating: 4,
      summary: "They look good on me",
      recommend: true,
      response: "",
      body: "I so stylish and just my aesthetic.",
      date: "2019-03-12T00:00:00.000Z",
      reviewer_name: "fashionperson",
      helpfulness: 30,
      photos: [],
    },
    {
      review_id: 288688,
      rating: 5,
      summary: "fe",
      recommend: false,
      response: null,
      body: "heywhat;kjdf lkasdkfjlasd;fkljadsfjjdasfa;sdlfkjlkj",
      date: "2021-03-11T00:00:00.000Z",
      reviewer_name: "what",
      helpfulness: 0,
      photos: [
        {
          id: 496658,
          url: "https://louisajeseetest.blob.core.windows.net/louisaandjesse/imge02d3160-821e-11eb-b84c-b3b99091defa.dimmed_monokai.itermcolors.png",
        },
      ],
    },
  ];

  return (
    <div>
      <ReviewList list={reviewListExample} />
    </div>
  );
}

export default ProductReviews;
