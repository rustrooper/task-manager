import Sidebar from './components/Sidebar'
import AppRoutes from './routes/routes'
import TopBar from './components/TopBar'
import {useState} from 'react'

// import 'antd/dist/reset.css'

const App = () => {
	// const navigate = useNavigate()
	const [searchTerm, setSearchTerm] = useState('')
	return (
		<div className='app'>
			<Sidebar />
			<main className='main'>
				<TopBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
				<AppRoutes searchTerm={searchTerm} />
			</main>
		</div>
	)
}

export default App
