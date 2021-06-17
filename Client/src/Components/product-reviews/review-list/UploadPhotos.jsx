import React, { useState } from "react";
import PropTypes from "prop-types";

// setPhoto is a setter function that passes the information to the NewReview.jsx file.
// UploadPhotos allows user to upload photos to their review and passes the data to a parent
// function using the setPhoto function.
function UploadPhotos({ setPhoto }) {
  // const [uploadPhoto, setPhoto] = useState("file");
  const [photoCollection, setPhotoCollection] = useState([]);
  function loadFile(event) {
    const image = document.getElementById(`output${photoCollection.length + 1}`);
    image.src = URL.createObjectURL(event.target.files[0]);
    setPhotoCollection([...photoCollection, image]);
    setPhoto(photoCollection);
  }

  return (
    <div>
      <form action="/action_page.php">
        {photoCollection.length < 5 && <input type="file" id="myFile" accept="image/*" name="image" onChange={loadFile} /> }
        <img id="output1" width="200" alt="user upload 1" />
        <img id="output2" width="200" alt="user upload 2" />
        <img id="output3" width="200" alt="user upload 3" />
        <img id="output4" width="200" alt="user upload 4" />
        <img id="output5" width="200" alt="user upload 5" />
      </form>
    </div>
  );
}

UploadPhotos.propTypes = {
  setPhoto: PropTypes.func.isRequired,
};

export default UploadPhotos;
