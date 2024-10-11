import React, { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

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
      <Document file="https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf" onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
        {
          Array.from(new Array(numPages), (_el, index) => (
            <Page className={index > 0 ? 'page-divider' : ''} key={`page_${index + 1}`} pageNumber={index + 1} />
          ))
        }
      </Document>
    </div>
  );
};

export default App;
