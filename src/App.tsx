import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const App: React.FC = () => {
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file="file:///C:/Users/Asus-GK/Downloads/sample.pdf" onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
        <Page pageNumber={1} />
      </Document>
      <p>
        Page {1} of {numPages}
      </p>
    </div>
  );
};

export default App;
