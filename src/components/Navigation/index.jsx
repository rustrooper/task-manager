import './styles.scss'
import NavItem from '../NavItem'

const Navigation = ({items}) => {
	return (
		<ul className='nav'>
			{items.map(item => (
				<NavItem key={item.id} icon={item.icon} title={item.title} />
			))}
		</ul>
	)
}

export default Navigation
