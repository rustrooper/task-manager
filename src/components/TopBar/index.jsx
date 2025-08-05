import './styles.scss';
import { Icon } from '@components/Icon';
import { Search } from '@components/Search';
import { Avatar } from '@components/Avatar';
import { users } from '@data/appData';

export const TopBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="topbar">
      <Search searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <div className="topbar__actions">
        <Icon spriteId="help" className="icon icon_color_black" />
        <Icon spriteId="bell" className="icon icon_color_black" />
        <Avatar user={users[0]} />
      </div>
    </div>
  );
};
