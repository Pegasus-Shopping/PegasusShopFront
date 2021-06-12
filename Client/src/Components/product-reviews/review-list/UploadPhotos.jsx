import React from "react";

function UploadPhotos() {
  // const [uploadPhoto, setPhoto] = useState("file");
  const photoCollection = [];
  function loadFile(event) {
    const image = document.getElementById(`output${photoCollection.length + 1}`);
    image.src = URL.createObjectURL(event.target.files[0]);
    photoCollection.push(image);
  }

  function onSubmit() {
    console.log("this is photoCollection: ", photoCollection);
  }

  return (
    <div>
      <form action="/action_page.php">
        <input type="file" id="myFile" accept="image/*" name="image" onChange={loadFile} />
        <img id="output1" width="200" alt="user upload 1" />
        <img id="output2" width="200" alt="user upload 2" />
        <img id="output3" width="200" alt="user upload 3" />
        <img id="output4" width="200" alt="user upload 4" />
        <img id="output5" width="200" alt="user upload 5" />
      </form>
      <input type="button" value="submit" onClick={onSubmit} />
    </div>
  );
}

export default UploadPhotos;
