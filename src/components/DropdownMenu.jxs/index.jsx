import Dropdown from '../Dropdown'
import Icon from '../Icon'
import './styles.scss'

const DropdownMenu = ({onDelete}) => (
	<Dropdown
		classNameWrapper='dropdown-menu'
		classNameContent='dropdown-menu__content'
		trigger={({isOpen, setIsOpen}) => (
			<button onClick={() => setIsOpen(!isOpen)} className='btn'>
				<Icon icon='dots' className='icon_color_black' />
			</button>
		)}>
		{({setIsOpen}) => (
			<button
				onClick={() => {
					onDelete()
					setIsOpen(false)
				}}
				className='dropdown-menu__item btn btn_remove'>
				Remove
			</button>
		)}
	</Dropdown>
)

export default DropdownMenu
