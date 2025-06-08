import {Route, Routes} from 'react-router'
import Board from '../pages/Board'
import Dashboard from '../pages/Dashboard'
import Analytics from '../pages/Analytics'
import Settings from '../pages/Settings'
import NoMatchPage from '../pages/NoMatchPage'

const AppRoutes = () => {
	const navigationRoutes = [
		{path: '/', element: <Board></Board>},
		{path: '/dashboard', element: <Dashboard></Dashboard>},
		{path: '/analytics', element: <Analytics></Analytics>},
		{path: '/settings', element: <Settings></Settings>},
		{path: '*', element: <NoMatchPage></NoMatchPage>},
	]
	return (
		<Routes>
			{navigationRoutes.map(route => (
				<Route key={route.path} path={route.path} element={route.element} />
			))}
		</Routes>
	)
}

export default AppRoutes
