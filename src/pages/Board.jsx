import {useState} from 'react'
import Column from '../components/Column'
import PageTitle from '../components/PageTitle'
import './Board.scss'

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

	const handleAddTask = (columnId, newTask) => {
		setColumns(
			columns.map(column => {
				if (column.id === columnId) {
					return {
						...column,
						tasks: [
							...column.tasks,
							{
								id: `task-${Date.now()}`, // Генерация уникального id
								...newTask,
								tags: [],
								assignees: [],
							},
						],
					}
				}
				return column
			})
		)
	}

	return (
		<div className='board'>
			<PageTitle textContent={'Board'} />
			<div className='board__content'>
				{columns.map(column => (
					<Column key={column.id} column={column} onAddTask={handleAddTask} />
				))}
			</div>
		</div>
	)
}

export default Board
