import ProductList from '../../components/products-list/ProductsList'
import styles from './Home.module.scss'

const Home = () => {
	return (
		<div>
			<h1 className={styles.title}>Our Perfumes</h1>
			<ProductList />
		</div>
	)
}

export default Home
