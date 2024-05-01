/** @format */
import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    // Define the callback inside the useEffect hook
    const callBack = (e) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    // Add the event listener
    document.addEventListener("keydown", callBack);

    // Return a cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", callBack);
    };
  }, [action, key]);
}
