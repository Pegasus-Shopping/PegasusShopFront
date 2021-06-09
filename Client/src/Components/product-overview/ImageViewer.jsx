import React, { useState } from "react";
import PropTypes from "prop-types";

// const result = {
//   product_id: "1",
//   results: [
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
// };

function ImageViewer({
  photos, name,
}) {
  console.log(photos);
  const [thumb, setThumb] = useState(0);
  return (
    <div>
      <img src={photos[thumb].url} alt={name} />
      <div className="thumbnails">
        {photos.map((photo, index) => (
          <img src={photo.thumbnail_url} alt={name} onClick={() => setThumb(index)} />
        ))}
      </div>
    </div>
  );
}
ImageViewer.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string,
};
ImageViewer.defaultProps = {
  name: "",
};
export default ImageViewer;
