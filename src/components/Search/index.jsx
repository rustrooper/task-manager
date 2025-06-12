import './styles.scss'
import {LoupeIcon} from '../../assets/icons'
import Icon from '../Icon'

const Search = () => {
	return (
		<div className='search'>
			<Icon icon='loupe' className='icon_color_grey' />
			<form className='search__form'>
				<input className='search__input' type='text' placeholder='Search' />
			</form>
		</div>
	)
}

export default Search
