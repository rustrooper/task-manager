import './styles.scss'
import Search from '../Search'
import {HelpIcon, BellIcon} from '../../assets/icons'
import avatar from '../../assets/icons/avatar.jpg'
import Icon from '../Icon'

const TopBar = () => {
	return (
		<div className='topbar'>
			<Search />
			<div className='topbar__actions'>
				<Icon icon='help' className='icon_color_black' />
				<Icon icon='bell' className='icon_color_black' />
				<img className='avatar' src={avatar} alt='avatar' />
			</div>
		</div>
	)
}

export default TopBar
