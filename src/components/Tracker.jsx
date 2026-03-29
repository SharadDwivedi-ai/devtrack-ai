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

    const markDone = () => {
        const today = new Date().toDateString();

        if(lastDate === today) {
            alert("Already marked done for today!");
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if(lastDate === yesterday.toDateString()) {
            setStreak(streak + 1);
        } else {
            setStreak(1); //reset streak if not consecutive
        }

        setLastDate(today);
    };

    return (    
        <div className="card p-3 mt-3">
            <h4>Habit Tracker</h4>
            <p className="mt-2">
                Current Streak: <strong>{streak}</strong>
            </p>
            <button className="btn btn-success mt-2" onClick={markDone}>
                Mark Today Done     
            </button>
        </div>
    );
};

export default Tracker;