import { NavLink } from 'react-router-dom';
import { Icon } from '@components/Icon';
import './styles.scss';

export const Navigation = ({ items }) => {
  return (
    <ul className="nav">
      {items.map(item => (
        <li key={item.id} className="nav__item">
          <NavLink to={item.path} className={({ isActive }) => `nav__link ${isActive ? 'nav__link_active' : ''}`}>
            <Icon spriteId={item.icon} className="icon icon_color_black"></Icon>
            <span className="nav__title">{item.title}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
