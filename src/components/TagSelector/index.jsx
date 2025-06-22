import {useState, useRef, useEffect} from 'react'
import './styles.scss'

const TagSelector = ({currentTag, onTagSelect, availableTags}) => {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = event => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div className='tag-selector' ref={dropdownRef}>
			<button onClick={() => setIsOpen(!isOpen)} className={`tag tag_${currentTag?.replace(' ', '-')}`}>
				{currentTag?.toUpperCase() || 'Choose tag'}
			</button>

			{isOpen && (
				<div className='tag-selector__dropdown'>
					{availableTags.map(tag => (
						<button
							key={tag}
							onClick={() => {
								onTagSelect(tag)
								setIsOpen(false)
							}}
							className={`tag-selector__option tag tag_${tag.replace(' ', '-')}`}>
							{tag.toUpperCase()}
						</button>
					))}
				</div>
			)}
		</div>
	)
}

export default TagSelector
