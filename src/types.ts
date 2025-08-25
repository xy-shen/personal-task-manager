// types.ts - Task-related TypeScript interfaces and types

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type TaskStatus = 'pending' | 'completed';
  
  export interface CreateTaskInput {
    title: string;
    description: string;
  }
  
  export interface UpdateTaskInput {
    id: string;
    title?: string;
    description?: string;
    status?: TaskStatus;
  }
  
  // Props interfaces for components
  export interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
  }
  
  export interface TaskFormProps {
    onSubmit: (input: CreateTaskInput) => void;
    onCancel?: () => void;
  }
  
  export interface EditTaskFormProps {
    task: Task;
    onSubmit: (input: UpdateTaskInput) => void;
    onCancel: () => void;
  }