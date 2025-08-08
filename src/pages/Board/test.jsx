import { Column } from '@components/Column';
import { Icon } from '@components/Icon';
import './styles.scss';
import '@styles/btn.scss';
import { PeriodSelector } from '@components/PeriodSelector';
import { SortableTaskCard } from '@components/SortableTaskCard';
import { TaskCard } from '@components/TaskCard';
import { periodOptions, users, tags, initialColumns } from '@data/appData';
import { DndContext, closestCorners, useSensor, useSensors, DragOverlay, MouseSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { LocalStorageService } from '@utils/localStorageService';
import { useCallback, useEffect, useState } from 'react';
import { filterTasks } from './helpers/helpers.js';

export const Board = ({ searchTerm = '' }) => {
  const [columns, setColumns] = useState(() => {
    const savedColumns = LocalStorageService.get('taskBoardColumns');
    return savedColumns || initialColumns;
  });

  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    LocalStorageService.set('taskBoardColumns', columns);
  }, [columns]);

  const [tasksPeriod, setTasksPeriod] = useState(periodOptions[2]);

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

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const findColumn = taskId => {
    const column = columns.find(column => column.tasks.some(task => task.id === taskId));
    return column?.id;
  };

  const handleDragStart = ({ active }) => {
    setActiveTask(active.id);
  };

  const handleDragOver = ({ active, over }) => {
    if (!over) return;

    const activeColumn = findColumn(active.id);
    const overColumn = findColumn(over.id) || over.id;

    if (!activeColumn || !overColumn || activeColumn === overColumn) return;

    setColumns(prev => {
      const activeCol = prev.find(col => col.id === activeColumn);
      const activeTask = activeCol.tasks.find(task => task.id === active.id);

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
  };

  const handleDragEnd = ({ active, over }) => {
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

    setActiveTask(null);
  };

  const deleteColumn = useCallback(columnId => {
    setColumns(prev => prev.filter(column => column.id !== columnId));
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

  const updateColumn = useCallback(updatedColumn => {
    setColumns(prev => prev.map(column => (column.id === updatedColumn.id ? updatedColumn : column)));
  }, []);

  const memoizedFilterTasks = useCallback(
    () => filterTasks(columns, searchTerm, tasksPeriod),
    [columns, searchTerm, tasksPeriod]
  );

  const filteredColumns = memoizedFilterTasks();

  return (
    <div className="board">
      <div className="board__header">
        <h1 className="page__title">Board</h1>
        <PeriodSelector periodOptions={periodOptions} onPeriodChange={setTasksPeriod} currentPeriod={tasksPeriod} />
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}>
        <div className="board__content">
          {filteredColumns.map(column => (
            <Column
              key={column.id}
              column={column}
              onAddTask={() => addNewTask(column.id)}
              onDeleteColumn={() => deleteColumn(column.id)}
              onUpdateColumn={updateColumn}>
              <SortableContext items={column.tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                {column.tasks.map(task => (
                  <SortableTaskCard
                    key={task.id}
                    task={task}
                    assignees={users}
                    tags={tags}
                    onDeleteTask={() => deleteTask(column.id, task.id)}
                    onUpdateTask={updatedTask => updateTask(column.id, updatedTask)}
                  />
                ))}
              </SortableContext>
            </Column>
          ))}
          <button onClick={addNewColumn} className="btn btn_add-column">
            <Icon spriteId="plus" size={24} className="icon icon_color_grey" />
          </button>
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard task={columns.flatMap(col => col.tasks).find(task => task.id === activeTask)} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
