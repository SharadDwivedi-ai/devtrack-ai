import React, { useEffect, useState } from "react";

const TaskManager = ({ tasks, setTasks }) => {
    const [task, setTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [filter, setFilter] = useState("null");

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
        if (editIndex !== null) {
            const updated = [...tasks];
            updated[editIndex].text = task;
            setTasks(updated);
            setEditIndex(null);
        } else {
            const newTask = {
                text: task,
                date: new Date().toLocaleDateString(),
                completed: false,
            };
            setTasks([...tasks, newTask]);
        }

        setTask("");
    }
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const toggleComplete = (index) => {
        const updated = [...tasks];
        updated[index].completed = !updated[index].completed;
        setTasks(updated);
    };

    const filteredTasks = tasks.filter((t) => {
        if (filter === "completed") return t.completed;
        if (filter === "pending") return !t.completed;
        return true;
    });

    return (
        <div className="card p-4 shadow-sm rounded-4 border-0">
            <h4>Task Manager</h4>
            <div className="d-flex mt-2">
                <input
                    type="text"
                    className="form-control rounded-3 me-2"
                    placeholder="Add a new task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button className="btn btn-primary px-4" onClick={addTask}>
                    {editIndex != null ? "Update" : "Add"}
                </button>
            </div>

            {tasks.length === 0 && (
                <p className="text-muted mt-3">No tasks yet. Start adding 🚀</p>
            )}

            <div className="mt-3">
                <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => setFilter("all")}
                >
                    All
                </button>

                <button
                    className="btn btn-outline-success btn-sm me-2"
                    onClick={() => setFilter("completed")}
                >
                    Completed
                </button>

                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setFilter("pending")}
                >
                    Pending
                </button>
            </div>

            <ul className="list-group mt-3">
                {filteredTasks.map((t, index) => (
                    <li key={index}
                        className="list-group-item d-flex justify-content-between align-items-center rounded-3 mb-2 border-2">
                        <div>
                            <input
                                type="checkbox"
                                className="form-check-input border-2 me-2"
                                checked={t.completed}
                                onChange={() => toggleComplete(index)}
                            />
                            <span style={{
                                textDecoration: t.completed ? "line-through" : "none",
                                opacity: t.completed ? 0.6 : 1,
                            }}>
                                {t.text}
                            </span>

                            <br />
                            <small className="text-muted">{t.date}</small>
                        </div>
                        <div>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => {
                                    setTask(t.text);
                                    setEditIndex(index);
                                }}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteTask(index)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default TaskManager;