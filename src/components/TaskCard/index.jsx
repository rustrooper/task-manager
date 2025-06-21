import './styles.scss'
import {useState} from 'react'
import DropdownMenu from '../DropdownMenu.jxs'
import TagSelector from '../TagSelector'

const TaskCard = ({task, onDeleteTask, onUpdateTask}) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editedTask, setEditedTask] = useState(task)

	const handleEdit = () => setIsEditing(true)

	const handleSave = () => {
		onUpdateTask(editedTask)
		setIsEditing(false)
	}

	const handleChange = e => {
		const {name, value} = e.target
		setEditedTask(prev => ({...prev, [name]: value}))
	}

	const tags = ['design system', 'development', 'testing', 'analytics']

	const handleTagSelect = selectedTag => {
		onUpdateTask({...task, tag: selectedTag})
	}

	return (
		<div className='task'>
			{isEditing ? (
				<form className='edit-form'>
					<input
						className='edit-form__title'
						name='title'
						value={editedTask.title}
						onChange={handleChange}
						onClick={e => e.stopPropagation()}
					/>
					<textarea
						className='edit-form__description'
						name='description'
						value={editedTask.description}
						onChange={handleChange}
						onClick={e => e.stopPropagation()}
					/>
					<button className='btn btn_edit-form' onClick={handleSave}>
						Save
					</button>
				</form>
			) : (
				<>
					<div className='task__header'>
						<TagSelector currentTag={task.tag} onTagSelect={handleTagSelect} availableTags={tags} />
						<DropdownMenu onDelete={onDeleteTask} />
					</div>
					<div className='task__content' onClick={!isEditing ? handleEdit : null}>
						<h3 className='task__title'>{task.title}</h3>
						<p className='task__description'>{task.description}</p>
					</div>
				</>
			)}
		</div>
	)
}

export default TaskCard
