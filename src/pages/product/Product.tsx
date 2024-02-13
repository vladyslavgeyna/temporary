import { useParams } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import { useShallow } from 'zustand/react/shallow'
import Characteristics from '../../components/characteristics/Characteristics'
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

	const handleAddToBasket = () => {
		addItem(product)
		toast.success('Чудовий вибір! Товар додано в кошик!', {
			position: 'bottom-right',
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			theme: 'colored',
			transition: Bounce,
		})
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageWrapper}>
				<img
					className={styles.image}
					src={product.imageUrl}
					alt={product.name}
				/>
				{product.isNew && <span>NEW</span>}
			</div>
			<div className={styles.contentWrapper}>
				<div className={styles.topWrapper}>
					<h1 className={styles.title}>{product.name}</h1>
					<p>${product.price}</p>
				</div>
				<div className={styles.contentRow}>
					<div>
						<p className={styles.contentTitle}>Опис:</p>
						<p className={styles.text}>{product.description}</p>
						<div>
							<button
								className={styles.AddToBasketButton}
								onClick={() => handleAddToBasket()}>
								Додати в кошик
							</button>
						</div>
					</div>
					<div>
						<p className={styles.contentTitle}>Xарактеристики:</p>
						<Characteristics product={product} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Product
