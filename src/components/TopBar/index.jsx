import './styles.scss';
import avatar from '../../assets/icons/avatar.jpg';
import Icon from '../Icon';
import Search from '../Search';

const TopBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="topbar">
      <Search searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <div className="topbar__actions">
        <Icon icon="help" className="icon_color_black" />
        <Icon icon="bell" className="icon_color_black" />
        <img className="avatar" src={avatar} alt="avatar" />
      </div>
    </div>
  );
};

export default TopBar;
