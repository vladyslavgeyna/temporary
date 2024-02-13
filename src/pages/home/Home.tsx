import { useEffect, useState } from 'react'
import ProductList from '../../components/products-list/ProductsList'
import Slider from '../../components/slider/Slider'
import Checkbox from '../../components/ui/checkbox/Checkbox'
import Modal from '../../components/ui/modal/Modal'
//import productsData from '../../data/products'
//import sliderItems from '../../data/slider-items'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loader from '../../components/ui/loader/Loader'
import { OrderByOptions } from '../../types/enums/order-by-options'
import { ProductCategory } from '../../types/enums/product-category'
import { ProductClassification } from '../../types/enums/product-classification'
import { ProductType } from '../../types/enums/product-type'
import { Product } from '../../types/product'
import { SlideItem } from '../../types/slide-item'
import { getEnumAsArray } from '../../utils'
import styles from './Home.module.scss'

const Home = () => {
	const {
		data: productsData,
		isLoading,
		isError,
		isSuccess,
	} = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const response = await axios.get<Product[]>(
				'http://localhost:3200/products',
			)
			return response.data
		},
		staleTime: 0,
		retry: false,
	})

	const {
		data: sliderItems,
		isLoading: areItemsLoading,
		isError: isItemsError,
		isSuccess: IsItemsSuccess,
	} = useQuery({
		queryKey: ['slider-items'],
		queryFn: async () => {
			const response = await axios.get<SlideItem[]>(
				'http://localhost:3200/sliderItems',
			)
			return response.data
		},
		staleTime: 0,
		retry: false,
	})

	const [isModalActive, setIsModalActive] = useState(false)

	const [selectedCategories, setSelectedCategories] = useState<number[]>([])
	const [selectedTypes, setSelectedTypes] = useState<number[]>([])
	const [selectedClassifications, setSelectedClassifications] = useState<
		number[]
	>([])
	const [products, setProducts] = useState<Product[]>([])
	const [priceFrom, setPriceFrom] = useState<string | number>(0)
	const [priceTo, setPriceTo] = useState<string | number>(0)
	const [selectedOrderBy, setSelectedOrderBy] = useState<number>(1)

	useEffect(() => {
		if (productsData && productsData.length > 0 && products.length === 0) {
			setProducts(productsData)
		}
	}, [productsData])

	const orderByProducts = (products: Product[]) => {
		switch (selectedOrderBy) {
			case OrderByOptions['Ціною за зростанням']:
				products.sort((a, b) => a.price - b.price)
				break
			case OrderByOptions['Ціною за спаданням']:
				products.sort((a, b) => b.price - a.price)
				break
			case OrderByOptions['Лише нові товари']:
				products = products.filter(product => product.isNew)
				break
			default:
				break
		}
	}

	if (isLoading || areItemsLoading) {
		return <Loader />
	}

	if (isError || isItemsError || !isSuccess || !IsItemsSuccess) {
		return (
			<h1 className={styles.title}>
				Помилка... Спробуйте ще раз пізніше...
			</h1>
		)
	}

	const filterProducts = () => {
		return productsData.filter(product => {
			if (selectedCategories.length > 0) {
				if (!selectedCategories.includes(product.category)) {
					return false
				}
			}
			if (selectedTypes.length > 0) {
				if (!selectedTypes.includes(product.type)) {
					return false
				}
			}
			if (selectedClassifications.length > 0) {
				if (!selectedClassifications.includes(product.classification)) {
					return false
				}
			}
			return true
		})
	}

	const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		let filteredProducts = filterProducts()

		orderByProducts(filteredProducts)

		setProducts(filteredProducts)
		setIsModalActive(false)
	}

	const handleCharacteristicFilterChange = (
		value: number,
		setValue: (value: number[]) => void,
		currentValue: number[],
	) => {
		if (currentValue.includes(value)) {
			setValue(currentValue.filter(category => category !== value))
		} else {
			setValue([...currentValue, value])
		}
	}

	const validatePriceTo = () => {
		if (priceFrom && priceTo && Number(priceTo) < Number(priceFrom)) {
			setPriceFrom('')
		}
	}

	const validatePriceFrom = () => {
		if (priceTo && priceFrom && Number(priceFrom) > Number(priceTo)) {
			setPriceTo('')
		}
	}

	return (
		<div>
			<Slider items={sliderItems} />
			<div className={styles.topWrapper}>
				<h1 className={styles.title}>Our Perfumes</h1>
				<button
					type='button'
					onClick={() => setIsModalActive(true)}
					className={styles.filterButton}>
					Фільтрація та сортування
				</button>
				<Modal isActive={isModalActive} setIsActive={setIsModalActive}>
					<form
						method='post'
						onSubmit={handleModalSubmit}
						className={styles.modalWrapper}>
						<div className={styles.modalHeader}>
							Фільтрація та сортування
						</div>
						<hr className={styles.separator} />
						<div className={styles.modalBody}>
							<div>
								<div className={styles.modalFormTitle}>
									Категорії:
								</div>
								<div className={styles.checkboxGroup}>
									{getEnumAsArray(ProductCategory).map(c => (
										<Checkbox
											checked={selectedCategories.includes(
												c.id,
											)}
											key={c.id}
											name='category'
											item={c}
											setValue={(value: number) =>
												handleCharacteristicFilterChange(
													value,
													setSelectedCategories,
													selectedCategories,
												)
											}
										/>
									))}
								</div>
							</div>
							<div>
								<div className={styles.modalFormTitle}>
									Типи:
								</div>
								<div className={styles.checkboxGroup}>
									{getEnumAsArray(ProductType).map(t => (
										<Checkbox
											checked={selectedTypes.includes(
												t.id,
											)}
											key={t.id}
											name='type'
											item={t}
											setValue={(value: number) =>
												handleCharacteristicFilterChange(
													value,
													setSelectedTypes,
													selectedTypes,
												)
											}
										/>
									))}
								</div>
							</div>
							<div>
								<div className={styles.modalFormTitle}>
									Класифікації:
								</div>
								<div className={styles.checkboxGroup}>
									{getEnumAsArray(ProductClassification).map(
										c => (
											<Checkbox
												checked={selectedClassifications.includes(
													c.id,
												)}
												key={c.id}
												name='classification'
												item={c}
												setValue={(value: number) =>
													handleCharacteristicFilterChange(
														value,
														setSelectedClassifications,
														selectedClassifications,
													)
												}
											/>
										),
									)}
								</div>
							</div>
							<hr className={styles.separator} />
							<div>
								<div className={styles.modalFormTitle}>
									Ціна:
								</div>
								<div className={styles.priceWrapper}>
									<input
										className={styles.priceInput}
										value={priceFrom || ''}
										name={'priceFrom'}
										placeholder='Від'
										onBlur={validatePriceFrom}
										onChange={e => {
											setPriceFrom(
												parseInt(e.target.value),
											)
										}}
									/>
									<input
										className={styles.priceInput}
										value={priceTo || ''}
										name={'priceTo'}
										placeholder='До'
										onBlur={validatePriceTo}
										onChange={e => {
											setPriceTo(parseInt(e.target.value))
										}}
									/>
								</div>
							</div>
							<hr className={styles.separator} />
							<div>
								<div className={styles.modalFormTitle}>
									Сортувати за:
								</div>
								<div className={styles.priceWrapper}>
									<select
										value={selectedOrderBy}
										onChange={e => {
											setSelectedOrderBy(
												parseInt(e.target.value),
											)
										}}
										className={styles.orderByInput}
										name='order-by'>
										{getEnumAsArray(OrderByOptions).map(
											o => (
												<option key={o.id} value={o.id}>
													{o.value}
												</option>
											),
										)}
									</select>
								</div>
							</div>
						</div>
						<hr className={styles.separator} />
						<div className={styles.modalFooter}>
							<button
								className={styles.modalButton}
								type='button'
								onClick={() => setIsModalActive(false)}>
								Скасувати
							</button>
							<button
								className={styles.modalButton}
								onClick={() => {
									setSelectedCategories([])
									setSelectedTypes([])
									setSelectedClassifications([])
									setPriceFrom('')
									setPriceTo('')
									setSelectedOrderBy(1)
									setProducts(productsData)
									setIsModalActive(false)
								}}
								type='button'>
								Скинути
							</button>
							<button
								className={styles.modalButton}
								type='submit'>
								Застовувати
							</button>
						</div>
					</form>
				</Modal>
			</div>
			<ProductList products={products} />
		</div>
	)
}

export default Home
