import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useBasketStore } from '../../store/basket'
import { Product } from '../../types/product'
import Pagination from '../pagination/Pagination'
import ProductCard from '../product-card/ProductCard'
import styles from './ProductsList.module.scss'

const ITEMS_PER_PAGE = 15

type PropsType = {
	products: Product[]
}

const ProductList = ({ products }: PropsType) => {
	const { addCartItem } = useBasketStore(
		useShallow(state => ({
			addCartItem: state.addItem,
		})),
	)

	const [currentPage, setCurrentPage] = useState(1)

	const indexOfLastItem = currentPage * ITEMS_PER_PAGE
	const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
	const visibleItems = products.slice(indexOfFirstItem, indexOfLastItem)

	const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

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
