import './styles.scss'
import {LoupeIcon} from '../../assets/icons'

const Search = () => {
	return (
		<div className='search'>
			<LoupeIcon />
			<form>
				<input className='search__input' type='text' placeholder='Search' />
			</form>
		</div>
	)
}

export default Search
