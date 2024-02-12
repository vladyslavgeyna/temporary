import Container from '../../ui/container/Container'
import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container>
				<p>&copy; 2024 Perfume Store</p>
			</Container>
		</footer>
	)
}

export default Footer
