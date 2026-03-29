import React, { useState, useEffect } from "react";
import TaskManager from "./TaskManager";
import Tracker from "./Tracker";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    });

    const [filter, setFilter] = useState("all");
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedTasks =
                JSON.parse(localStorage.getItem("tasks")) || [];
            setTasks(updatedTasks);
        };

        window.addEventListener("storage", handleStorageChange);

        return () =>
            window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Load tasks from localStorage
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
    }, []);

    // Filter tasks based on button
    const filteredTasks = tasks.filter((t) => {
        if (filter === "completed") return t.completed;
        if (filter === "pending") return !t.completed;
        return true;
    });

    // Create chart data
    const counts = {};

    filteredTasks.forEach((task) => {
        counts[task.date] = (counts[task.date] || 0) + 1;
    });

    const allTasks = tasks.length;
const completedTasks = tasks.filter((t) => t.completed).length;
const pendingTasks = allTasks - completedTasks;

const chartData = {
  labels: ["All", "Completed", "Pending"],
  datasets: [
    {
      label: "Task Performance",
      data: [allTasks, completedTasks, pendingTasks],
      backgroundColor: [
        "#007bff", // blue
        "#28a745", // green
        "#6c757d", // gray
      ],
      borderRadius: 8,
    },
  ],
};

    return (
        <div className="container mt-4">
            <h2 className="gradient-text mb-4">Dashboard 📊</h2>

            <div className="row">

                {/* LEFT SIDE */}
                <div className="col-md-6">
                    <TaskManager tasks={tasks} setTasks={setTasks} />
                    <Tracker />
                </div>

                {/* RIGHT SIDE */}
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm rounded-4 border-0">

                        <h4 className="mb-3">📊 Task Performance</h4>

                        {/* CHART */}
                        {chartData.labels.length > 0 ? (
                            <Bar data={chartData} />
                        ) : (
                            <p className="text-muted">No data available</p>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;