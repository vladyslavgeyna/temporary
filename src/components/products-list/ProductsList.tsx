import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import productsData from '../../data/products'
import { useBasketStore } from '../../store/basket'
import Pagination from '../pagination/Pagination'
import ProductCard from '../product-card/ProductCard'
import styles from './ProductsList.module.scss'

const itemsPerPage = 15

const ProductList = () => {
	const { addCartItem } = useBasketStore(
		useShallow(state => ({
			addCartItem: state.addItem,
		})),
	)

	const [currentPage, setCurrentPage] = useState(1)

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const visibleItems = productsData.slice(indexOfFirstItem, indexOfLastItem)

	const totalPages = Math.ceil(productsData.length / itemsPerPage)

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<div>
			<div className={styles.productList}>
				{visibleItems.map(product => (
					<ProductCard
						key={product.id}
						product={product}
						addToCart={() => addCartItem(product)}
					/>
				))}
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		</div>
	)
}

export default ProductList
