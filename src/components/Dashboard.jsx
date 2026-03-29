import React from 'react';
import TaskManager from './TaskManager';

const Dashboard = () => {
    return (
        <div className="container mt-4">
            <h2>Dashboard 📊</h2>
            <div className="row mt-3">
                <div className="col-md-6">
                    <TaskManager />
                </div>
                <div className="col-md-6">
                    <div className='card p-3'>
                        <h4>Progress Overview</h4>
                        <p>Coming Soon...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;