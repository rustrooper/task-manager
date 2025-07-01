import './styles.scss'
import {useEffect, useState, useCallback, memo} from 'react'
import DropdownMenu from '../DropdownMenu'
import TagSelector from '../TagSelector'
import AssigneesSelector from '../AssignessSelector'

const TaskCard = memo(({task, tags, assignees, onDeleteTask, onUpdateTask}) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editedTask, setEditedTask] = useState(task)
	useEffect(() => {
		setEditedTask(task)
	}, [task])

	const handleEdit = useCallback(() => setIsEditing(true), [])

	const handleSave = useCallback(() => {
		onUpdateTask(editedTask)
		setIsEditing(false)
	}, [editedTask, onUpdateTask])

	const handleChange = useCallback(e => {
		const {name, value} = e.target
		setEditedTask(prev => ({...prev, [name]: value}))
	}, [])

	const handleTaskUpdate = useCallback(
		(property, value) => {
			onUpdateTask({...task, [property]: value})
		},
		[onUpdateTask, task]
	)

	handleTaskUpdate
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
						<TagSelector currentTag={task.tag} onTagSelect={handleTaskUpdate} availableTags={tags} />
						<DropdownMenu onDelete={onDeleteTask} />
					</div>
					<div className='task__content' onClick={!isEditing ? handleEdit : null}>
						<h3 className='task__title'>{task.title}</h3>
						<p className='task__description'>{task.description}</p>
					</div>
					<AssigneesSelector
						currentAssigneesIds={task.assignees || []}
						onAssigneesSelect={handleTaskUpdate}
						availableAssignees={assignees}
					/>
				</>
			)}
		</div>
	)
})

export default TaskCard
