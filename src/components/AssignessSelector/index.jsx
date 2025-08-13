import { memo, useCallback } from 'react';

import { Dropdown } from '@components/Dropdown';
import { Icon } from '@components/Icon';
import { Avatar } from '@components/Avatar';

import './styles.scss';

export const AssigneesSelector = memo(({ currentAssigneesIds, onAssigneesSelect, availableAssignees }) => {
  const handleAssigneeToggle = useCallback(
    assigneeId => {
      const newAssignees = currentAssigneesIds.includes(assigneeId)
        ? currentAssigneesIds.filter(id => id !== assigneeId)
        : [...currentAssigneesIds, assigneeId];

      onAssigneesSelect('assignees', newAssignees);
    },
    [currentAssigneesIds, onAssigneesSelect]
  );

  const handleClearAll = useCallback(() => {
    onAssigneesSelect('assignees', []);
  }, [onAssigneesSelect]);

  const hasCurrentAssignees = currentAssigneesIds.length > 0;

  const renderTrigger = useCallback(
    ({ isOpen, setIsOpen }) => (
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`btn assignees-selector__toggle ${hasCurrentAssignees && 'assignees-selector__toggle_users-icons'}`}>
        {hasCurrentAssignees ? (
          currentAssigneesIds.map(assigneeId => {
            const assignee = availableAssignees.find(a => a.id === assigneeId);
            if (!assignee) return null;
            return <Avatar key={assignee.id} className="assignees-selector__user-icon" user={assignee} />;
          })
        ) : (
          <>
            <Icon type="plus" size="sm" className="icon_color_grey" />
            <span>Assignees</span>
          </>
        )}
      </button>
    ),
    [availableAssignees, currentAssigneesIds, hasCurrentAssignees]
  );

  const renderContent = useCallback(
    ({ setIsOpen }) => (
      <>
        {availableAssignees.map(assignee => {
          const isCurrenAssignee = currentAssigneesIds.includes(assignee.id);
          return (
            <button
              key={assignee.id}
              className={`assignees-selector__option ${isCurrenAssignee && 'assignees-selector__option_selected'}`}
              onClick={() => handleAssigneeToggle(assignee.id)}>
              {`${assignee.name} ${assignee.lastname}`}
            </button>
          );
        })}
        {hasCurrentAssignees && (
          <div className="assignees-selector__actions">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="assignees-selector__accept">
              Accept
            </button>
            <button
              onClick={() => {
                handleClearAll();
                setIsOpen(false);
              }}
              className="assignees-selector__clear">
              Clear all
            </button>
          </div>
        )}
      </>
    ),
    [availableAssignees, currentAssigneesIds, handleAssigneeToggle, handleClearAll, hasCurrentAssignees]
  );

  return (
    <Dropdown
      classNameWrapper="assignees-selector"
      classNameContent="assignees-selector__dropdown"
      trigger={renderTrigger}>
      {renderContent}
    </Dropdown>
  );
});
