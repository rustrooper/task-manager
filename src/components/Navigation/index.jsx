import {NavLink} from 'react-router-dom'
import './styles.scss'

const Navigation = ({items}) => {
	return (
		<ul className='nav'>
			{items.map(item => (
				<li key={item.id} className='nav__item'>
					<NavLink to={item.path} className={({isActive}) => (isActive ? 'nav__link nav__link_active' : 'nav__link')}>
						<span className='nav__icon'>{item.icon}</span>
						<span className='nav__title'>{item.title}</span>
					</NavLink>
				</li>
			))}
		</ul>
	)
}

export default Navigation
