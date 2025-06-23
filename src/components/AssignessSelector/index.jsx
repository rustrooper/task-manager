import './styles.scss'
import Dropdown from '../Dropdown'
import Icon from '../Icon'

const AssigneesSelector = ({onAssigneeSelect, availableAssignees}) => (
	<Dropdown
		classNameWrapper='assignees-selector'
		classNameContent='assignees-selector__dropdown'
		trigger={({isOpen, setIsOpen}) => (
			<button onClick={() => setIsOpen(!isOpen)} className='btn'>
				<Icon icon='plus' className='icon_color_grey' /> Assignees
			</button>
		)}>
		{({setIsOpen}) =>
			availableAssignees.map(assignee => (
				<button
					key={assignee}
					onClick={() => {
						onAssigneeSelect('assignee', assignee)
						setIsOpen(false)
					}}
					className='assignees-selector__option'>
					{assignee}
				</button>
			))
		}
	</Dropdown>
)

export default AssigneesSelector
