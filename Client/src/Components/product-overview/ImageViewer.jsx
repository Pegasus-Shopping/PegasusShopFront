import React, { useContext } from "react";
import PropTypes from "prop-types";
import DataContext from "../context";
import css from "./styles.css";
import { left, right } from "./helper-functions";

function ImageViewer(props) {
  const { thumb, setThumb, toggleExpanded } = props;
  const data = useContext(DataContext);
  const { photos, name } = data.styles[data.styleIndex];
  const productName = data.product.name;
  return (
    <div className={css.viewer}>
      <img className={css.mainImage} src={photos[thumb].url} alt={productName} />
      <button type="button" className={css.expander} onClick={() => toggleExpanded(1)}><i aria-label="expand image" className="fas fa-expand" /></button>
      <div className={css.thumbnailPanel}>
        <div className={css.thumbnailPanelGrid}>
          {photos.map((photo, index) => (
            <button className={css.thumb} type="button" onClick={() => setThumb(index)}>
              <img className={css.thumbimage} src={photo.thumbnail_url} alt={name} />
            </button>
          ))}
        </div>
      </div>
      <button type="button" className={css.chevronLeft} onClick={() => setThumb(left(thumb, data.styles.length - 1))}><i aria-label="Toggle left" className="fas fa-chevron-left" /></button>
      <button type="button" className={css.chevronRight} onClick={() => setThumb(right(thumb, data.styles.length - 1))}><i aria-label="Toggle right" className="fas fa-chevron-right" /></button>
    </div>
  );
}
ImageViewer.propTypes = {
  thumb: PropTypes.number.isRequired,
  setThumb: PropTypes.func.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
};
export default ImageViewer;
