import React, { useEffect, useRef, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Toolbar from './components/Toolbar';
import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const App: React.FC = () => {
  const [numPages, setNumPages] = useState<number>();
  const [activePage, setActivePage] = useState(1);
  const [threshold, setThreshold] = useState<number>();
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: threshold,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pageNumber = parseInt(entry.target.getAttribute('data-page-number')!);
          setActivePage(pageNumber);
        }
      });
    }, observerOptions);

    pageRefs.current.forEach((pageRef) => {
      if (pageRef) observer.observe(pageRef);
    });

    return () => {
      pageRefs.current.forEach((pageRef) => {
        if (pageRef) observer.unobserve(pageRef);
      });
    };
  }, [threshold]);

  function handleLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    pageRefs.current = new Array(numPages).fill(null);
  }

  function handleRenderSuccess() {
    const element = pageRefs.current[0];
    if (element) {
      const elementHeight = element.getBoundingClientRect().height;
      const viewportHeight = window.innerHeight;
      if (viewportHeight >= elementHeight) {
        setThreshold(1);
      } else {
        setThreshold(viewportHeight / elementHeight);
      }
    } else {
      setThreshold(0.5);
    }
  };

  return (
    <>
      <Toolbar 
        activePage={activePage}
      />
      <div className='pdf-container'>
        <Document
          className={'pdf-viewer'}
          file="https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf" 
          onLoadSuccess={handleLoadSuccess} 
          onLoadError={console.error}
        >
          {
            Array.from(new Array(numPages), (_el, index) => (
              <div
                key={`page_${index + 1}`}
                data-page-number={index + 1}
                ref={(el) => (pageRefs.current[index] = el)}
                >
                <Page
                  onRenderSuccess={handleRenderSuccess}
                  className={index > 0 ? 'page-divider' : ''}
                  pageNumber={index + 1} 
                />
              </div>
            ))
          }
        </Document>
      </div>
    </>
  );
};

export default App;
