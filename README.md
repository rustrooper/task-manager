# Task Manager - Board Application

## Overview

Task Manager is a React-based Kanban board application that allows users to organize tasks into customizable columns with drag-and-drop functionality. The application features task creation, editing, filtering, and organization with assignees and tags.

## Features

- **Drag-and-Drop Interface**: 
  - Reorder tasks within columns
  - Move tasks between columns
  - Smooth animations during drag operations

- **Task Management**:
  - Create, edit, and delete tasks
  - Add titles and descriptions
  - Assign tags to tasks
  - Assign team members to tasks

- **Column Management**:
  - Add new columns
  - Delete existing columns
  - Rename columns

- **Filtering and Search**:
  - Filter tasks by time period
  - Search across all tasks

- **Persistence**:
  - All data is saved to localStorage
  - State persists between sessions

## Technologies Used

- **Frontend**:
  - React 19
  - Vite (build tool)
  - SCSS for styling
  - @dnd-kit for drag-and-drop functionality

- **Key Dependencies**:
  - `@dnd-kit/core` and `@dnd-kit/sortable` for drag-and-drop
  - `date-fns` for date handling
  - `uuid` for ID generation
  - `react-router-dom` for routing

## Project Structure

```
/src
  /components
    Column.jsx
    Icon.jsx
    PeriodSelector.jsx
    SortableTaskCard.jsx
    TaskCard.jsx
    TagSelector.jsx
    Dropdown.jsx
    AssigneesSelector.jsx
  /data
    appData.js
  /helpers
    filterTasks.js
    useColumnsState.js
  /styles
    btn.scss
    (other SCSS files)
  /utils
    localStorageService.js
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev`: Starts the development server
- `npm run build`: Creates a production build
- `npm run lint`: Runs ESLint to check code quality
- `npm run preview`: Previews the production build locally

## Key Components

### Board Component
The main component that renders the entire Kanban board, including:
- Column management
- Task filtering
- Drag-and-drop context

### TaskCard Component
A memoized component that renders individual tasks with:
- Editable fields (title, description)
- Tag assignment
- Assignee management
- Delete functionality

### useColumnsState Custom Hook
Manages all state and logic for:
- Column operations (add, delete, update)
- Task operations (add, delete, update)
- Drag-and-drop handling
- LocalStorage persistence

## Custom Hooks

- `useColumnsState`: Central state management for columns and tasks
- Various utility hooks for drag-and-drop, filtering, etc.

## Data Management

- Initial data stored in `appData.js`
- Persistent storage using `LocalStorageService`
- UUID generation for all new items

## Styling

- SCSS modules for component-specific styles
- BEM methodology for class naming
- Responsive design considerations

## Future Improvements

- Add backend integration
- Implement user authentication
- Add due dates and reminders
- Enable task commenting
- Add dark mode support
- Implement keyboard shortcuts

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
