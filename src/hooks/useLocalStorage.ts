import { useState, useEffect } from 'react';
import { State } from '../types/state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isState(obj: any): obj is State {
  return (
    obj &&
    typeof obj === "object" &&
    "activePage" in obj &&
    typeof obj.activePage === "number" &&
    "rotate" in obj &&
    typeof obj.rotate === "number" &&
    "scale" in obj &&
    typeof obj.scale === "number"
  );
}

function isAutosaveDisable(fileName: string): boolean {
  const disableAutosave = localStorage.getItem('disableAutosave');
  if (disableAutosave && JSON.parse(disableAutosave)) {
    return true;
  }

  const exceptionFiles = localStorage.getItem('autosaveExceptionFiles');
  if (exceptionFiles) {
    const parsedExceptionFiles: string[] = JSON.parse(exceptionFiles);
    if (parsedExceptionFiles.includes(fileName)) {
      return true;
    }
  }

  return false;
}

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (isState(defaultValue) && isAutosaveDisable(key)) return defaultValue;

    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue) as T;
    }
    
    return defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return;
    if (isState(value) && isAutosaveDisable(key)) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}
