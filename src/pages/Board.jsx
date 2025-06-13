import {useState} from 'react'
import Column from '../components/Column'
import PageTitle from '../components/PageTitle'
import './Board.scss'
import '../styles/btn.scss'
import Icon from '../components/Icon'

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

	return (
		<div className='board'>
			<PageTitle textContent={'Board'} />
			<div className='board__content'>
				{columns.map(column => (
					<Column
						key={column.id}
						column={column}
						onAddTask={() => addNewTask(column.id)}
						onDeleteColumn={() => deleteColumn(column.id)}
					/>
				))}
				<button onClick={addNewColumn} className='btn btn_add-column'>
					<Icon icon='plus' className='icon_color_grey' />
				</button>
			</div>
		</div>
	)
}

export default Board
