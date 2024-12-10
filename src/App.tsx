import React, { useEffect, useRef, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import Toolbar from './components/Toolbar';
import useLocalStorage from './hooks/useLocalStorage';
import { State } from './types/state';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './App.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function getFileUrl(): string {
  return new URL(window.location.href).searchParams.get('url')!;
}

const App: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentState, setCurrentState] = useLocalStorage<State>(getFileUrl(), { activePage: 1, rotate: 0, scale: 1 });
  const [defaultPage, setDefaultPage] = useState<number>(1);
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
          setCurrentState(prevState => ({...prevState, activePage: pageNumber}))
          setDefaultPage(pageNumber)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (currentState.activePage > 1) {
      scrollToPage();
    }
  };

  function handleRotate() {
    const degree = currentState.rotate + 90;
    if (degree >= 360) {
      setCurrentState(prevState => ({...prevState, rotate: 0}));
    } else {
      setCurrentState(prevState => ({...prevState, rotate: degree}));
    }
  }

  function handleAddScale() {
    setCurrentState(prevState => ({...prevState, scale: prevState.scale + 0.1}));
  }

  function handleSubtractScale() {
    setCurrentState(prevState => ({...prevState, scale: prevState.scale - 0.1}));
  }

  function scrollToPage() {
    const pageElement = document.querySelector(`[data-page-number="${currentState.activePage}"]`)
    if (pageElement) {
      pageElement.scrollIntoView(true)
    }
  }

  function handlePageChange(page: number | null) {
    setCurrentState(prevState => ({...prevState, activePage: page!}));
  }

  function handleSubmitPageChange() {
    if (!currentState.activePage || currentState.activePage < 0) {
      setCurrentState(prevState => ({...prevState, activePage: defaultPage!}));
    }

    if (currentState.activePage > numPages!) {
      setCurrentState(prevState => ({...prevState, activePage: numPages}));
    }

    scrollToPage();
  }

  return (
    <>
      <Toolbar 
        onRotate={() => handleRotate()}
        activePage={currentState.activePage}
        totalPages={numPages!}
        scale={currentState.scale}
        onPageChange={handlePageChange}
        onSubmitPageChange={handleSubmitPageChange}
        fileUrl={getFileUrl()}
        onAddScale={handleAddScale}
        onSubtractScale={handleSubtractScale}
      />
      <div className='pdf-container'>
        <Document
          className={'pdf-viewer'}
          file={getFileUrl()} 
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
                  rotate={currentState.rotate}
                  onRenderSuccess={handleRenderSuccess}
                  className={index > 0 ? 'page-divider' : ''}
                  pageNumber={index + 1} 
                  scale={currentState.scale}
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
