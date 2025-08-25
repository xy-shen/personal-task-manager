# Personal Task Manager

a small **React + JavaScript web application** that works as a personal task manager. This project demonstrates modern React + TypeScript development practices, state management, and component architecture.

## Features

- ✅ **Task Management**: Create, read, update, and delete tasks
- 🔄 **Status Tracking**: Toggle between pending and completed states
- 🎯 **Filtering**: View all tasks, only pending, or only completed
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Clean UI**: Simple, functional interface focused on usability
- 📄 **Task Details**: Individual pages for each task with full information

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v6
- **State Management**: React Context + useReducer
- **Styling**: CSS3 with responsive design
- **Build Tool**: Create React App
- **Version Control**: Git with feature branch workflow

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/xy-shen/personal-task-manager
   cd personal-task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

This creates a `build` folder with optimized production files.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddTask.tsx      # Add task page wrapper
│   ├── EditTaskForm.tsx # Task editing form
│   ├── TaskDetails.tsx  # Task detail page
│   ├── TaskForm.tsx     # New task creation form
│   ├── TaskItem.tsx     # Individual task display
│   └── TaskList.tsx     # Main task list view
├── contexts/            # React Context providers
│   └── TaskContext.tsx  # Task state management
├── utils/
│   └── storageUtils     # Helper functions for localStorage operations
├── App.css              # Application styles
├── App.tsx              # Main application component
├── index.tsx            # React application entry point
├── mockData.ts          # Initial task data
└── types.ts             # TypeScript interfaces
```

## Key Features Explained

### State Management
Uses React Context API with useReducer for predictable state updates:
- Actions: ADD_TASK, UPDATE_TASK, DELETE_TASK, TOGGLE_STATUS
- Immutable state updates
- Type-safe operations

### Routing
Implements client-side routing with React Router:
- `/` - Task list view
- `/add` - Add new task form
- `/task/:id` - Individual task details

### TypeScript Integration
- Strongly typed components and props
- Interface definitions for all data structures
- Type-safe state management

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interfaces


## Testing

The application has been tested on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)  

### Manual Testing Checklist
- [ ] Add new task
- [ ] Edit existing task
- [ ] Delete task
- [ ] Toggle task status
- [ ] Reset task to mock data
- [ ] Navigate between pages
- [ ] Responsive design on different screen sizes

## Author

Created as part of a frontend development interview take-home assignment.

---

## Assignment Requirements Checklist

### Core Features ✅
- [x] Display task list from mock data
- [x] Add new tasks via form
- [x] Edit existing tasks (title & description)
- [x] Delete tasks from list
- [x] Task status management (pending/completed)

### Technical Requirements ✅
- [x] React + TypeScript latest stable versions
- [x] React Router v6+ for navigation
- [x] React hooks for state management (no Redux)
- [x] Hardcoded mock data (no backend)
- [x] Clean, readable code with meaningful names
- [x] TypeScript interfaces for tasks and props
- [x] Documentation with setup instructions

### Development Practices ✅
- [x] Public GitHub repository
- [x] Feature branch workflow
- [x] Clear commit messages
- [x] Pull request workflow ready
- [x] Issue tracking setup
- [x] Cross-browser testing

### Optional Enhancements
- [x] localStorage persistence
- [ ] Advanced accessibility features
- [ ] Comprehensive test suite