"use client";
import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
      // if (value) {
      //   return JSON.parse(value);
      // } else {
      //   localStorage.setItem(key, JSON.stringify(initialValue));
      //   return initialValue;
      // }
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setLocalStorageStateValue = (value) => {
    // let newValue;
    // if (typeof value === "function") {
    //   const fn = value;
    //   newValue = fn(localStorageValue);
    // } else {
    //   newValue = value;
    // }
    try {
      const storeThisValue =
        value instanceof Function ? value(localStorageValue) : value;
      setLocalStorageValue(storeThisValue);
      localStorage.setItem(key, JSON.stringify(storeThisValue));
    } catch (error) {
      console.log(error);
    }
    // localStorage.setItem(key, JSON.stringify(initialValue));
    // setLocalStorageValue(newValue);
  };

  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
