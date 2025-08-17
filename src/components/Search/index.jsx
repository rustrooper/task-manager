import { Icon } from '@components/Icon';

import './styles.scss';

export const Search = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search">
      <Icon type="loupe" className="icon icon_color_grey" />
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
