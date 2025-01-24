import { useState, useEffect } from "react";

function Time () {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p className = 'text-3xl font-light text-white'>{currentTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default Time;
