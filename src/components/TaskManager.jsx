import React, { useEffect, useState } from "react";

const TaskManager = () => {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    //   Load tasks from local storage on component mount
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) setTasks(savedTasks);
    }, []);
    // Save tasks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    //   Add a new task to the list and save to local storage       
    const addTask = () => {
        if (task.trim() === "") return;
        setTasks([...tasks, task]);
        setTask("");
    }
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div className="card p-3">
            <h4>Task Manager</h4>
            <div className="d-flex mt-2">
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Add a new task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addTask}>
                    Add
                </button>
            </div>
            <ul className="list-group mt-3">
                {tasks.map((t, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {t}
                        <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default TaskManager;