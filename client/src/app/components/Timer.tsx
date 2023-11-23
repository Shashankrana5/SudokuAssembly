import { useEffect, useState } from 'react';

const Timer = ({state}: {state: boolean}) => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
      let interval: NodeJS.Timeout;
  
      if (state) {
        interval = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
      }
  
      return () => clearInterval(interval);
    }, [state]);

  return (
<div id="counter-clock">
            

      {(Math.floor(seconds / 60) < 10) ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60)}:{(Math.floor(seconds % 60) < 10) ? "0"+Math.floor(seconds%60) : Math.floor(seconds%60)}

    </div>
  );
};

export default Timer;
