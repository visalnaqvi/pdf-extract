import React, { useRef, useState } from 'react';
import styles from "./upload.module.css"
import {FaCloudUploadAlt} from "react-icons/fa"
const FileInput = ({handleSubmit , handleFileChange}) => {

  const [fileName , setFileName] = useState("")

  const fileInputRef = useRef(null);

  const handleFileInputChange = () => {
    const selectedFile = fileInputRef.current.files[0];
    if (selectedFile) {
        setFileName(selectedFile.name)
        handleFileChange(fileInputRef)
    }
  };

  return (
    <div className={styles.wrapper}>
        <p className={styles.fileName}>Select File</p>
      <label className={styles.label} htmlFor="fileInput">
        <div className={styles.upload}><FaCloudUploadAlt /></div>
      </label>
      <input
        type="file"
        id="fileInput"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
      {fileName &&
        <div className={styles.info}>
            <p className={styles.fileName}>Selected File: {fileName}</p>
            <button onClick={()=>{
              handleSubmit();
            }} className={styles.submitBtn}>Upload</button>
        </div>
      }
    </div>
  );
};

export default FileInput;