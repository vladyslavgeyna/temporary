import { BsHandbag } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useBasketStore } from '../../store/basket'
import styles from './BasketIcon.module.scss'

const BasketIcon = () => {
	const { cartItems } = useBasketStore(
		useShallow(state => ({
			cartItems: state.items,
		})),
	)

	let totalQuantity = cartItems.reduce((total, currentItem) => {
		return total + currentItem.quantity
	}, 0)

	return (
		<Link className={styles.basket} to={'/basket'}>
			<BsHandbag />
			{totalQuantity > 0 && (
				<span className={styles.basketItemsCount}>{totalQuantity}</span>
			)}
		</Link>
	)
}

export default BasketIcon
