import { useDroppable } from '@dnd-kit/core';
import { useEffect, useState, useCallback, memo } from 'react';

import './styles.scss';
import ActionsSelector from '@components/ActionsSelector';
import Icon from '@components/Icon';

const Column = memo(({ column, onAddTask, onDeleteColumn, onUpdateColumn, children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(column.title);

  useEffect(() => {
    setEditedTitle(column.title);
  }, [column.title]);

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: 'column' },
  });

  const handleEditStart = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditSave = useCallback(() => {
    onUpdateColumn({ ...column, title: editedTitle });
    setIsEditing(false);
  }, [column, editedTitle, onUpdateColumn]);

  const handleChange = useCallback(e => {
    setEditedTitle(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Enter') {
        handleEditSave();
      }
    },
    [handleEditSave]
  );
  return (
    <div className="column" ref={setNodeRef}>
      <div className="column__header">
        {isEditing ? (
          <input
            className="column__title-edit"
            value={editedTitle}
            onChange={handleChange}
            onBlur={handleEditSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <h3 className="column__title" onClick={handleEditStart}>
            {column.title}
          </h3>
        )}

        <div className="column__buttons">
          <button onClick={onAddTask} className="btn">
            <Icon icon="plus" className="icon_color_black icon_indentless" />
          </button>
          <ActionsSelector onDelete={onDeleteColumn} />
        </div>
      </div>

      <div className="column__tasks">{children}</div>
    </div>
  );
});

export default Column;
