// components/TaskForm.tsx - Form component for creating new tasks

import React, { useState } from 'react';
import { TaskFormProps } from '../types';

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { title?: string; description?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        title: title.trim(),
        description: description.trim()
      });
      
      // Reset form after successful submission
      setTitle('');
      setDescription('');
      setErrors({});
    }
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setErrors({});
  };

  return (
    <div className="task-form-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="task-form" noValidate>
        <div className="form-group">
          <label htmlFor="task-title" className="form-label">
            Task Title *
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Enter task title..."
            maxLength={100}
            aria-describedby={errors.title ? 'title-error' : undefined}
            required
          />
          {errors.title && (
            <span id="title-error" className="error-message" role="alert">
              {errors.title}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="task-description" className="form-label">
            Task Description *
          </label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            placeholder="Describe your task in detail..."
            rows={4}
            maxLength={500}
            aria-describedby={errors.description ? 'description-error' : undefined}
            required
          />
          <div className="character-count">
            {description.length}/500 characters
          </div>
          {errors.description && (
            <span id="description-error" className="error-message" role="alert">
              {errors.description}
            </span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!title.trim() || !description.trim()}
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
          >
            Clear Form
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-cancel"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;