import { useEffect, useRef, useState } from "react";
import './pop-over.css';
import useLocalStorage from "../../hooks/useLocalStorage";

export default function PopOver(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isAutosaveDisable, setIsAutosaveDisable] = useLocalStorage('disableAutosave', false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && event.target instanceof Node && !popoverRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="popover" ref={popoverRef}>
      <button onClick={togglePopover} style={{ cursor: 'pointer' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="#ffffffde" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2" />
        </svg>
      </button>
      {isOpen && (
        <ul className="popover-options">
          {isAutosaveDisable ? (
              <li onClick={() => setIsAutosaveDisable(false)}>Enable autosave</li>
          ) : (
              <li onClick={() => setIsAutosaveDisable(true)}>Disable autosave</li>
          )}
          <li>
            Disable autosave for this file
          </li>
        </ul>
      )}
    </div>
  );
}