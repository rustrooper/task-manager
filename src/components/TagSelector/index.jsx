import Dropdown from '../Dropdown'
import './styles.scss'

const TagSelector = ({currentTag, onTagSelect, availableTags}) => (
	<Dropdown
		classNameWrapper='tag-selector'
		classNameContent='tag-selector__dropdown'
		trigger={({isOpen, setIsOpen}) => (
			<button onClick={() => setIsOpen(!isOpen)} className={`tag tag_${currentTag?.replace(' ', '-')}`}>
				{currentTag?.toUpperCase() || 'Choose tag'}
			</button>
		)}>
		{({setIsOpen}) =>
			availableTags.map(tag => (
				<button
					key={tag}
					onClick={() => {
						onTagSelect('tag', tag)
						setIsOpen(false)
					}}
					className={`tag-selector__option tag tag_${tag.replace(' ', '-')}`}>
					{tag.toUpperCase()}
				</button>
			))
		}
	</Dropdown>
)

export default TagSelector
