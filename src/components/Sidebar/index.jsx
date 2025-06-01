import './styles.scss'
import Navigation from '../Navigation'
import {navigationData} from '../../data/navigationData'

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<Navigation items={navigationData}></Navigation>
		</div>
	)
}

export default Sidebar
