import { useState, useEffect } from "react";

function getStorageValue(key: string) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
}

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};