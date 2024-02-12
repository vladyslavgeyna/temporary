import { Link } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useCartStore } from '../../../store/cart'
import BasketIcon from '../../basket-icon/BasketIcon'
import Container from '../../ui/container/Container'
import styles from './Header.module.scss'

const Header = () => {
	const { cartItems } = useCartStore(
		useShallow(state => ({
			cartItems: state.items,
		})),
	)

	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.wrapper}>
					<h1>
						<Link to={'/'}>Perfume Store</Link>
					</h1>
					<BasketIcon />
				</div>
			</Container>
		</header>
	)
}

export default Header
