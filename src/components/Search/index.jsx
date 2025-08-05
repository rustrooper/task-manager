import './styles.scss';
import { Icon } from '@components/Icon';

export const Search = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search">
      <Icon spriteId="loupe" className="icon icon_color_grey" />
      <input
        className="search__input"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
};
