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
import { useColumnsState } from './helpers/useColumnsState';

export const Board = ({ searchTerm = '' }) => {
  const {
    columns,
    addNewColumn,
    deleteColumn,
    updateColumn,
    addNewTask,
    deleteTask,
    updateTask,
    handleDragEnd,
    handleDragOver,
  } = useColumnsState();

  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    LocalStorageService.set('taskBoardColumns', columns);
  }, [columns]);

  const [tasksPeriod, setTasksPeriod] = useState(periodOptions[2]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = ({ active }) => {
    setActiveTask(active.id);
  };

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
        onDragEnd={({ active, over }) => {
          handleDragEnd({ active, over });
          setActiveTask(null);
        }}>
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
