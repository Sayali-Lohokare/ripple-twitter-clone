import { useState, type Dispatch, type SetStateAction } from "react";

export function useLocalStorage<T>(keyName: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue: Dispatch<SetStateAction<T>> = (newValue) => {
    console.log('new value', newValue);
    try {
      const valueToStore = newValue instanceof Function ? newValue(storedValue) : newValue;
      window.localStorage.setItem(keyName, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (err) {
      console.log(err);
    }
  };

  return [storedValue, setValue];
}