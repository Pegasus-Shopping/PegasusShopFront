import React, { useContext } from "react";
import PropTypes from "prop-types";
import DataContext from "../context";
import css from "./styles.css";
import { left, right } from "./helper-functions";
import RecordClicks from "../RecordClicks";

function ImageExpander({ thumb, setThumb, toggleExpanded }) {
  const { styles, styleIndex } = useContext(DataContext);
  const { url } = styles[styleIndex].photos[thumb];
  const moveZoom = (e) => {
    e.preventDefault();
    const bbox = e.target.getBoundingClientRect();
    const mouseX = e.clientX - bbox.left;
    const mouseY = e.clientY - bbox.top;
    const xPercent = (mouseX / bbox.width) * 100;
    const yPercent = (mouseY / bbox.height) * 100;
    const image = document.getElementById("image");
    image.style.transformOrigin = (`${xPercent}% ${yPercent}%`);
  };
  return (
    <div className={css.expandedGrid}>
      <RecordClicks widget="product overview" element="exit expander">
        <button type="button" className={css.exitExpander} onClick={() => toggleExpanded(false)}><i aria-label="Close expanded image" className="far fa-times-circle" /></button>
      </RecordClicks>
      <RecordClicks widget="product overview" element="toggle left expander">
        <button type="button" className={css.chevronLeftExpander} onClick={() => setThumb(left(thumb, styles.length - 1))}><i aria-label="Toggle left" className="fas fa-chevron-left" /></button>
      </RecordClicks>
      <RecordClicks widget="product overview" element="toggle right expander">
        <button type="button" className={css.chevronRightExpander} onClick={() => setThumb(right(thumb, styles.length - 1))}><i aria-label="Toggle right" className="fas fa-chevron-right" /></button>
      </RecordClicks>
      <RecordClicks widget="product overview" element="toggle zoom">
        <input type="checkbox" id="zoom" className={css.zoomIn} />
        <label htmlFor="zoom" className={css.expandedImage}>
          <img onMouseOver={moveZoom} onMouseMove={moveZoom} onFocus={moveZoom} id="image" src={url} className={css.expandedImage} alt={styles[styleIndex].name} />
        </label>
      </RecordClicks>
    </div>
  );
}
ImageExpander.propTypes = {
  thumb: PropTypes.number.isRequired,
  setThumb: PropTypes.func.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
};
export default ImageExpander;
