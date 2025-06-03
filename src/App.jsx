import Board from './pages/Board'
import Sidebar from './components/SideBar'
import './styles/common.scss'

const App = () => {
	return (
		<div className='app'>
			<Sidebar />
			<Board /> {/* Здесь рендерится вся логика доски */}
		</div>
	)
}

export default App
