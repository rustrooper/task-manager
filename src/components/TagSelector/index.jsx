import {memo, useCallback} from 'react'
import Dropdown from '../Dropdown'
import './styles.scss'

const TagSelector = memo(({currentTag, onTagSelect, availableTags}) => {
	const renderTrigger = useCallback(
		({isOpen, setIsOpen}) => (
			<button onClick={() => setIsOpen(!isOpen)} className={`tag tag_${currentTag?.replace(' ', '-')}`}>
				{currentTag?.toUpperCase() || 'Choose tag'}
			</button>
		),
		[currentTag]
	)

	const renderContent = useCallback(
		({setIsOpen}) =>
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
			)),
		[availableTags, onTagSelect]
	)
	return (
		<Dropdown classNameWrapper='tag-selector' classNameContent='tag-selector__dropdown' trigger={renderTrigger}>
			{renderContent}
		</Dropdown>
	)
})

export default TagSelector
