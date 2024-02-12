import { BsHandbag } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useCartStore } from '../../store/cart'
import styles from './BasketIcon.module.scss'

const BasketIcon = () => {
	const { cartItems } = useCartStore(
		useShallow(state => ({
			cartItems: state.items,
		})),
	)

	return (
		<Link className={styles.basket} to={'/basket'}>
			<BsHandbag />
			{cartItems.length > 0 && (
				<span className={styles.basketItemsCount}>
					{cartItems.length}
				</span>
			)}
		</Link>
	)
}

export default BasketIcon
