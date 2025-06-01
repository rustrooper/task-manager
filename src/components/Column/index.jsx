import {useState} from 'react'
import TaskCard from '../TaskCard'
import './styles.scss'

const Column = ({column, onAddTask, onEditTask, onDeleteTask}) => {
	const [showAddForm, setShowAddForm] = useState(false)
	const [newTaskTitle, setNewTaskTitle] = useState('')

	const handleAddTask = () => {
		if (newTaskTitle.trim()) {
			const newTask = {
				id: Date.now().toString(),
				title: newTaskTitle,
				description: '',
				tags: [],
				assignees: [],
			}
			onAddTask(column.id, newTask)
			setNewTaskTitle('')
			setShowAddForm(false)
		}
	}

	return (
		<div className='column'>
			<div className='column-header'>
				<h3>{column.title}</h3>
				<span className='task-count'>{column.tasks.length}</span>
			</div>

			<div className='tasks-list'>
				{column.tasks.map(task => (
					<TaskCard key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
				))}
			</div>

			{showAddForm ? (
				<div className='add-task-form'>
					<input
						type='text'
						value={newTaskTitle}
						onChange={e => setNewTaskTitle(e.target.value)}
						placeholder='Введите название задачи'
						autoFocus
					/>
					<div className='form-actions'>
						<button onClick={handleAddTask}>Добавить</button>
						<button onClick={() => setShowAddForm(false)}>Отмена</button>
					</div>
				</div>
			) : (
				<button className='add-task-button' onClick={() => setShowAddForm(true)}>
					+ Добавить задачу
				</button>
			)}
		</div>
	)
}

export default Column
