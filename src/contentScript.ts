// src/contentScript.ts

const observePDF = () => {
  const pdfViewer = document.querySelector('embed[type="application/pdf"], iframe[src*=".pdf"]');
  
  if (pdfViewer) {
    // Function to get the current page
    const getCurrentPage = () => {
      return Math.floor(pdfViewer.scrollTop / pdfViewer.clientHeight) + 1;
    };

    // Save the page when scrolling
    pdfViewer.addEventListener('scroll', () => {
      const currentPage = getCurrentPage();
      chrome.runtime.sendMessage({ page: currentPage });
    });

    // Save the page when the tab is closed or reloaded
    window.addEventListener('beforeunload', () => {
      const currentPage = getCurrentPage();
      chrome.runtime.sendMessage({ page: currentPage });
    });
  }
};

// Call observePDF when the content script is injected
observePDF();
