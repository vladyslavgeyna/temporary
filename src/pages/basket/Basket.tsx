import { useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import { useShallow } from 'zustand/react/shallow'
import BasketList from '../../components/basket-list/BasketList'
import RequireAuth from '../../components/hoc/RequireAuth'
import { useBasketStore } from '../../store/basket'
import styles from './Basket.module.scss'

const Basket = () => {
	const navigate = useNavigate()

	const { cartItems, removeAllItems } = useBasketStore(
		useShallow(state => ({
			cartItems: state.items,
			removeAllItems: state.removeAllItems,
		})),
	)

	let totalPrice = cartItems.reduce((accumulator, currentItem) => {
		return accumulator + currentItem.product.price * currentItem.quantity
	}, 0)

	const handleMakeOrder = () => {
		removeAllItems()
		navigate('/')
		toast.success('Замовлення успішно оформлено! Дякуємо!', {
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
		<RequireAuth>
			{cartItems.length === 0 ? (
				<h1 className={styles.emptyBasket}>Кошик порожній</h1>
			) : (
				<div className={styles.wrapper}>
					<div className={styles.topWrapper}>
						<h1 className={styles.title}>Кошик</h1>
						<button
							onClick={() => removeAllItems()}
							className={styles.clearBasketButton}>
							Очистити кошик
						</button>
					</div>
					<div className={styles.bottomWrapper}>
						<div className={styles.leftSide}>
							<BasketList items={cartItems} />
						</div>
						<div className={styles.rightSide}>
							<div className={styles.totalPrice}>
								<span>Загальна сума:</span>
								<span>${totalPrice}</span>
							</div>
							<button
								onClick={() => handleMakeOrder()}
								className={styles.makeOrderButton}>
								Оформити замовлення
							</button>
						</div>
					</div>
				</div>
			)}
		</RequireAuth>
	)
}

export default Basket
