import './styles.scss'

const AssignessSelector = ({availableAssigness}) => {
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
		<div className='assigness-selector' ref={dropdownRef}>
			<button onClick={() => setIsOpen(!isOpen)} className=''></button>
		</div>
	)
}
