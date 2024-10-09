import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pdfUrl = urlParams.get('url');
    if (pdfUrl) {
      setPdfFile(pdfUrl);
    }
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="pdf-viewer">
      {pdfFile ? (
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

ReactDOM.render(<PDFViewer />, document.getElementById('root'));