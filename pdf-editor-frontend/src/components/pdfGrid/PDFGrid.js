import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

function PDFGrid({page , pdfFile}) {

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