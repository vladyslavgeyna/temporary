import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Basket from '../pages/basket/Basket'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import NotFound from '../pages/not-found/NotFound'
import Product from '../pages/product/Product'
import Register from '../pages/register/Register'
import Layout from './layout/Layout'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route element={<Home />} index />
					<Route path='product/:id' element={<Product />} />
					<Route path='basket' element={<Basket />} />
					<Route path='register' element={<Register />} />
					<Route path='login' element={<Login />} />
					<Route element={<NotFound />} path='*' />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
