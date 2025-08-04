import './styles.scss';
import { Icon } from '@components/Icon';
import { Search } from '@components/Search';
import { users } from '@data/appData';

export const TopBar = ({ searchTerm, onSearchChange, user }) => {
  return (
    <div className="topbar">
      <Search searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <div className="topbar__actions">
        <Icon icon="help" className="icon_color_black" />
        <Icon icon="bell" className="icon_color_black" />
        {/* <Icon></Icon> */}
      </div>
    </div>
  );
};
