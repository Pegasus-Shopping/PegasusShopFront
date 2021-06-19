import React, { useContext } from "react";
import PropTypes from "prop-types";
import DataContext from "../context";
import css from "./styles.css";
import RecordClicks from "../RecordClicks";
import { left, right } from "./helper-functions";

function ImageViewer({ thumb, setThumb, toggleExpanded }) {
  const data = useContext(DataContext);
  const { photos, name } = data.styles[data.styleIndex];
  const productName = data.product.name;
  return (
    <div className={css.viewer}>
      <img className={css.mainImage} src={photos[thumb].url} alt={productName} />
      <button type="button" className={css.expander} onClick={() => toggleExpanded(true)}><i aria-label="expand image" className="fas fa-expand" /></button>
      <div className={css.thumbnailPanel}>
        <div className={css.thumbnailPanelGrid}>
          {photos.map((photo, index) => (
            ((thumb <= 4
              && index <= 4)
                || (thumb > 4
                  && index >= thumb - 4
                  && index <= thumb))
            && (
              <RecordClicks widget="product overview" element="toggle thumb">
                <div>
                  {index === thumb
                    && (
                    <button className={css.thumbselected} type="button" onClick={() => setThumb(index)} key={JSON.stringify(photo)}>
                      <img className={css.thumbimage} src={photo.thumbnail_url} alt={name} />
                    </button>
                    )}
                  {index !== thumb
                  && (
                  <button className={css.thumb} type="button" onClick={() => setThumb(index)} key={JSON.stringify(photo)}>
                    <img className={css.thumbimage} src={photo.thumbnail_url} alt={name} />
                  </button>
                  )}
                </div>
              </RecordClicks>
            )))}
        </div>
      </div>
      <RecordClicks widget="product overview" element="toggle left">
        <button type="button" className={css.chevronLeft} onClick={() => setThumb(left(thumb, photos.length - 1))}><i aria-label="Toggle left" className="fas fa-chevron-left" /></button>
      </RecordClicks>
      <RecordClicks widget="product overview" element="toggle right">
        <button type="button" className={css.chevronRight} onClick={() => setThumb(right(thumb, photos.length - 1))}><i aria-label="Toggle right" className="fas fa-chevron-right" /></button>
      </RecordClicks>
    </div>
  );
}
ImageViewer.propTypes = {
  thumb: PropTypes.number.isRequired,
  setThumb: PropTypes.func.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
};
export default ImageViewer;
