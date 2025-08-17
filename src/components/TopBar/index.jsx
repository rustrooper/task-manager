import { Icon } from '@components/Icon';
import { Search } from '@components/Search';
import { Avatar } from '@components/Avatar';
import { users } from '@data/appData';

import './styles.scss';

export const Header = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="topbar">
      <Search searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <div className="topbar__actions">
        <Icon type="help" className="icon icon_color_black" />
        <Icon type="bell" className="icon icon_color_black" />
        <Avatar user={users[0]} />
      </div>
    </div>
  );
};
