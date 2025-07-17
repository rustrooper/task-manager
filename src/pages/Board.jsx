import {useCallback, useEffect, useState} from 'react'
import Column from '../components/Column'
import PageTitle from '../components/PageTitle'
import './Board.scss'
import '../styles/btn.scss'
import Icon from '../components/Icon'
import TaskCard from '../components/TaskCard'
import LocalStorageService from '../utils/localStorageService'
import PeriodSelector from '../components/PeriodSelector'

const initialColumns = [
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

const tags = ['design system', 'development', 'testing', 'analytics']
const users = [
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

const periodOptions = [
	{id: 'today', label: 'Today'},
	{id: 'yesterday', label: 'Yesterday'},
	{id: 'thisWeek', label: 'This Week'},
	{id: 'lastWeek', label: 'Last Week'},
	{id: 'thisMonth', label: 'This Month'},
]

const Board = ({searchTerm = ''}) => {
	const [columns, setColumns] = useState(() => {
		const savedColumns = LocalStorageService.get('taskBoardColumns')
		return savedColumns || initialColumns
	})

	useEffect(() => {
		LocalStorageService.set('taskBoardColumns', columns)
	}, [columns])

	const [tasksPeriod, setTasksPeriod] = useState(periodOptions[2])

	const addNewColumn = useCallback(() => {
		const columnTitle = prompt('Enter column title:')
		if (columnTitle) {
			setColumns(prev => [
				...prev,
				{
					id: Date.now(),
					title: columnTitle,
					tasks: [],
				},
			])
		}
	}, [])

	const deleteColumn = useCallback(columnId => {
		setColumns(prev => prev.filter(column => column.id !== columnId))
	}, [])

	const addNewTask = useCallback(columnId => {
		const taskTitle = prompt('Enter task title:')
		if (taskTitle) {
			setColumns(prev =>
				prev.map(column =>
					column.id === columnId
						? {
								...column,
								tasks: [
									...column.tasks,
									{
										id: Date.now(),
										title: taskTitle,
										description: 'Описание задачи',
										createdAt: new Date().toISOString(),
									},
								],
						  }
						: column
				)
			)
		}
	}, [])

	const deleteTask = useCallback((columnId, taskId) => {
		setColumns(prev =>
			prev.map(column =>
				column.id === columnId
					? {
							...column,
							tasks: column.tasks.filter(task => task.id !== taskId),
					  }
					: column
			)
		)
	}, [])

	const updateTask = useCallback((columnId, updatedTask) => {
		setColumns(prev =>
			prev.map(column =>
				column.id === columnId
					? {
							...column,
							tasks: column.tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)),
					  }
					: column
			)
		)
	}, [])

	const updateColumn = useCallback(updatedColumn => {
		setColumns(prev => prev.map(column => (column.id === updatedColumn.id ? updatedColumn : column)))
	}, [])

	const filterTasks = useCallback(() => {
		const now = new Date()

		return columns.map(column => ({
			...column,
			tasks: column.tasks.filter(task => {
				const matchesSearch =
					!searchTerm.trim() ||
					task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					task.description.toLowerCase().includes(searchTerm.toLowerCase())

				if (!matchesSearch) return false

				const taskDate = new Date(task.createdAt)
				switch (tasksPeriod.id) {
					case 'today': {
						return (
							taskDate.getDate() === now.getDate() &&
							taskDate.getMonth() === now.getMonth() &&
							taskDate.getFullYear() === now.getFullYear()
						)
					}
					case 'yesterday': {
						const yesterday = new Date(now)
						yesterday.setDate(now.getDate() - 1)
						return (
							taskDate.getDate() === yesterday.getDate() &&
							taskDate.getMonth() === yesterday.getMonth() &&
							taskDate.getFullYear() === yesterday.getFullYear()
						)
					}
					case 'thisWeek': {
						const startOfWeek = new Date(now)
						startOfWeek.setDate(now.getDate() - now.getDay())
						return taskDate >= startOfWeek
					}
					case 'lastWeek': {
						const startOfLastWeek = new Date(now)
						startOfLastWeek.setDate(now.getDate() - now.getDay() - 7)
						const endOfLastWeek = new Date(startOfLastWeek)
						endOfLastWeek.setDate(startOfLastWeek.getDate() + 6)
						return taskDate >= startOfLastWeek && taskDate <= endOfLastWeek
					}
					case 'thisMonth': {
						return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear()
					}
					default: {
						return true
					}
				}
			}),
		}))
	}, [columns, searchTerm, tasksPeriod])

	const filteredColumns = filterTasks()

	return (
		<div className='board'>
			<div className='board__header'>
				<PageTitle textContent={'Board'} />
				<PeriodSelector periodOptions={periodOptions} onPeriodChange={setTasksPeriod} currentPeriod={tasksPeriod} />
			</div>
			<div className='board__content'>
				{filteredColumns.map(column => (
					<Column
						key={column.id}
						column={column}
						onAddTask={() => addNewTask(column.id)}
						onDeleteColumn={() => deleteColumn(column.id)}
						onUpdateColumn={updateColumn}>
						{column.tasks.map(task => (
							<TaskCard
								key={task.id}
								task={task}
								tags={tags}
								assignees={users}
								onDeleteTask={() => deleteTask(column.id, task.id)}
								onUpdateTask={updatedTask => updateTask(column.id, updatedTask)}
							/>
						))}{' '}
					</Column>
				))}
				<button onClick={addNewColumn} className='btn btn_add-column'>
					<Icon icon='plus' className='icon_color_grey icon_borderless' />
				</button>
			</div>
		</div>
	)
}

export default Board
