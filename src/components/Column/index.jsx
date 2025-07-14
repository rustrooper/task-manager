import {useEffect, useState, useCallback, memo} from 'react'
import './styles.scss'
import Icon from '../Icon'
import ActionsSelector from '../ActionsSelector'

const Column = memo(({column, onAddTask, onDeleteColumn, children}) => {
	// const [isEditing, setIsEditing] = useState(false)
	// const [editedColumn, setEditedColumn] = useState(column)
	// useEffect(() => {
	// 	setEditedColumn(column)
	// }, [column])

	// const handleEditMode = () => setIsEditing(true)

	// const handleEditSave = () => {}
	return (
		<div className='column'>
			<div className='column__header'>
				<h3 className='column__title'>{column.title}</h3>
				<div className='column__buttons'>
					<button onClick={onAddTask} className='btn'>
						<Icon icon='plus' className='icon_color_black icon_indentless' />
					</button>
					<ActionsSelector onDelete={onDeleteColumn} />
				</div>
			</div>

			<div className='column__tasks'>{children}</div>
		</div>
	)
})

export default Column
