import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { FcDocument } from 'react-icons/fc';
import { pdfjs } from 'react-pdf';
import PDFGrid from '../pdfGrid/PDFGrid.js';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
const Pages = ({ count , handleExtraction , pdfFile }) => {
  const pageNumbers = Array.from({ length: count }, (_, index) => index + 1);

  const [selectedPages , setSeletedPages] = useState([]);
  const handleCheckBoxChange = (e)=>{
    if(!e.target.checked){
        let newPages = selectedPages.filter(i => i != e.target.value);
        setSeletedPages(newPages)
    }else{
        setSeletedPages([...selectedPages , e.target.value])
    }
  }





  const handleSubmit = ()=>{
    let pagesToRemove = pageNumbers.filter(p => !selectedPages.includes(p.toString()))
    handleExtraction(pagesToRemove)
    setSeletedPages([])

  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardHeader}>
        <h1>
          Select pages that you want to extract
        </h1>
        <button onClick={()=>handleSubmit()} className={styles.submitButton}>Create New PDF</button>
      </div>
   {pdfFile &&   <div className={styles.cardHolder}>
        {pageNumbers.map((pageNumber) => (
          <div className={styles.card} key={pageNumber}>
          
            <label htmlFor={`${pageNumber}check`}><PDFGrid pdfFile={pdfFile} page={pageNumber} /></label>
            <input
              name="pageNumber"
              type="checkbox"
              id={`${pageNumber}check`}
              value={pageNumber}
              onChange={e=>handleCheckBoxChange(e)}
            />
            <label style={{ marginLeft: '5px', cursor: 'pointer' }} htmlFor={`${pageNumber}check`}>
              Page {pageNumber}
            </label>
          </div>
        ))}
        
         <button onClick={()=>handleSubmit()} className={styles.submitButton}>Create New PDF</button>
      </div>}
    </div>
  );
};

export default Pages;
