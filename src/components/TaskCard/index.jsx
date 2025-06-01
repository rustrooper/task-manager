import {useState} from 'react'
import './styles.scss'

const TaskCard = ({task, onEdit, onDelete}) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editedTask, setEditedTask] = useState({...task})

	const handleEdit = () => {
		onEdit(editedTask)
		setIsEditing(false)
	}

	return (
		<div className='task-card' draggable='true'>
			{isEditing ? (
				<div className='edit-form'>
					<input
						type='text'
						value={editedTask.title}
						onChange={e => setEditedTask({...editedTask, title: e.target.value})}
					/>
					<textarea
						value={editedTask.description}
						onChange={e => setEditedTask({...editedTask, description: e.target.value})}
					/>
					<button onClick={handleEdit}>Save</button>
					<button onClick={() => setIsEditing(false)}>Cancel</button>
				</div>
			) : (
				<>
					<div className='task-header'>
						<h4>{task.title}</h4>
						<div className='task-actions'>
							<button onClick={() => setIsEditing(true)}>✏️</button>
							<button onClick={() => onDelete(task.id)}>🗑️</button>
						</div>
					</div>
					<p>{task.description}</p>
					<div className='task-footer'>
						<div className='tags'>
							{task.tags?.map((tag, index) => (
								<span key={index} className='tag' style={{backgroundColor: tag.color}}>
									{tag.text}
								</span>
							))}
						</div>
						<div className='assignees'>
							{task.assignees?.map((user, index) => (
								<div key={index} className='assignee'>
									{user.avatar ? <img src={user.avatar} alt={user.name} /> : <span>{user.name.charAt(0)}</span>}
								</div>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default TaskCard
