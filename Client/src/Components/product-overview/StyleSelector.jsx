import React, { useState, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import DataContext from "../context";
import helpers from "../related-products/helper-functions";
import RecordClicks from "../RecordClicks";
import css from "./styles.css";

function StyleSelector({ setStyleIndex }) {
  const data = useContext(DataContext);
  const { styleIndex, styles, updateCount } = data;
  const { id } = data.product;
  const { removeFromOutfit, addToOutfit, getOutfit } = helpers;
  const [currentSelect, setCurrentSelect] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const sizes = [];
  const outfits = getOutfit();
  const quantitySelector = (max) => {
    // input: number (quantity from sku)
    // output: array of numbers 1-max or 15
    // purpose: creates the values for the quantity selector
    let newMax = max;
    if (newMax > 15) {
      newMax = 15;
    }
    return Array.from(Array(newMax + 1).keys()).slice(1);
  };
  const getSizes = () => {
    // input: nothing
    // output: array of sizes for product
    // purpose: provide sizes for selector
    Object.keys(styles[styleIndex].skus).forEach((key) => {
      sizes.push({
        id: key,
        size: styles[styleIndex].skus[key].size,
        quantity: quantitySelector(styles[styleIndex].skus[key].quantity),
      });
    });
  };
  getSizes();
  const updateSelect = (e) => {
    // input: selector change event
    // output:
    // purpose: track which size is selected
    e.preventDefault();
    setCurrentSelect(e.target.value);
  };
  const updateQuantity = (e) => {
    // input: new quantity selected
    // output:
    // purpose: update state on change
    e.preventDefault();
    setCurrentQuantity(e.target.value);
  };
  const updateStyle = (index) => {
    // input: button click event
    // output: new state (style selected)
    // purpose: track which style is selected
    // side effects: updates styleIndex, sizes array
    setStyleIndex(index);
    getSizes();
  };
  const addToCart = (e) => {
    // input: add to cart button click, event
    // output: API post request
    // purpose: allow user to add current selected product to cart
    e.preventDefault();
    axios.post("http://localhost:3000/cart", {
      params: {
        sku: sizes[currentSelect].id,
        count: currentQuantity,
      },
    })
      .then((resp) => console.log(resp))
      .catch((error) => console.log(error));
  };
  const addOutfit = (e) => {
    e.preventDefault();
    addToOutfit(id);
    updateCount();
  };
  const removeOutfit = (e) => {
    e.preventDefault();
    removeFromOutfit({ id });
    updateCount();
  };
  return (
    <div className={css.styleselectorgrid}>
      <span className={css.selectedstylename}>
        <b>{"STYLE > "}</b>
        {styles[styleIndex].name}
      </span>
      <div className={css.stylethumbs}>
        <div className={css.stylethumbsgrid}>
          <RecordClicks widget="product overview" element="toggle style">
            {styles.map(
              (style, index) => (
                <div className={css.thumbnail}>
                  {index === styleIndex
                && (
                  <i className="far fa-check-circle" />
                )}
                  <button type="button" className={css.stylebutton} onClick={() => (updateStyle(index))} key={style}>
                    {" "}
                    <img
                      className={css.stylethumb}
                      src={style.photos[0].thumbnail_url}
                      alt={style.name}
                      value={index}
                    />
                  </button>
                </div>
              ),
            )}
          </RecordClicks>
        </div>
      </div>
      <form className={css.form}>
        <div className={css.formgrid}>
          <RecordClicks widget="product overview" element="size selector">
            <select className={css.sizeselector} onChange={updateSelect}>
              {sizes.map((size, index) => (
                <option value={index} key={size.size}>
                  {size.size}
                </option>
              ))}
            </select>
          </RecordClicks>
          <RecordClicks widget="product overview" element="quantity selector">
            <select className={css.quantitySelector} onChange={updateQuantity}>
              {sizes[currentSelect].quantity.map(
                (qty) => (
                  <option
                    value={qty}
                    key={qty}
                  >
                    {qty}
                  </option>
                ),
              )}
            </select>
          </RecordClicks>
          <RecordClicks widget="product overview" element="add to cart">
            <button type="button" className={css.cartbutton} onClick={addToCart}>Add To Bag</button>
          </RecordClicks>
          {!outfits.includes(id)
            && (
            <RecordClicks widget="product overview" element="add to outifts">
              <button type="button" className={css.outfitbutton} onClick={addOutfit}><i aria-label="Save outfit" className="far fa-heart" /></button>
            </RecordClicks>
            )}
          {outfits.includes(id)
            && (
            <RecordClicks widget="product overview" element="add to outifts">
              <button type="button" className={css.outfitbutton} onClick={removeOutfit}><i aria-label="Unsave outfit" className="fas fa-heart" /></button>
            </RecordClicks>
            )}
        </div>
      </form>
    </div>
  );
}
StyleSelector.propTypes = {
  setStyleIndex: PropTypes.func.isRequired,
};
export default StyleSelector;
