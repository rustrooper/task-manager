import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { TaskCard } from '@components/TaskCard';

export const SortableTaskCard = ({ task, assignees, tags, onDeleteTask, onUpdateTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: 'task' },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} assignees={assignees} tags={tags} onDeleteTask={onDeleteTask} onUpdateTask={onUpdateTask} />
    </div>
  );
};
