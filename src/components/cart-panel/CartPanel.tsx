import { CartItem } from '../../types/cart-item'
import styles from './CartPanel.module.scss'

type PropsType = {
	cartItems: CartItem[]
	closePanel: () => void
	isOpen: boolean
}

const CartPanel = ({ cartItems, closePanel, isOpen }: PropsType) => {
	return (
		<div className={`${styles.cartPanel} ${isOpen ? 'open' : ''}`}>
			<button className={styles.closeButton} onClick={closePanel}>
				Close
			</button>
			<h2>Your Cart</h2>
			<ul>
				{cartItems.map((item, index) => (
					<li key={index}>
						<div className={styles.cartItem}>
							<span>{item.name}</span>
							<span>Quantity: {item.quantity}</span>
							<span>Total: ${item.quantity * item.price}</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default CartPanel
