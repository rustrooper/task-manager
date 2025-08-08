import { useEffect, useState, useCallback, memo, useRef } from 'react';
import './styles.scss';

import { TagSelector } from '@components/TagSelector';
import { Dropdown } from '@components/Dropdown';
import { AssigneesSelector } from '@components/AssignessSelector';
import { Icon } from '@components/Icon';

export const TaskCard = memo(({ task, tags, assignees, onDeleteTask, onUpdateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isElevated, setIsElevated] = useState(false);
  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  console.log('task', task);
  console.log('Id задачи', task.id);
  console.log('Теги задачи', task.tag);

  const handleEdit = useCallback(() => {
    if (!isEditing) setIsEditing(true);
  }, [isEditing]);

  const handleEditSave = useCallback(() => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  }, [editedTask, onUpdateTask]);

  const handleChange = useCallback(e => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleTaskUpdate = useCallback(
    (property, value) => {
      onUpdateTask({ ...task, [property]: value });
    },
    [onUpdateTask, task]
  );

  const dropdownRef = useRef(null);

  const handleClickOutside = useCallback(
    event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleEditSave();
      }
    },
    [handleEditSave]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleKeyDown = useCallback(
    e => {
      if (e.key === 'Escape') {
        setIsEditing(false);
        setEditedTask(task);
      }
    },
    [task]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditing, handleKeyDown]);

  const actionsTrigger = ({ isOpen, setIsOpen }) => (
    <button onClick={() => setIsOpen(!isOpen)} className="btn">
      <Icon spriteId="dots" className="icon icon_color_black" />
    </button>
  );

  const actionsContent = ({ setIsOpen }) => (
    <button
      onClick={() => {
        onDeleteTask();
        setIsOpen(false);
      }}
      className="dropdown-menu__item btn btn_remove">
      Remove
    </button>
  );

  return (
    <div className="task">
      {isEditing ? (
        <form
          className="edit-form"
          ref={dropdownRef}
          onSubmit={e => {
            e.preventDefault();
            handleEditSave();
          }}>
          <input className="edit-form__title" name="title" value={editedTask.title} onChange={handleChange} />
          <textarea
            className="edit-form__description"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          />
          <button className="btn btn_edit-form" onClick={handleEditSave}>
            Save
          </button>
        </form>
      ) : (
        <>
          <div className="task__header">
            <TagSelector currentTag={task.tag} onTagSelect={handleTaskUpdate} availableTags={tags} />
            <Dropdown trigger={actionsTrigger}>{actionsContent}</Dropdown>
          </div>
          <div className="task__content" onClick={handleEdit}>
            <h3 className="task__title">{task.title}</h3>
            <p className="task__description">{task.description}</p>
          </div>
          <AssigneesSelector
            currentAssigneesIds={task.assignees || []}
            onAssigneesSelect={handleTaskUpdate}
            availableAssignees={assignees || []}
          />
        </>
      )}
    </div>
  );
});
