// src/constants/boardData.js

export const periodOptions = [
	{id: 'today', label: 'Today'},
	{id: 'yesterday', label: 'Yesterday'},
	{id: 'thisWeek', label: 'This Week'},
	{id: 'lastWeek', label: 'Last Week'},
	{id: 'thisMonth', label: 'This Month'},
]

export const users = [
	{
		id: 'simonov',
		name: 'daniel simonov',
		icon: '/src/assets/icons/avatar.jpg',
	},
	{
		id: 'sigeev',
		name: 'alex sigeiev',
	},
	{
		id: 'pasha',
		name: 'pasha volya',
	},
]

export const tags = ['design system', 'development', 'testing', 'analytics']

export const initialColumns = [
	{
		id: 'todo',
		title: 'To Do',
		tasks: [
			{id: 'task1', title: 'Design Homepage', description: 'Create wireframes', createdAt: '2025-07-01T14:30:22.124Z'},
		],
	},
	{
		id: 'inprogress',
		title: 'In Progress',
		tasks: [
			{id: 'task2', title: 'API Integration', description: 'Connect backend', createdAt: '2025-07-14T14:30:22.124Z'},
		],
	},
]
