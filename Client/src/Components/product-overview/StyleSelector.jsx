import React, {useState} from "react";
import PropTypes from "prop-types";

const context = {
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

function StyleSelector({
  styleIndex,
}) {
  const sizes = [];
  const getSizes = () => {
    for (const key in context.styles[styleIndex].skus) {
      sizes.push(context.styles[styleIndex].skus[key].size);
    }
  };
  getSizes();
  const quantities = [];
  const getQuants = () => {
    for (const key in context.styles[styleIndex].skus) {
      quantities.push(context.styles[styleIndex].skus[key].quantity);
    }
  };
  getQuants();
  const [currentSelect, setCurrentSelect] = useState(0);
  const updateSelect = (e) => {
    e.preventDefault();
    setCurrentSelect(e.target.key);
  };
  const quantitiesSelect = [];
  const quantitySelector = () => {
    let max = 15;
    if (quantities[currentSelect] < max) {
      max = quantities[currentSelect];
    }
    for (let i = 1; i === max; i += 1) {
      quantitiesSelect.push(i);
    }
  };
  quantitySelector();

  return (
    <div>
      <span className="selectedstyle">{context.styles[styleIndex].name}</span>
      <div className="stylethumbs">
        {context.styles.map(
          (style) => <img src={style.photos[0].thumbnail_url} alt={style.name} />,
        )}
      </div>
      <form>
        <select className="size" onChange={updateSelect}>
          {sizes.map((size) => <option value={size} key={size}>{size}</option>)}
        </select>
        <select className="quantity">
          {quantitiesSelect.map((qty) => <option value={qty} key={qty}>{qty}</option>)}
        </select>
        <button type="button" className="cart">Add To Bag</button>
        <button type="button" className="outfit">*</button>
      </form>
    </div>
  );
}
StyleSelector.propTypes = {
  styleIndex: PropTypes.number.isRequired,
};
export default StyleSelector;
