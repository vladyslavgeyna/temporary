import { Link } from 'react-router-dom'
import { Product } from '../../types/product'
import styles from './ProductCard.module.scss'

type PropsType = {
	product: Product
	addToCart: () => void
}

const ProductCard = ({ product, addToCart }: PropsType) => {
	const { id, name, price, imageUrl, isNew } = product

	return (
		<div className={styles.productCard}>
			{isNew && (
				<div className={styles.ribbon}>
					<span>NEW</span>
				</div>
			)}
			<div className={styles.contentWrapper}>
				<div className={styles.imageWrapper}>
					<Link to={`/product/${id}`}>
						<img
							className={styles.image}
							src={imageUrl}
							alt={name}
						/>
					</Link>
				</div>
				<div className={styles.details}>
					<h3 className={styles.productName}>
						<Link to={`/product/${id}`}>{name}</Link>
					</h3>
					<p className={styles.price}>${price}</p>
				</div>
			</div>
			<Link to={`/product/${id}`} className={styles.viewButton}>
				Переглянути
			</Link>
		</div>
	)
}

export default ProductCard
