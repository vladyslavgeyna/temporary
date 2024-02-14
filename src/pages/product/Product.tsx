import { useParams } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import { useShallow } from 'zustand/react/shallow'
import Characteristics from '../../components/characteristics/Characteristics'
//import productsData from '../../data/products'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { API_URL } from '../../../config'
import Loader from '../../components/ui/loader/Loader'
import { useBasketStore } from '../../store/basket'
import { useUserStore } from '../../store/user'
import { Product as ProductType } from '../../types/product'
import styles from './Product.module.scss'

const Product = () => {
	const productId = Number(useParams().id)

	const {
		data: product,
		isLoading: isProductLoading,
		isError,
		isSuccess,
		error: productError,
	} = useQuery({
		queryKey: ['products', productId],
		queryFn: async () => {
			const response = await axios.get<ProductType>(
				`${API_URL}/products/${productId}`,
			)
			return response.data
		},
		staleTime: 0,
		retry: false,
	})

	const { addItem } = useBasketStore(
		useShallow(state => ({
			addItem: state.addItem,
		})),
	)

	const { isCheckingAuthFinished, isAuthenticated, isLoading } = useUserStore(
		useShallow(state => ({
			isCheckingAuthFinished: state.isCheckingAuthFinished,
			isAuthenticated: state.isAuthenticated,
			isLoading: state.isLoading,
			logout: state.logout,
			user: state.user,
		})),
	)

	if (isProductLoading) {
		return <Loader />
	}

	if (isError || !isSuccess) {
		if ((productError as AxiosError).response?.status === 404) {
			return <h1 className={styles.notFound}>Товар не знайдено</h1>
		}
		return (
			<h1 className={styles.error}>
				Помилка... Спробуйте ще раз пізніше...
			</h1>
		)
	}

	const handleAddToBasket = () => {
		addItem(product)
		toast.success('Чудовий вибір! Товар додано в кошик!', {
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
		<div className={styles.wrapper}>
			<div className={styles.imageWrapper}>
				<img
					className={styles.image}
					src={product.imageUrl}
					alt={product.name}
				/>
				{product.isNew && <span>NEW</span>}
			</div>
			<div className={styles.contentWrapper}>
				<div className={styles.topWrapper}>
					<h1 className={styles.title}>{product.name}</h1>
					<p>${product.price}</p>
				</div>
				<div className={styles.contentRow}>
					<div>
						<p className={styles.contentTitle}>Опис:</p>
						<p className={styles.text}>{product.description}</p>
						<div>
							{!isLoading &&
								isCheckingAuthFinished &&
								isAuthenticated && (
									<button
										className={styles.AddToBasketButton}
										onClick={() => handleAddToBasket()}>
										Додати в кошик
									</button>
								)}
						</div>
					</div>
					<div>
						<p className={styles.contentTitle}>Xарактеристики:</p>
						<Characteristics product={product} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Product
