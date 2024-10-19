import React, { useState } from 'react';
import { storage } from '../../../firebase';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            console.log("URL de la imagen subida:", url);
          });
      }
    );
  };

  return (
    <div>
      <progress value={progress} max="100" />
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Subir Imagen</button>
      <br />
      {url && <img src={url} alt="uploaded" />}
    </div>
  );
};

export default UploadImage;
