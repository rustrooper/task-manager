import {memo} from 'react'
import './styles.scss'
import Icon from '../Icon'
import DropdownMenu from '../DropdownMenu'

const Column = memo(({column, onAddTask, onDeleteColumn, children}) => {
	return (
		<div className='column'>
			<div className='column__header'>
				<h3 className='column__title'>{column.title}</h3>
				<div className='column__buttons'>
					<button onClick={onAddTask} className='btn'>
						<Icon icon='plus' className='icon_color_black icon_indentless' />
					</button>
					<DropdownMenu onDelete={onDeleteColumn} />
				</div>
			</div>

			<div className='column__tasks'>{children}</div>
		</div>
	)
})

export default Column
