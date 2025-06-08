import './styles.scss'
import Search from '../Search'
import {HelpIcon, BellIcon} from '../../assets/icons'
import avatar from '../../assets/icons/avatar.jpg'

const TopBar = () => {
	return (
		<div className='topbar'>
			<Search />
			<div className='topbar__actions'>
				<HelpIcon />
				<BellIcon />
				<img className='avatar' src={avatar} alt='avatar' />
			</div>
		</div>
	)
}

export default TopBar
