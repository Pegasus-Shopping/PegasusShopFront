import React, { useState } from "react";
import axios from "axios";

function StyleSelector(props) {
  const [styleIndex, setStyleIndex] = useState(0);
  const [price, setPrice] = useState(props.defaultPrice);
  const [styles, setStyles] = useState([]);
  axios.patch(`http://localhost:3000/:${props.id}/styles`)
    .then((result) => {
      setStyles(result.results);
      const newPrice = result.results[styleIndex].sale_price;
      if (result.results[styleIndex].sale_price === 0) {
        newPrice = result.results[styleIndex].original_price;
      }
      setPrice(newPrice);
    });

  return (
    <div>
      <span className="price" />
      StyleSelector
    </div>
  );
}

export default StyleSelector;
