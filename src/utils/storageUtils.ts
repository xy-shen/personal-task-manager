// utils/storageUtils.ts - Helper functions for localStorage operations

// Stored location: Browser's local storage on your hard drive
// Storage won't work cross-browser

import { Task } from '../types';

const STORAGE_KEY = 'personal-task-manager-tasks';

export const loadTasksFromStorage = (): Task[] | null => {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (!storedTasks) return null;

    const parsedTasks = JSON.parse(storedTasks);
    
    // Convert date strings back to Date objects
    return parsedTasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt)
    }));
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return null;
  }
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const clearTasksFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing tasks from localStorage:', error);
  }
};