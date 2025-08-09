import { useCallback, useState } from 'react';
import { LocalStorageService } from '@utils/localStorageService';
import { arrayMove } from '@dnd-kit/sortable';
import { initialColumns } from '@data/appData';

export const useColumnsState = initialValue => {
  const [columns, setColumns] = useState(() => {
    const savedColumns = LocalStorageService.get('taskBoardColumns');
    return savedColumns || initialValue || initialColumns;
  });

  const findColumn = useCallback(
    taskId => {
      const column = columns.find(column => column.tasks.some(task => task.id === taskId));
      return column?.id;
    },
    [columns]
  );

  const addNewColumn = useCallback(() => {
    setColumns(prev => [
      ...prev,
      {
        id: Date.now(),
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
                  id: Date.now(),
                  title: 'Заголовок задачи',
                  description: 'Описание задачи',
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : column;
      })
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
          : column
      )
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
          : column
      )
    );
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }) => {
      if (!over) return;

      const columnId = findColumn(active.id);
      if (!columnId) return;

      if (active.id !== over.id) {
        setColumns(prev =>
          prev.map(column => {
            if (column.id !== columnId) return column;
            const oldIndex = column.tasks.findIndex(task => task.id === active.id);
            const newIndex = column.tasks.findIndex(task => task.id === over.id);

            return {
              ...column,
              tasks: arrayMove(column.tasks, oldIndex, newIndex),
            };
          })
        );
      }
    },
    [findColumn]
  );

  const handleDragOver = useCallback(
    ({ active, over }) => {
      if (!over) return;
      const activeColumn = findColumn(active.id);
      const overColumn = findColumn(over.id) || over.id;

      if (!activeColumn || !overColumn || activeColumn === overColumn) return;

      setColumns(prev => {
        const activeCol = prev.find(col => col.id === activeColumn);
        if (!activeCol) return prev;
        const activeTask = activeCol.tasks.find(task => task.id === active.id);
        if (!activeTask) return prev;

        return prev.map(col => {
          if (col.id === activeColumn) {
            return {
              ...col,
              tasks: col.tasks.filter(task => task.id !== active.id),
            };
          }
          if (col.id === overColumn) {
            return {
              ...col,
              tasks: [...col.tasks, activeTask],
            };
          }
          return col;
        });
      });
    },
    [findColumn]
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
