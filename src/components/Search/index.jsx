import './styles.scss';
import Icon from '../Icon';

const Search = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search">
      <Icon icon="loupe" className="icon_color_grey" />
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

export default Search;
