import { useState, useEffect } from "react";
export const useOrientation = () => {
  const [orientation, setOrientation] = useState("");

  useEffect(() => {
    function updateOrientation() {
      const regex = /(\S+)-/;
      const orient = window.screen.orientation.type.match(regex);
      setOrientation(orient[1]);
    }
    updateOrientation();
    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, [orientation]);

  return { orientation };
};
