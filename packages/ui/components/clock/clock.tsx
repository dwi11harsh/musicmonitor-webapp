import React, { useState, useEffect } from "react";

export const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const intervalID = setInterval(() => {
      const date = new Date();

      // Format the date to 'dd/mm/yyyy'
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      // Format the time to 'hrs:min:seconds'
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      const formattedTime = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return <span>{currentTime}</span>;
};
