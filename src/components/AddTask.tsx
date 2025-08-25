// components/AddTask.tsx - Page wrapper for adding new tasks

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../contexts/TaskContext';
import TaskForm from './TaskForm';
import { CreateTaskInput } from '../types';

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const { addTask } = useTaskContext();

  const handleSubmit = (input: CreateTaskInput) => {
    addTask(input);
    navigate('/'); // Redirect to task list after adding
  };

  const handleCancel = () => {
    navigate('/'); // Go back to task list
  };

  return (
    <div className="add-task-page">
      <TaskForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default AddTask;