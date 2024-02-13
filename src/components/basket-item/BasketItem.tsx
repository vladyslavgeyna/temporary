import { useRef } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useBasketStore } from '../../store/basket'
import { BasketItem as BasketItemType } from '../../types/basket-item'
import styles from './BasketItem.module.scss'

type PropsType = {
	item: BasketItemType
}

const BasketItem = ({ item }: PropsType) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const { removeItemByProduct, updateItemQuantity } = useBasketStore(
		useShallow(state => ({
			removeItemByProduct: state.removeItemByProduct,
			updateItemQuantity: state.updateItemQuantity,
		})),
	)

	const totalPrice = item.product.price * item.quantity

	const handleQuantityChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
		if (inputRef.current) {
			const quantity = e
				? parseInt(e.target.value, 10)
				: parseInt(inputRef.current.value, 10)
			updateItemQuantity(item.product.id, quantity)

			if (isNaN(quantity) || quantity < 1) {
				updateItemQuantity(item.product.id, 1)
			}
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageWrapper}>
				<Link to={`/product/${item.product.id}`}>
					<img className={styles.image} src={item.product.imageUrl} />
				</Link>
			</div>
			<p className={styles.name}>
				<Link to={`/product/${item.product.id}`}>
					{item.product.name}
				</Link>
			</p>
			<p className={styles.quantity}>
				Кількість:
				<div className={styles.quantityWrapper}>
					<button
						onClick={() => {
							if (inputRef.current) {
								inputRef.current.stepDown()
								handleQuantityChange()
							}
						}}>
						-
					</button>
					<input
						ref={inputRef}
						type='number'
						onChange={e => handleQuantityChange(e)}
						min={1}
						step={1}
						value={item.quantity}
					/>
					<button
						onClick={() => {
							if (inputRef.current) {
								inputRef.current.stepUp()
								handleQuantityChange()
							}
						}}>
						+
					</button>
				</div>
			</p>
			<p className={styles.price}>Ціна: ${totalPrice}</p>
			<button
				onClick={() => removeItemByProduct(item.product.id)}
				className={styles.removeButton}
				type='button'>
				<FaTrashAlt />
			</button>
		</div>
	)
}

export default BasketItem
