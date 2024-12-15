import React from 'react';
import './popup-app.css';

const PopupApp: React.FC = () => {
  return (
    <div className="popup">
      <h1>Your Library</h1>
      <ul>
        <li>
          <div>
            <p>this is the name of the pdf example but i think you know it.pdf</p>
            <div className="action">
              <span>Open</span>
              <span>Delete</span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <p>this is the name of the pdf example but i think you know it.pdf</p>
            <div className="action">
              <span>Open</span>
              <span>Delete</span>
            </div>
          </div>
        </li>
        <li>
          <div>
            <p>this is the name of the pdf example but i think you know it.pdf</p>
            <div className="action">
              <span>Open</span>
              <span>Delete</span>
            </div>
          </div>
        </li>
      </ul>
      <div className="version">
        <p className="app-name">PDF Reader With Marker</p>
        <p>v0.0.1-beta</p>
      </div>
    </div>
  );
};

export default PopupApp;
