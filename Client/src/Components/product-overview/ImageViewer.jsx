import React, { useState, useContext } from "react";
import DataContext from "../context";

function ImageViewer() {
  const data = useContext(DataContext);
  const { photos, name } = data.styles[data.styleIndex];
  const productName = data.product.name;
  const [thumb, setThumb] = useState(0);
  return (
    <div>
      <img src={photos[thumb].url} alt={productName} />
      <div className="thumbnails">
        {photos.map((photo, index) => (
          <img src={photo.thumbnail_url} alt={name} onClick={() => setThumb(index)} />
        ))}
      </div>
    </div>
  );
}

export default ImageViewer;
