// components/TaskDetails.tsx - Individual task details page

import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskContext';
import EditTaskForm from './EditTaskForm';
import { UpdateTaskInput } from '../types';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, updateTask, deleteTask, toggleTaskStatus } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);

  if (!id) {
    return (
      <div className="task-details error">
        <h2>Task Not Found</h2>
        <p>No task ID provided.</p>
        <Link to="/" className="btn btn-primary">
          Back to Tasks
        </Link>
      </div>
    );
  }

  const task = getTaskById(id);

  if (!task) {
    return (
      <div className="task-details error">
        <h2>Task Not Found</h2>
        <p>The task you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to Tasks
        </Link>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdateTask = (input: UpdateTaskInput) => {
    updateTask(input);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      deleteTask(task.id);
      navigate('/');
    }
  };

  const handleToggleStatus = () => {
    toggleTaskStatus(task.id);
  };

  if (isEditing) {
    return (
      <div className="task-details">
        <EditTaskForm
          task={task}
          onSubmit={handleUpdateTask}
          onCancel={handleCancelEdit}
        />
      </div>
    );
  }

  return (
    <div className="task-details">
      <div className="task-details-header">
        <Link to="/" className="back-link">
          ← Back to Tasks
        </Link>
      </div>

      <div className="task-details-content">
        <div className="task-details-main">
          <div className="task-status-section">
            <label className="status-toggle">
              <input
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={handleToggleStatus}
              />
              <span className="status-text">
                {task.status === 'completed' ? 'Completed' : 'Mark as Complete'}
              </span>
            </label>
            <span className={`status-badge ${task.status}`}>
              {task.status}
            </span>
          </div>

          <h1 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
            {task.title}
          </h1>

          <div className="task-description-section">
            <h3>Description</h3>
            <p className="task-description">{task.description}</p>
          </div>

          <div className="task-metadata">
            <div className="metadata-item">
              <strong>Created:</strong>
              <span>{task.createdAt.toLocaleDateString()} at {task.createdAt.toLocaleTimeString()}</span>
            </div>
            {task.updatedAt.getTime() !== task.createdAt.getTime() && (
              <div className="metadata-item">
                <strong>Last Updated:</strong>
                <span>{task.updatedAt.toLocaleDateString()} at {task.updatedAt.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="task-details-actions">
          <button onClick={handleEdit} className="btn btn-edit">
            Edit Task
          </button>
          <button onClick={handleDelete} className="btn btn-delete">
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;