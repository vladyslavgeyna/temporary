import { useState } from 'react'
import productsData from '../../data/products'
import { CartItem } from '../../types/cart-item'
import { Product } from '../../types/product'
import CartPanel from '../cart-panel/CartPanel'
import Pagination from '../pagination/Pagination'
import ProductCard from '../product-card/ProductCard'
import styles from './ProductsList.module.scss'

const itemsPerPage = 15

const ProductList = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [cartItems, setCartItems] = useState<CartItem[]>([])
	const [isCartPanelOpen, setIsCartPanelOpen] = useState(false)

	const addToCart = (product: Product) => {
		const existingItem = cartItems.find(item => item.id === product.id)

		if (existingItem) {
			setCartItems(
				cartItems.map(item =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item,
				),
			)
		} else {
			setCartItems([...cartItems, { ...product, quantity: 1 }])
		}
	}

	const openCartPanel = () => {
		setIsCartPanelOpen(true)
	}

	const closeCartPanel = () => {
		setIsCartPanelOpen(false)
	}

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const visibleItems = productsData.slice(indexOfFirstItem, indexOfLastItem)

	const totalPages = Math.ceil(productsData.length / itemsPerPage)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<div>
			<h2>Our Perfumes</h2>
			<div className={styles.productList}>
				{visibleItems.map(product => (
					<ProductCard
						key={product.id}
						product={product}
						//showRibbon={product.isNew}
						addToCart={() => addToCart(product)}
					/>
				))}
			</div>
			<button className={styles.cartButton} onClick={openCartPanel}>
				Cart ({cartItems.length})
			</button>
			{isCartPanelOpen && (
				<CartPanel
					isOpen={false}
					cartItems={cartItems}
					closePanel={closeCartPanel}
				/>
			)}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	)
}

export default ProductList
