import Dropdown from '@components/Dropdown';
import Icon from '@components/Icon';
import './styles.scss';

const ActionsSelector = ({ onDelete }) => {
  const renderTrigger = ({ isOpen, setIsOpen }) => (
    <button onClick={() => setIsOpen(!isOpen)} className="btn">
      <Icon icon="dots" className="icon_color_black" />
    </button>
  );

  const renderContent = ({ setIsOpen }) => (
    <button
      onClick={() => {
        onDelete();
        setIsOpen(false);
      }}
      className="dropdown-menu__item btn btn_remove">
      Remove
    </button>
  );

  return (
    <Dropdown classNameWrapper="dropdown-menu" classNameContent="dropdown-menu__content" trigger={renderTrigger}>
      {renderContent}
    </Dropdown>
  );
};

export default ActionsSelector;
