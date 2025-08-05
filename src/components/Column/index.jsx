import { useDroppable } from '@dnd-kit/core';
import { useEffect, useState, useCallback, memo } from 'react';

import './styles.scss';
import { Icon } from '@components/Icon';
import { Dropdown } from '@components/Dropdown';

export const Column = memo(({ column, onAddTask, onDeleteColumn, onUpdateColumn, children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(column.title);

  useEffect(() => {
    setEditedTitle(column.title);
  }, [column.title]);

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: 'column' },
  });

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditSave = useCallback(() => {
    onUpdateColumn({ ...column, title: editedTitle });
    setIsEditing(false);
  }, [column, editedTitle, onUpdateColumn]);

  const handleChange = e => {
    setEditedTitle(e.target.value);
  };

  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Enter') {
        handleEditSave();
      }
    },
    [handleEditSave]
  );

  const actionsTrigger = ({ isOpen, setIsOpen }) => (
    <button onClick={() => setIsOpen(!isOpen)} className="btn">
      <Icon spriteId="dots" className="icon icon_color_black" />
    </button>
  );

  const actionsContent = ({ setIsOpen }) => (
    <button
      onClick={() => {
        onDeleteColumn();
        setIsOpen(false);
      }}
      className="dropdown-menu__item btn btn_remove">
      Remove
    </button>
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
            <Icon spriteId="plus" className="icon icon_color_black icon_indentless" />
          </button>
          <Dropdown classNameWrapper="dropdown-menu" classNameContent="dropdown-menu__content" trigger={actionsTrigger}>
            {actionsContent}
          </Dropdown>
        </div>
      </div>

      <div className="column__tasks">{children}</div>
    </div>
  );
});
