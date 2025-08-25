// components/EditTaskForm.tsx - Form component for editing existing tasks

import React, { useState, useEffect } from 'react';
import { EditTaskFormProps } from '../types';

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

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
        id: task.id,
        title: title.trim(),
        description: description.trim()
      });
    }
  };

  const handleReset = () => {
    setTitle(task.title);
    setDescription(task.description);
    setErrors({});
  };

  const hasChanges = title.trim() !== task.title || description.trim() !== task.description;

  return (
    <div className="task-form-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit} className="task-form" noValidate>
        <div className="form-group">
          <label htmlFor="edit-task-title" className="form-label">
            Task Title *
          </label>
          <input
            id="edit-task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`form-input ${errors.title ? 'error' : ''}`}
            placeholder="Enter task title..."
            maxLength={100}
            aria-describedby={errors.title ? 'edit-title-error' : undefined}
            required
          />
          {errors.title && (
            <span id="edit-title-error" className="error-message" role="alert">
              {errors.title}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="edit-task-description" className="form-label">
            Task Description *
          </label>
          <textarea
            id="edit-task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`form-textarea ${errors.description ? 'error' : ''}`}
            placeholder="Describe your task in detail..."
            rows={4}
            maxLength={500}
            aria-describedby={errors.description ? 'edit-description-error' : undefined}
            required
          />
          <div className="character-count">
            {description.length}/500 characters
          </div>
          {errors.description && (
            <span id="edit-description-error" className="error-message" role="alert">
              {errors.description}
            </span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!title.trim() || !description.trim() || !hasChanges}
          >
            Update Task
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
            disabled={!hasChanges}
          >
            Reset Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;