import { Route, Routes } from "react-router";

import Analytics from "../pages/Analytics";
import Board from "../pages/Board";
import Dashboard from "../pages/Dashboard";
import NoMatchPage from "../pages/NoMatchPage";
import Settings from "../pages/Settings";

const AppRoutes = ({ searchTerm }) => {
  const navigationRoutes = [
    { path: "/", element: <Board searchTerm={searchTerm}></Board> },
    { path: "/dashboard", element: <Dashboard></Dashboard> },
    { path: "/analytics", element: <Analytics></Analytics> },
    { path: "/settings", element: <Settings></Settings> },
    { path: "*", element: <NoMatchPage></NoMatchPage> },
  ];
  return (
    <Routes>
      {navigationRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
