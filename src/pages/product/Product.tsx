import { useParams } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import productsData from '../../data/products'
import { useBasketStore } from '../../store/basket'
import styles from './Product.module.scss'

const Product = () => {
	const { addItem } = useBasketStore(
		useShallow(state => ({
			addItem: state.addItem,
		})),
	)

	const productId = Number(useParams().id)

	const product = productsData.find(product => product.id === productId)

	if (!product) {
		return <h1 className={styles.notFound}>Товар не знайдено</h1>
	}

	return (
		<div className={styles.wrapper}>
			<div>
				<img width={100} src={product.imageUrl} alt={product.name} />
			</div>
			<div>
				<h1 className={styles.title}>{product.name}</h1>
				<p className={styles.text}>{product.description}</p>
			</div>
			<div>
				<button onClick={() => addItem(product)}>Додати в кошик</button>
			</div>
		</div>
	)
}

export default Product
