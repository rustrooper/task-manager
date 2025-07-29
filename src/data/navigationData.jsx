import Icon from "../components/Icon/index.jsx";

export const navigationData = [
  {
    id: 1,
    icon: <Icon icon="dashboard" className="icon_color_black" />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    icon: <Icon icon="board" className="icon_color_black" />,
    title: "Board",
    path: "/",
  },
  {
    id: 3,
    icon: <Icon icon="analytics" className="icon_color_black" />,
    title: "Analystic",
    path: "/analytics",
  },
  {
    id: 4,
    icon: <Icon icon="settings" className="icon_color_black" />,
    title: "Settings",
    path: "/settings",
  },

  {
    id: 5,
    icon: <Icon icon="logout" className="icon_color_black" />,
    title: "Log out",
    path: "/*",
  },
];
