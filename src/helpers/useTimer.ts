/*
    Extracted from this repo:
        https://github.com/MateCon/useTimer
*/
import { useState, useEffect, useCallback } from "react";

const useTimer = (tickRate = 1000) => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const getTime = () => {
    let milliseconds = time,
      seconds = 0,
      minutes = 0,
      hours = 0;

    if (milliseconds >= 3600000) {
      hours = Math.floor(milliseconds / 3600000);
      milliseconds -= hours * 3600000;
    }

    if (milliseconds >= 60000) {
      minutes = Math.floor(milliseconds / 60000);
      milliseconds -= minutes * 60000;
    }

    if (milliseconds >= 1000) {
      seconds = Math.floor(milliseconds / 1000);
      milliseconds -= seconds * 1000;
    }

    return {
      milliseconds,
      seconds,
      minutes,
      hours
    };
  };

  const addTime = useCallback((time: number) => {
    setTime(prevTime => prevTime + time);
  }, []);

  const getTimeFormatted = (precision: number): string => {
    const format = (n: number, digits: number) => {
      let str = String(n);
      while (str.length < digits) str = "0" + str;
      return str;
    };

    const { hours, minutes, seconds, milliseconds } = getTime();
    let string = `
      ${format(hours, 2)}:${format(minutes, 2)}:${format(seconds, 2)}`;

    if (precision === 0) return string;
    if (precision > 0 || precision < 4)
      string +=
        "." +
        format(
          Math.floor(milliseconds / Math.pow(10, 3 - precision)),
         precision 
        );
    return string;
  };

  const resume = useCallback(() => setIsRunning(true), [setIsRunning]);
  const stop = useCallback(() => setIsRunning(false), [setIsRunning]);
  const restart = useCallback(() => setTime(0), [setTime]);

  useEffect(() => {
    let prev = Date.now();
    let interval: any = { current: null };

    interval.current = setInterval(() => {
      const delta = Date.now() - prev;
      if (isRunning) setTime((time) => time + delta);
      prev = Date.now();
    }, tickRate);

    return () => {
      clearInterval(interval.current);
      interval.current = null;
    };
  }, [setTime, tickRate, isRunning]);

  return {
    ...getTime(),
    addTime,
    getTimeFormatted,
    isRunning,
    resume,
    stop,
    restart
  };
};

export default useTimer;
