import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Basket from '../pages/basket/Basket'
import Home from '../pages/home/Home'
import NotFound from '../pages/not-found/NotFound'
import Product from '../pages/product/Product'
import Layout from './layout/Layout'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route element={<Home />} index />
					<Route path='product/:id' element={<Product />} />
					<Route path='basket' element={<Basket />} />
					<Route element={<NotFound />} path='*' />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
