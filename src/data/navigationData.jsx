// navigationData.js
import React from 'react'
import {BoardIcon, DashboardIcon, AnalysticIcon, SettingsIcon, LogOutIcon} from '../assets/icons.jsx'

export const navigationData = [
	{
		id: 1,
		icon: <DashboardIcon />, // Передаём компонент иконки как JSX
		title: 'Dashboard',
	},
	{
		id: 2,
		icon: <BoardIcon />,
		title: 'Board',
	},
	{
		id: 3,
		icon: <AnalysticIcon />,
		title: 'Analystic',
	},
	{
		id: 4,
		icon: <SettingsIcon />,
		title: 'Settings',
	},

	{
		id: 5,
		icon: <LogOutIcon />,
		title: 'Log out',
	},
]
