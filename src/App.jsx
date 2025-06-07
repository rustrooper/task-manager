import Board from './pages/Board'
import Sidebar from './components/Sidebar'
import './styles/reset.scss'
import './styles/common.scss'
// import 'antd/dist/reset.css'

const App = () => {
	return (
		<div className='app'>
			<Sidebar />
			<Board /> {/* Здесь рендерится вся логика доски */}
		</div>
	)
}

export default App
