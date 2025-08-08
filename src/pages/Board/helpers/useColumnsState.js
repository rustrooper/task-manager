// useColumnsState.js
import { useCallback, useState, useEffect } from 'react';
import { LocalStorageService } from '@utils/localStorageService';
import { arrayMove } from '@dnd-kit/sortable';
import { initialColumns } from '@data/appData';

export const useColumnsState = initialValue => {
  const [columns, setColumns] = useState(() => {
    const savedColumns = LocalStorageService.get('taskBoardColumns');
    return savedColumns || initialValue || initialColumns;
  });

  // Сохраняем колонки в localStorage при изменении
  useEffect(() => {
    LocalStorageService.set('taskBoardColumns', columns);
  }, [columns]);

  // Находим колонку по id задачи
  const findColumn = useCallback(
    taskId => {
      const column = columns.find(column => column.tasks.some(task => task.id === taskId));
      return column?.id;
    },
    [columns]
  );

  // Добавление новой колонки
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

  // Удаление колонки
  const deleteColumn = useCallback(columnId => {
    setColumns(prev => prev.filter(column => column.id !== columnId));
  }, []);

  // Обновление колонки
  const updateColumn = useCallback(updatedColumn => {
    setColumns(prev => prev.map(column => (column.id === updatedColumn.id ? updatedColumn : column)));
  }, []);

  // Добавление новой задачи
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

  // Удаление задачи
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

  // Обновление задачи
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

  // Обработчик перемещения задачи между колонками
  const handleTaskMoveBetweenColumns = useCallback(
    (active, over) => {
      const activeColumn = findColumn(active.id);
      const overColumn = findColumn(over.id) || over.id;

      if (!activeColumn || !overColumn || activeColumn.id === overColumn) return;

      setColumns(prev => {
        const activeCol = prev.find(col => col.id === activeColumn.id);
        const activeTask = activeCol.tasks.find(task => task.id === active.id);

        return prev.map(col => {
          if (col.id === activeColumn.id) {
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

  // Обработчик изменения порядка задач внутри колонки
  const handleTaskReorderInColumn = useCallback((columnId, active, over) => {
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
  }, []);

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
    handleTaskMoveBetweenColumns,
    handleTaskReorderInColumn,
  };
};
