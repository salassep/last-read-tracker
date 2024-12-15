import React, { useState } from 'react';
import './popup-app.css';
import FileCard from '../components/cards/FileCard';

function getFileUrlFromLocalStorage(): string[] {
  return Object.keys(localStorage).filter((key) => !["disableAutosave", "autosaveExceptionFiles"].includes(key))
}

const PopupApp: React.FC = () => {
  const [fileUrls, setFileUrls] = useState<string[]>(getFileUrlFromLocalStorage());

  const handleDelete = (fileUrl: string) => {
    setFileUrls(
      fileUrls.filter((value) => value !== fileUrl)
    );
    localStorage.removeItem(fileUrl);
  }

  return (
    <div className="popup">
      <h1>Your Library</h1>
      {
        fileUrls.length > 0 ? (
          <ul>
            {fileUrls.map((fileUrl, i) => (
              <li key={i}>
                <FileCard 
                  fileUrl={fileUrl}
                  onDelete={handleDelete}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-text">No PDF files have been saved yet.</p>
        )
      }
      <div className="version">
        <p className="app-name">PDF Reader With Marker</p>
        <p>v0.0.1-beta</p>
      </div>
    </div>
  );
};

export default PopupApp;
