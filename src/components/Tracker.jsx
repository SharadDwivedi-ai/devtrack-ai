import React, { useEffect, useState } from "react";

const Tracker = () => {

  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState(null);

//   load from local storage on mount
    useEffect(() => {
        const savedStreak = JSON.parse(localStorage.getItem("streak"));
        const savedDate = localStorage.getItem("lastDate");

        if(savedStreak) setStreak(savedStreak);
        if(savedDate) setLastDate(savedDate);
    }, []);

    // save to local storage on streak change
    useEffect(() => {
        localStorage.setItem("streak", JSON.stringify(streak));
        if(lastDate) localStorage.setItem("lastDate", lastDate);
    }, [streak, lastDate]);

    