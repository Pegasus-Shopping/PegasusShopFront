import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import DataContext from "../context";
import css from "./styles.css";

function StyleSelector({ setStyleIndex }) {
  const data = useContext(DataContext);
  const { styleIndex, styles } = data;
  const [currentSelect, setCurrentSelect] = useState(0);
  const sizes = [];
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
        size: styles[styleIndex].skus[key].size,
        quantity: quantitySelector(styles[styleIndex].skus[key].quantity),
      });
    });
  };
  getSizes();
  const updateSelect = (e) => {
    // input: selector change event
    // output: new state
    // purpose: track which size is selected
    e.preventDefault();
    setCurrentSelect(e.target.value);
  };
  const updateStyle = (index) => {
    // input: button click event
    // output: new state (style selected)
    // purpose: track which style is selected
    // side effects: updates styleIndex, sizes array
    setStyleIndex(index);
    getSizes();
  };

  return (
    <div className={css.styleselectorgrid}>
      <span className={css.selectedstylename}>
        <b>{"STYLE > "}</b>
        {styles[styleIndex].name}
      </span>
      <div className={css.stylethumbs}>
        <div className={css.stylethumbsgrid}>
          {styles.map(
            (style, index) => (
              <div className={css.thumbnail}>
                {index === styleIndex
              && (
              <div className={css.check}>
                <i className="far fa-check-circle" />
              </div>
              )}
                <button type="button" className={css.stylebutton} onClick={() => (updateStyle(index))}>
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
        </div>
      </div>
      <form className={css.form}>
        <div className={css.formgrid}>
          <select className={css.sizeselector} onChange={updateSelect}>
            {sizes.map((size, index) => <option value={index} key={size.size}>{size.size}</option>)}
          </select>
          <select className={css.quantitySelector}>
            {sizes[currentSelect].quantity.map(
              (qty) => <option value={qty} key={qty}>{qty}</option>,
            )}
          </select>
          <button type="button" className={css.cartbutton}>Add To Bag</button>
          <button type="button" className={css.outfitbutton}><i aria-label="Save outfit" className="fa-regular fa-star" /></button>
        </div>
      </form>
    </div>
  );
}
StyleSelector.propTypes = {
  setStyleIndex: PropTypes.func.isRequired,
};
export default StyleSelector;
