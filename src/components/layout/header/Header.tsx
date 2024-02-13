import { Link, useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useUserStore } from '../../../store/user'
import BasketIcon from '../../basket-icon/BasketIcon'
import Container from '../../ui/container/Container'
import styles from './Header.module.scss'

const Header = () => {
	const navigate = useNavigate()

	const { isCheckingAuthFinished, isAuthenticated, isLoading, logout, user } =
		useUserStore(
			useShallow(state => ({
				isCheckingAuthFinished: state.isCheckingAuthFinished,
				isAuthenticated: state.isAuthenticated,
				isLoading: state.isLoading,
				logout: state.logout,
				user: state.user,
			})),
		)

	const handleLogout = () => {
		logout()
		navigate('/')
	}

	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.wrapper}>
					<h1>
						<Link to={'/'}>Perfume Store</Link>
					</h1>
					{isLoading || !isCheckingAuthFinished ? (
						''
					) : isAuthenticated ? (
						<div className={styles.buttonsWrapper}>
							<BasketIcon />

							<button
								onClick={handleLogout}
								className={styles.link}
								type={'button'}>
								<span>Вийти</span>
							</button>
						</div>
					) : (
						<div className={styles.buttonsWrapper}>
							<Link className={styles.link} to={'/register'}>
								<span>Реєстрація</span>
							</Link>
							<Link className={styles.link} to={'/login'}>
								<span>Ввійти</span>
							</Link>
						</div>
					)}
				</div>
			</Container>
		</header>
	)
}

export default Header
