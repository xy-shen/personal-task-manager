// components/TaskList.tsx - Main component to display list of tasks

import React, { useState, useMemo } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import TaskItem from './TaskItem';
import EditTaskForm from './EditTaskForm';
import { Task, UpdateTaskInput } from '../types';

const TaskList: React.FC = () => {
  const { tasks, updateTask, deleteTask, toggleTaskStatus } = useTaskContext();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Filter tasks based on selected filter
  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    return tasks.filter(task => task.status === filter);
  }, [tasks, filter]);

  // Sort tasks: pending first, then by creation date (newest first)
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === 'pending' ? -1 : 1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filteredTasks]);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (input: UpdateTaskInput) => {
    updateTask(input);
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleToggleStatus = (id: string) => {
    toggleTaskStatus(id);
  };

  if (editingTask) {
    return (
      <EditTaskForm
        task={editingTask}
        onSubmit={handleUpdateTask}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <div className="task-filters">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending ({tasks.filter(t => t.status === 'pending').length})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed ({tasks.filter(t => t.status === 'completed').length})
          </button>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks found. {filter !== 'all' && `Try changing the filter or `}Add your first task to get started!</p>
        </div>
      ) : (
        <div className="tasks-container">
          {sortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;