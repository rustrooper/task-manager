import logo from '@assets/icons/logo.png';
import { navigationData } from '@data/navigationData';
import { Navigation } from '@components/Navigation';

import './styles.scss';

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <img src={logo} alt="logo" />
        <h3 className="sidebar__title">Simple tasks</h3>
      </div>
      <Navigation items={navigationData}></Navigation>
    </aside>
  );
};
