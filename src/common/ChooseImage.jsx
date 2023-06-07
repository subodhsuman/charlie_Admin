import React, { useState, useRef } from "react";
// import styles from './UploadImage.module.css'

const UploadImage = () => {

  const [file, setFile] = useState("images/cloud.svg");
  const imageRef = useRef();

  const showOpenFileDialog = () => {
    imageRef.current.click();
  };


  const handleChange = (event) => {
    let id=(event.target.id);
    const fileObject = event.target.files[0];
    if (!fileObject) return;
    setFile(URL.createObjectURL(event.target.files[0]));
    // uploadpic({fileObject,id})
  };


  return (
    <>
     
      <div className="choose_image"  onClick={showOpenFileDialog}>
          <span className="placeholder"  onChange={handleChange}>
            <div>
                <img  src={file} id="input" className="img-thumbnail" />
                <p className="mb-0">   Drop files to upload   or <span>Browse</span></p>
            </div>
          </span>
          <input type="file"  ref={imageRef}  id="input" accept="image/*"  onChange={handleChange}  hidden />
      </div>

      <label className="my-2">Browse Documents </label>
    
      
    </>
  );
};

export default UploadImage;