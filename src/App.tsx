// App.tsx - Main application component with routing

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TaskProvider } from './contexts/TaskContext';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import AddTask from './components/AddTask';
import './App.css';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Router>
        <div className="app">
          <header className="app-header">
            <h1>Personal Task Manager</h1>
            <nav>
              <Link to="/" className="nav-link">Tasks</Link>
              <Link to="/add" className="nav-link">Add Task</Link>
            </nav>
          </header>

          <main className="app-main">
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/add" element={<AddTask />} />
              <Route path="/task/:id" element={<TaskDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TaskProvider>
  );
};

export default App;