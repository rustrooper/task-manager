import { Route, Routes } from 'react-router';

import { Analytics } from '@pages/Analytics';
import { Board } from '@pages/Board';
import { Dashboard } from '@pages/Dashboard';
import { NoMatchPage } from '@pages/NoMatchPage';
import { Settings } from '@pages/Settings';

export const AppRoutes = ({ searchTerm }) => {
  const navigationRoutes = [
    { path: '/', element: <Board searchTerm={searchTerm} /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/analytics', element: <Analytics /> },
    { path: '/settings', element: <Settings /> },
    { path: '*', element: <NoMatchPage /> },
  ];
  return (
    <Routes>
      {navigationRoutes.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
