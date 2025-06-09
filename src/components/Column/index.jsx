import {useState} from 'react'
import TaskCard from '../TaskCard'
import {DotsIcon, PlusIcon} from '../../assets/icons'
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
			<div className='column__header'>
				<h3 className='column__title'>{column.title}</h3>
				<div className='column__buttons'>
					<button className='btn_add-task'>
						<PlusIcon />
					</button>
					<button className='btn_col-actions'>
						<DotsIcon />
					</button>
				</div>
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
