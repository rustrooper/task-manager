import Sidebar from './components/Sidebar'
import AppRoutes from './routes/routes'
import TopBar from './components/TopBar'

// import 'antd/dist/reset.css'

const App = () => {
	// const navigate = useNavigate()

	return (
		<div className='app'>
			<Sidebar />
			<main className='main'>
				<TopBar />
				<AppRoutes />
			</main>
		</div>
	)
}

export default App
