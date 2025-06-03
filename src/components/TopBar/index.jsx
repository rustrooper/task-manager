import './styles.scss'
import Search from '../Search'
import {HelpIcon, BellIcon} from '../../assets/icons'

const TopBar = () => {
	return (
		<div className='topBar'>
			<Search />
			<div className='topBar__actions'>
				<HelpIcon />
				<BellIcon />
				<img src='../../assets/icons/avatar.jpg' alt='' />
			</div>
		</div>
	)
}

export default TopBar
