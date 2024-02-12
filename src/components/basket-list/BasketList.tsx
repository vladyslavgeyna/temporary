import { BasketItem as BasketItemType } from '../../types/basket-item'
import BasketItem from '../basket-item/BasketItem'
import styles from './BasketList.module.scss'

type PropsType = {
	items: BasketItemType[]
}

const BasketList = ({ items }: PropsType) => {
	return (
		<div className={styles.wrapper}>
			{items.map((item, index) => (
				<BasketItem item={item} key={index} />
			))}
		</div>
	)
}

export default BasketList
