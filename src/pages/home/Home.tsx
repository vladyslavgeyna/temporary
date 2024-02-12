import ProductList from '../../components/products-list/ProductsList'
import Slider from '../../components/slider/Slider'
import sliderItems from '../../data/slider-items'
// import productsData from '../../data/products'
import styles from './Home.module.scss'

const Home = () => {
	// const sliderItems: SlideItem[] = productsData.map(product => {
	// 	return {
	// 		image: product.imageUrl,
	// 		link: `/products/${product.id}`,
	// 	}
	// })

	return (
		<div>
			<Slider items={sliderItems} />
			<h1 className={styles.title}>Our Perfumes</h1>
			<ProductList />
		</div>
	)
}

export default Home
