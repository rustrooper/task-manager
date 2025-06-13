import TaskCard from '../TaskCard'
import './styles.scss'
import Icon from '../Icon'
import {useState} from 'react'

const Column = ({column, onAddTask}) => {
	const [showMenu, setShowMenu] = useState(false)

	return (
		<div className='column'>
			<div className='column__header'>
				<h3 className='column__title'>{column.title}</h3>
				<div className='column__buttons'>
					<button onClick={onAddTask} className='btn'>
						<Icon icon='plus' className='icon_color_black' />
					</button>
					<div className='column__menu'>
						<button onClick={() => setShowMenu(!showMenu)} className='btn'>
							<Icon icon='dots' className='icon_color_black' />
						</button>
					</div>
				</div>
			</div>

			<div className='column__tasks'>
				{column.tasks.map(task => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	)
}

export default Column
