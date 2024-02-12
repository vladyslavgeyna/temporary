import { Product } from '../../types/product'
import styles from './ProductCard.module.scss'

type PropsType = {
	product: Product
	addToCart: () => void
}

const ProductCard = ({ product, addToCart }: PropsType) => {
	const { name, description, price, imageUrl, isNew } = product

	return (
		<div className={styles.productCard}>
			{isNew && (
				<div className={styles.ribbon}>
					<span>NEW</span>
				</div>
			)}
			<img className={styles.image} src={imageUrl} alt={name} />
			<div className={styles.details}>
				<h3>{name}</h3>
				<p>{description}</p>
				<p className='price'>${price}</p>
				<button onClick={addToCart}>Add to Cart</button>
			</div>
		</div>
	)
}

export default ProductCard
