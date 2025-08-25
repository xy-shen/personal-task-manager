// components/TaskItem.tsx - Individual task display component

import React from 'react';
import { Link } from 'react-router-dom';
import { TaskItemProps } from '../types';

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}) => {
  const handleToggleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent event bubbling
    onToggleStatus(task.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    onEdit(task);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete(task.id);
  };

  return (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-status">
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={handleToggleStatus}
            aria-label={`Mark task "${task.title}" as ${task.status === 'completed' ? 'pending' : 'completed'}`}
          />
        </div>
        
        <div className="task-info">
          <h3 className="task-title">
            <Link to={`/task/${task.id}`} className="task-link">
              {task.title}
            </Link>
          </h3>
          <p className="task-description">{task.description}</p>
          <div className="task-meta">
            <span className={`status-badge ${task.status}`}>
              {task.status}
            </span>
            <span className="task-date">
              Created: {task.createdAt.toLocaleDateString()}
            </span>
            {task.updatedAt.getTime() !== task.createdAt.getTime() && (
              <span className="task-date">
                Updated: {task.updatedAt.toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={handleEdit}
          className="btn btn-edit"
          aria-label={`Edit task "${task.title}"`}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-delete"
          aria-label={`Delete task "${task.title}"`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;