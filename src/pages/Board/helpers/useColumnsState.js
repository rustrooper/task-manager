import { useCallback, useState, useEffect } from 'react';
import { LocalStorageService } from '@utils/localStorageService';
import { arrayMove } from '@dnd-kit/sortable';
import { initialColumns } from '@data/appData';
import { v4 as uuidv4 } from 'uuid';

export const useColumnsState = initialValue => {
  const [columns, setColumns] = useState(() => {
    const savedColumns = LocalStorageService.get('taskBoardColumns');
    return savedColumns || initialValue || initialColumns;
  });

  useEffect(() => {
    LocalStorageService.set('taskBoardColumns', columns);
  }, [columns]);

  const findColumn = useCallback(
    taskId => {
      const column = columns.find(column => column.tasks.some(task => task.id === taskId));
      return column?.id;
    },
    [columns],
  );

  const addNewColumn = useCallback(() => {
    setColumns(prev => [
      ...prev,
      {
        id: uuidv4(),
        title: `New Column ${prev.length + 1}`,
        tasks: [],
      },
    ]);
  }, []);

  const deleteColumn = useCallback(columnId => {
    setColumns(prev => prev.filter(column => column.id !== columnId));
  }, []);

  const updateColumn = useCallback(updatedColumn => {
    setColumns(prev => prev.map(column => (column.id === updatedColumn.id ? updatedColumn : column)));
  }, []);

  const addNewTask = useCallback(columnId => {
    setColumns(prev =>
      prev.map(column => {
        return column.id === columnId
          ? {
              ...column,
              tasks: [
                ...column.tasks,
                {
                  id: uuidv4(),
                  title: 'Заголовок задачи',
                  description: 'Описание задачи',
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : column;
      }),
    );
  }, []);

  const deleteTask = useCallback((columnId, taskId) => {
    setColumns(prev =>
      prev.map(column =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.filter(task => task.id !== taskId),
            }
          : column,
      ),
    );
  }, []);

  const updateTask = useCallback((columnId, updatedTask) => {
    setColumns(prev =>
      prev.map(column =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)),
            }
          : column,
      ),
    );
  }, []);

  const reorderTasksInColumn = (prevColumns, columnId, activeId, overId) => {
    return prevColumns.map(column => {
      if (column.id !== columnId) return column;
      const oldIndex = column.tasks.findIndex(task => task.id === activeId);
      const newIndex = column.tasks.findIndex(task => task.id === overId);

      return {
        ...column,
        tasks: arrayMove(column.tasks, oldIndex, newIndex),
      };
    });
  };

  const handleDragEnd = useCallback(
    ({ active, over }) => {
      if (!over) return;

      const columnId = findColumn(active.id);
      if (!columnId) return;

      if (active.id !== over.id) {
        setColumns(prev => reorderTasksInColumn(prev, columnId, active.id, over.id));
      }
    },
    [findColumn],
  );

  const moveTaskToAnotherColumn = (columns, activeColumnId, overColumnId, taskId) => {
    const sourceColumn = columns.find(col => col.id === activeColumnId);
    if (!sourceColumn) return columns;

    const taskToMove = sourceColumn.tasks.find(task => task.id === taskId);
    if (!taskToMove) return columns;

    return columns.map(column => {
      if (column.id === activeColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId),
        };
      }
      if (column.id === overColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, taskToMove],
        };
      }
      return column;
    });
  };

  const handleDragOver = useCallback(
    ({ active, over }) => {
      if (!over) return;
      const activeColumn = findColumn(active.id);
      const overColumn = findColumn(over.id) || over.id;

      if (!activeColumn || !overColumn || activeColumn === overColumn) return;

      setColumns(prev => moveTaskToAnotherColumn(prev, activeColumn, overColumn, active.id));
    },
    [findColumn],
  );

  return {
    columns,
    setColumns,
    addNewColumn,
    deleteColumn,
    updateColumn,
    addNewTask,
    deleteTask,
    updateTask,
    findColumn,
    handleDragEnd,
    handleDragOver,
  };
};
