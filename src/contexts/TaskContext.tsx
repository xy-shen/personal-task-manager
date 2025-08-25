// contexts/TaskContext.tsx - Context for managing task state across components

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types';
import { mockTasks } from '../mockData';
import { loadTasksFromStorage, saveTasksToStorage } from '../utils/storageUtils';

// Action types for the reducer
type TaskAction =
  | { type: 'ADD_TASK'; payload: CreateTaskInput }
  | { type: 'UPDATE_TASK'; payload: UpdateTaskInput }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_STATUS'; payload: string };

// Context interface
interface TaskContextType {
  tasks: Task[];
  addTask: (input: CreateTaskInput) => void;
  updateTask: (input: UpdateTaskInput) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Reducer function to handle task state changes
const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask: Task = {
        id: Date.now().toString(), // Simple ID generation
        title: action.payload.title,
        description: action.payload.description,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      return [...state, newTask];

    case 'UPDATE_TASK':
      return state.map(task =>
        task.id === action.payload.id
          ? {
              ...task,
              ...action.payload,
              updatedAt: new Date()
            }
          : task
      );

    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);

    case 'TOGGLE_STATUS':
      return state.map(task =>
        task.id === action.payload
          ? {
              ...task,
              status: task.status === 'pending' ? 'completed' : 'pending',
              updatedAt: new Date()
            }
          : task
      );

    default:
      return state;
  }
};

// Provider component
export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize tasks from localStorage or use mock data as fallback
  const initializeTasks = (): Task[] => {
    const storedTasks = loadTasksFromStorage();
    return storedTasks || mockTasks;
  };

  const [tasks, dispatch] = useReducer(taskReducer, [], initializeTasks);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const addTask = (input: CreateTaskInput) => {
    dispatch({ type: 'ADD_TASK', payload: input });
  };

  const updateTask = (input: UpdateTaskInput) => {
    dispatch({ type: 'UPDATE_TASK', payload: input });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleTaskStatus = (id: string) => {
    dispatch({ type: 'TOGGLE_STATUS', payload: id });
  };

  const getTaskById = (id: string): Task | undefined => {
    return tasks.find(task => task.id === id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        getTaskById
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the task context
export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};