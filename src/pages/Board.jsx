import {useState} from 'react'
import Column from '../components/Column'
import PageTitle from '../components/PageTitle'
import './Board.scss'
import '../styles/btn.scss'
import Icon from '../components/Icon'
import TaskCard from '../components/TaskCard'

const Board = () => {
	const [columns, setColumns] = useState([
		{
			id: 'todo',
			title: 'To Do',
			tasks: [{id: 'task1', title: 'Design Homepage', description: 'Create wireframes'}],
		},
		{
			id: 'inprogress',
			title: 'In Progress',
			tasks: [{id: 'task2', title: 'API Integration', description: 'Connect backend'}],
		},
	]) // Данные колонок

	const addNewColumn = () => {
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
	}

	const deleteColumn = columnId => {
		setColumns(prev => prev.filter(column => column.id !== columnId))
	}

	const addNewTask = columnId => {
		const taskText = prompt('Enter task text:')
		if (taskText) {
			setColumns(prev =>
				prev.map(column =>
					column.id === columnId
						? {
								...column,
								tasks: [
									...column.tasks,
									{
										id: Date.now(),
										title: 'Заголовок',
										description: taskText,
									},
								],
						  }
						: column
				)
			)
		}
	}

	const deleteTask = (columnId, taskId) => {
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
	}

	const updateTask = (columnId, updatedTask) => {
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
	}

	return (
		<div className='board'>
			<PageTitle textContent={'Board'} />
			<div className='board__content'>
				{columns.map(column => (
					<Column
						key={column.id}
						column={column}
						onAddTask={() => addNewTask(column.id)}
						onDeleteColumn={() => deleteColumn(column.id)}>
						{column.tasks.map(task => (
							<TaskCard
								key={task.id}
								task={task}
								onDeleteTask={() => deleteTask(column.id, task.id)}
								onUpdateTask={updatedTask => updateTask(column.id, updatedTask)}
							/>
						))}{' '}
					</Column>
				))}
				<button onClick={addNewColumn} className='btn btn_add-column'>
					<Icon icon='plus' className='icon_color_grey' />
				</button>
			</div>
		</div>
	)
}

export default Board
