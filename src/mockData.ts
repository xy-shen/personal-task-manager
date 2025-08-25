// mockData.ts - Hardcoded mock data for initial tasks

import { Task } from './types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete React assignment',
    description: 'Build a personal task manager using React, TypeScript, and React Router',
    status: 'pending',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z')
  },
  {
    id: '2',
    title: 'Review code with peers',
    description: 'Set up PR reviews with other interns and review their code',
    status: 'pending',
    createdAt: new Date('2024-01-16T09:30:00Z'),
    updatedAt: new Date('2024-01-16T09:30:00Z')
  },
  {
    id: '3',
    title: 'Set up GitHub repository',
    description: 'Create public repo with proper branching strategy and issue tracking',
    status: 'completed',
    createdAt: new Date('2024-01-14T14:20:00Z'),
    updatedAt: new Date('2024-01-15T08:45:00Z')
  },
  {
    id: '4',
    title: 'Write project documentation',
    description: 'Create comprehensive README with setup instructions and project overview',
    status: 'pending',
    createdAt: new Date('2024-01-17T11:15:00Z'),
    updatedAt: new Date('2024-01-17T11:15:00Z')
  }
];