import { FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useBasketStore } from '../../store/basket'
import { BasketItem as BasketItemType } from '../../types/basket-item'
import styles from './BasketItem.module.scss'

type PropsType = {
	item: BasketItemType
}

const BasketItem = ({ item }: PropsType) => {
	const { removeItemByProduct } = useBasketStore(
		useShallow(state => ({
			removeItemByProduct: state.removeItemByProduct,
		})),
	)

	const totalPrice = item.product.price * item.quantity

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageWrapper}>
				<Link to={`/product/${item.product.id}`}>
					<img className={styles.image} src={item.product.imageUrl} />
				</Link>
			</div>
			<p className={styles.name}>
				<Link to={`/product/${item.product.id}`}>
					{item.product.name}
				</Link>
			</p>
			<p className={styles.quantity}>Кількість: {item.quantity}</p>
			<p className={styles.price}>Ціна: ${totalPrice}</p>
			<button
				onClick={() => removeItemByProduct(item.product.id)}
				className={styles.removeButton}
				type='button'>
				<FaTrashAlt />
			</button>
		</div>
	)
}

export default BasketItem
