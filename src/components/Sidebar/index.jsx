import './styles.scss'
import Navigation from '../Navigation'
import {navigationData} from '../../data/navigationData'
import logo from '../../assets/icons/logo.png'

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className='sidebar__top'>
				<img src={logo} alt='logo' />
				<h3 className='sidebar__title'>Simple tasks</h3>
			</div>
			<Navigation items={navigationData}></Navigation>
		</div>
	)
}

export default Sidebar
