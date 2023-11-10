import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

function PDFGrid({page , pdfFile}) {
//   const [numPages, setNumPages] = useState();
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }
useEffect(()=>{
  console.log(pdfFile)
},[pdfFile])
  return (
    <>
    {pdfFile && <div>
      <Document file={pdfFile}>
        <Page width={250} pageNumber={page} renderAnnotationLayer={false} renderTextLayer={false}/>
      </Document>
    </div>}
    </>
  );
}

export default PDFGrid;