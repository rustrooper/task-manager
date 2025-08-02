import { memo, useCallback } from 'react';

import Dropdown from '@components/Dropdown';
import Icon from '@components/Icon';
import './styles.scss';

const PeriodSelector = memo(({ periodOptions, currentPeriod, onPeriodChange }) => {
  const renderTrigger = useCallback(
    ({ isOpen, setIsOpen }) => (
      <button onClick={() => setIsOpen(!isOpen)} className="period-selector__toggle">
        <span className="period-selector__selected-period">{currentPeriod.label}</span>
        <Icon icon="arrow-down" className="icon_color_grey" />
      </button>
    ),
    [currentPeriod]
  );

  const renderContent = useCallback(
    ({ setIsOpen }) =>
      periodOptions
        .filter(option => option.id !== currentPeriod.id)
        .map(option => (
          <button
            key={option.id}
            onClick={() => {
              onPeriodChange(option);
              setIsOpen(false);
            }}
            className="period-selector__option">
            {option.label}
          </button>
        )),
    [periodOptions, onPeriodChange, currentPeriod.id]
  );

  return (
    <Dropdown classNameWrapper="period-selector" classNameContent="period-selector__dropdown" trigger={renderTrigger}>
      {renderContent}
    </Dropdown>
  );
});

export default PeriodSelector;
