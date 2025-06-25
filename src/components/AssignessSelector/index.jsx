import './styles.scss'
import Dropdown from '../Dropdown'
import Icon from '../Icon'

const AssigneesSelector = ({currentAssignees, onAssigneesSelect, availableAssignees}) => {
	const handleAssigneeToggle = assignee => {
		const newAssignees = currentAssignees.includes(assignee)
			? currentAssignees.filter(a => a !== assignee) // Удаляем если уже выбран
			: [...currentAssignees, assignee] // Добавляем если не выбран

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
						currentAssignees.join(', ')
					) : (
						<>
							<Icon icon='plus' className='icon_color_grey icon_borderless' />
							<span>Assignees</span>
						</>
					)}
				</button>
			)}>
			{({setIsOpen}) => (
				<>
					{availableAssignees.map(assignee => (
						<button
							key={assignee}
							className={`assignees-selector__option ${
								currentAssignees.includes(assignee) ? 'assignees-selector__option_selected' : ''
							}`}
							onClick={() => handleAssigneeToggle(assignee)}>
							{assignee}
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
