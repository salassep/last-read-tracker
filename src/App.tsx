import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [lastPage, setLastPage] = useState<number | null>(null);

  useEffect(() => {
    // Fetch the last page from Chrome storage
    chrome.storage.local.get(['lastPage'], (result) => {
      if (result.lastPage) {
        setLastPage(result.lastPage);
      }
    });
  }, []);

  return (
    <div className="App">
      <h2>PDF Page Tracker</h2>
      {lastPage !== null ? (
        <p>Last read page: {lastPage}</p>
      ) : (
        <p>No page data available</p>
      )}
    </div>
  );
};

export default App;
