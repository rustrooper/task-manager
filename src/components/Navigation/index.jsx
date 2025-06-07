import './styles.scss'
import NavItem from '../NavItem'

const Navigation = ({items}) => {
	return (
		<ul className='nav'>
			{items.map(item => (
				<li key={item.id} className='nav__item'>
					<span className='nav__icon'>{item.icon}</span>
					<span className='nav__title'>{item.title}</span>
				</li>
			))}
		</ul>
	)
}

export default Navigation
