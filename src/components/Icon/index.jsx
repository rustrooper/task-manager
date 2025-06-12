import sprite from '../../assets/icons/sprite.svg'
import './styles.scss'

const Icon = ({icon, className = ''}) => {
	return (
		<svg className={`icon ${className}`}>
			<use xlinkHref={`${sprite}#${icon}`} />
		</svg>
	)
}

export default Icon
