import React from "react";
import ImageViewer from "./ImageViewer";
import ProductDetails from "./ProductDetails";
import ProductOptions from "./ProductOptions";

// const context = {
//   product: {
//     id: 11,
//     name: "Air Minis 250",
//     slogan: "Full court support",
//     description: "This optimized air cushion...",
//     category: "Basketball Shoes",
//     default_price: "0",
//     features: [
//       {
//         feature: "Sole",
//         value: "Rubber",
//       },
//       {
//         feature: "Material",
//         value: "FullControlSkin",
//       },
//     ],
//   },
//   styles: [
//     {
//       style_id: 1,
//       name: "Forest Green & Black",
//       original_price: "140",
//       sale_price: "0",
//       "default?": true,
//       photos: [
//         {
//           thumbnail_url: "urlplaceholder/style_1_photo_number_thumbnail.jpg",
//           url: "urlplaceholder/style_1_photo_number.jpg",
//         },
//         {
//           thumbnail_url: "urlplaceholder/style_1_photo_number_thumbnail.jpg",
//           url: "urlplaceholder/style_1_photo_number.jpg",
//         },
//       ],
//       skus: {
//         37: {
//           quantity: 8,
//           size: "XS",
//         },
//         38: {
//           quantity: 16,
//           size: "S",
//         },
//         39: {
//           quantity: 17,
//           size: "M",
//         },
//       },
//     },
//     {
//       style_id: 2,
//       name: "Desert Brown & Tan",
//       original_price: "140",
//       sale_price: "0",
//       "default?": false,
//       photos: [
//         {
//           thumbnail_url: "urlplaceholder/style_2_photo_number_thumbnail.jpg",
//           url: "urlplaceholder/style_2_photo_number.jpg",
//         },
//       ],
//       skus: {
//         37: {
//           quantity: 8,
//           size: "XS",
//         },
//         38: {
//           quantity: 16,
//           size: "S",
//         },
//         39: {
//           quantity: 17,
//           size: "M",
//         },
//       },
//     },
//   ],
//   styleIndex: 0,
// };
function ProductOverview() {
  return (
    <div>
      <ImageViewer />
      <ProductOptions />
      <ProductDetails />
    </div>
  );
}
export default ProductOverview;
