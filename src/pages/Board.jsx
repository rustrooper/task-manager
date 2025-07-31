import Column from '@components/Column';
import Icon from '@components/Icon';
import PageTitle from '@components/PageTitle';
import './Board.scss';
import '@styles/btn.scss';
import PeriodSelector from '@components/PeriodSelector';
import { SortableTaskCard } from '@components/SortableTaskCard';
import TaskCard from '@components/TaskCard';
import { periodOptions, users, tags, initialColumns } from '@data/boardData';
import { DndContext, closestCorners, useSensor, useSensors, DragOverlay, MouseSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import LocalStorageService from '@utils/localStorageService';
import { useCallback, useEffect, useState } from 'react';

const Board = ({ searchTerm = '' }) => {
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

    console.log('active id во время перетаскивания:', active.id);
    console.log('over id во время перетаскивания:', over.id);

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

    console.log('active id при заверешини перетаскивания:', active.id);
    console.log('over id при заверешини перетаскивания:', over.id);

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

  const filterTasks = useCallback(() => {
    const now = new Date();

    return columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => {
        const matchesSearch =
          !searchTerm.trim() ||
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        const taskDate = new Date(task.createdAt);
        switch (tasksPeriod.id) {
          case 'today': {
            return (
              taskDate.getDate() === now.getDate() &&
              taskDate.getMonth() === now.getMonth() &&
              taskDate.getFullYear() === now.getFullYear()
            );
          }
          case 'yesterday': {
            const yesterday = new Date(now);
            yesterday.setDate(now.getDate() - 1);
            return (
              taskDate.getDate() === yesterday.getDate() &&
              taskDate.getMonth() === yesterday.getMonth() &&
              taskDate.getFullYear() === yesterday.getFullYear()
            );
          }
          case 'thisWeek': {
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay());
            return taskDate >= startOfWeek;
          }
          case 'lastWeek': {
            const startOfLastWeek = new Date(now);
            startOfLastWeek.setDate(now.getDate() - now.getDay() - 7);
            const endOfLastWeek = new Date(startOfLastWeek);
            endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);
            return taskDate >= startOfLastWeek && taskDate <= endOfLastWeek;
          }
          case 'thisMonth': {
            return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear();
          }
          default: {
            return true;
          }
        }
      }),
    }));
  }, [columns, searchTerm, tasksPeriod]);

  const filteredColumns = filterTasks();

  return (
    <div className="board">
      <div className="board__header">
        <PageTitle textContent={'Board'} />
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
            <Icon icon="plus" className="icon_color_grey icon_borderless" />
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

export default Board;
