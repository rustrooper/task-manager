import { memo, useCallback } from 'react';

import { Dropdown } from '@components/Dropdown';

import './styles.scss';

export const TagSelector = memo(({ currentTag, onTagSelect, availableTags }) => {
  const renderTrigger = useCallback(
    ({ isOpen, setIsOpen }) => (
      <button onClick={() => setIsOpen(!isOpen)} className={`tag tag_${currentTag?.replaceAll(' ', '-')}`}>
        {currentTag?.toUpperCase() || 'Choose tag'}
      </button>
    ),
    [currentTag],
  );

  const renderContent = useCallback(
    ({ setIsOpen }) =>
      availableTags
        .filter(tag => tag !== currentTag)
        .map(tag => (
          <button
            key={tag}
            onClick={() => {
              onTagSelect('tag', tag);
              setIsOpen(false);
            }}
            className={`tag-selector__option tag tag_${tag.replaceAll(' ', '-')}`}>
            {tag.toUpperCase()}
          </button>
        )),
    [availableTags, onTagSelect, currentTag],
  );
  return (
    <Dropdown classNameWrapper="tag-selector" classNameContent="tag-selector__dropdown" trigger={renderTrigger}>
      {renderContent}
    </Dropdown>
  );
});
