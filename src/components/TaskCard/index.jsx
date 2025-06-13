import './styles.scss'

const TaskCard = ({task}) => {
	return (
		<div className='task'>
      <h3 className=''>{task.title}</h3>
			<p>{task.description}</p>
		</div>
	)
}

export default TaskCard
