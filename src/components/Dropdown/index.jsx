import { useState, useRef, useEffect } from 'react';
import './styles.scss';

export const Dropdown = ({
  trigger,
  children,
  classNameWrapper = 'dropdown-menu',
  classNameContent = 'dropdown-menu__content',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={classNameWrapper} ref={dropdownRef}>
      {trigger({ isOpen, setIsOpen })}
      {isOpen && <div className={classNameContent}>{children({ setIsOpen })}</div>}
    </div>
  );
};
