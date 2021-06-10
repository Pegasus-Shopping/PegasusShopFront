import React, { useState, useContext } from "react";
import DataContext from "../context";

function StyleSelector() {
  const data = useContext(DataContext);
  const { styleIndex, styles } = data;
  const sizes = [];
  const quantitySelector = (max) => {
    const quantitiesSelect = [];
    if (max > 15) {
      max = 15;
    }
    for (let i = 1; i < max + 1; i += 1) {
      quantitiesSelect.push(i);
    }
    return quantitiesSelect;
  };
  const getSizes = () => {
    Object.keys(styles[styleIndex].skus).forEach((key) => {
      sizes.push({
        size: styles[styleIndex].skus[key].size,
        quantity: quantitySelector(styles[styleIndex].skus[key].quantity),
      });
    });
  };
  getSizes();
  const [currentSelect, setCurrentSelect] = useState(0);
  const updateSelect = (e) => {
    e.preventDefault();
    setCurrentSelect(e.target.value);
  };

  return (
    <div>
      <span className="selectedstyle">{styles[styleIndex].name}</span>
      <div className="stylethumbs">
        {styles.map(
          (style) => <img src={style.photos[0].thumbnail_url} alt={style.name} />,
        )}
      </div>
      <form>
        <select className="size" onChange={updateSelect}>
          {sizes.map((size, index) => <option value={index} key={size.size}>{size.size}</option>)}
        </select>
        <select className="quantity">
          {sizes[currentSelect].quantity.map((qty) => <option value={qty} key={qty}>{qty}</option>)}
        </select>
        <button type="button" className="cart">Add To Bag</button>
        <button type="button" className="outfit">*</button>
      </form>
    </div>
  );
}
export default StyleSelector;
