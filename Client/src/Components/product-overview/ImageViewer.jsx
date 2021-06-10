import React, { useState, useContext } from "react";
import DataContext from "../context";
import css from "./styles.css";

function ImageViewer() {
  const data = useContext(DataContext);
  const { photos, name } = data.styles[data.styleIndex];
  const productName = data.product.name;
  const [thumb, setThumb] = useState(0);
  const left = () => {
    // input: nothing
    // output: next index number
    // purpose: provide max index if index is 0
    if (thumb === 0) {
      return data.styles.length - 1;
    }
    return thumb - 1;
  };
  const right = () => {
    // input: nothing
    // output: next index number
    // purpose: provide 0 index if index is max
    if (thumb === data.styles.length - 1) {
      return 0;
    }
    return thumb + 1;
  };
  return (
    <div className={css.viewer}>
      <img className={css.mainImage} src={photos[thumb].url} alt={productName} />
      <button type="button" className={css.expander}>#</button>
      <div className={css.thumbnailPanel}>
        {photos.map((photo, index) => (
          <button className={css.thumb} type="button" onClick={() => setThumb(index)}>
            <img src={photo.thumbnail_url} alt={name} />
          </button>
        ))}
      </div>
      <button type="button" className={css.chevronLeft} onClick={() => setThumb(left)}>{"<"}</button>
      <button type="button" className={css.chevronRight} onClick={() => setThumb(right)}>{">"}</button>
    </div>
  );
}

export default ImageViewer;
