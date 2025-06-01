import './styles.scss'

const NavItem = ({icon, title}) => {
	return (
		<li className='nav__item'>
			<span className='nav__icon'>{icon}</span>
			<span className='nav__title'>{title}</span>
		</li>
	)
}

export default NavItem
