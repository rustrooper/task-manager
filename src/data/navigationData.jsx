// navigationData.js
import {BoardIcon, DashboardIcon, AnalysticIcon, SettingsIcon, LogOutIcon} from '../assets/icons.jsx'

export const navigationData = [
	{
		id: 1,
		icon: <DashboardIcon />,
		title: 'Dashboard',
		path: '/dashboard',
	},
	{
		id: 2,
		icon: <BoardIcon />,
		title: 'Board',
		path: '/',
	},
	{
		id: 3,
		icon: <AnalysticIcon />,
		title: 'Analystic',
		path: '/analytics',
	},
	{
		id: 4,
		icon: <SettingsIcon />,
		title: 'Settings',
		path: '/settings',
	},

	{
		id: 5,
		icon: <LogOutIcon />,
		title: 'Log out',
		path: '/*',
	},
]
