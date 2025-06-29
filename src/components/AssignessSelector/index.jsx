import './styles.scss'
import Dropdown from '../Dropdown'
import Icon from '../Icon'

const AssigneesSelector = ({currentAssignees, onAssigneesSelect, availableAssignees}) => {
	const handleAssigneeToggle = assigneeId => {
		const newAssignees = currentAssignees.includes(assigneeId)
			? currentAssignees.filter(id => id !== assigneeId) // Удаляем если уже выбран
			: [...currentAssignees, assigneeId] // Добавляем если не выбран

		onAssigneesSelect('assignees', newAssignees)
	}

	const handleClearAll = () => {
		onAssigneesSelect('assignees', [])
	}

	return (
		<Dropdown
			classNameWrapper='assignees-selector'
			classNameContent='assignees-selector__dropdown'
			trigger={({isOpen, setIsOpen}) => (
				<button onClick={() => setIsOpen(!isOpen)} className='btn btn_assignees-selector'>
					{currentAssignees.length > 0 ? (
						currentAssignees.map(assigneeId => {
							const assignee = availableAssignees.find(a => a.id === assigneeId)
							if (!assignee) return null

							const initials = assignee.name
								.split(' ')
								.map(part => part[0].toUpperCase())
								.join('')
							return (
								<Icon
									key={assignee.id}
									className='assignees-selector__user-icon'
									textContent={initials}
									user={assignee}></Icon>
							)
						})
					) : (
						<>
							<Icon icon='plus' className='icon_color_grey icon_indentless' />
							<span>Assignees</span>
						</>
					)}
				</button>
			)}>
			{({setIsOpen}) => (
				<>
					{availableAssignees.map(assignee => (
						<button
							key={assignee.name}
							className={`assignees-selector__option ${
								currentAssignees.includes(assignee) ? 'assignees-selector__option_selected' : ''
							}`}
							onClick={() => handleAssigneeToggle(assignee.id)}>
							{assignee.name}
						</button>
					))}
					{currentAssignees.length > 0 && (
						<div className='assigness-selector__actions'>
							<button
								onClick={() => {
									handleClearAll()
									setIsOpen(false)
								}}
								className='assignees-selector__clear'>
								Clear all
							</button>
							<button
								onClick={() => {
									setIsOpen(false)
								}}
								className='assignees-selector__accept'>
								Accept
							</button>
						</div>
					)}
				</>
			)}
		</Dropdown>
	)
}

export default AssigneesSelector
