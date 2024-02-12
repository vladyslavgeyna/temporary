import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import NotFound from '../pages/not-found/NotFound'
import Layout from './layout/Layout'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route element={<Home />} index />
					<Route element={<NotFound />} path='*' />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
