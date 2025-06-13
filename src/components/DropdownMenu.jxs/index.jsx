import {useState, useRef, useEffect} from 'react'
import Icon from './Icon'

const DropdownMenu = ({onDelete}) => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)

	useEffect(() => {
		const handleClickOutside = event => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className='dropdown-menu' ref={menuRef}>
			<button onClick={() => setIsOpen(!isOpen)} className='btn'>
				<Icon icon='dots' className='icon_color_black' />
			</button>

			{isOpen && (
				<div className='dropdown-menu__content'>
					<button
						onClick={() => {
							onDelete()
							setIsOpen(false)
						}}
						className='dropdown-menu__item'>
						Delete
					</button>
				</div>
			)}
		</div>
	)
}

export default DropdownMenu
