import { ProductCategory } from '../../types/enums/product-category'
import { ProductClassification } from '../../types/enums/product-classification'
import { ProductType } from '../../types/enums/product-type'
import { Product } from '../../types/product'
import CharacteristicItem from '../characteristic-item/CharacteristicItem'
import styles from './Characteristics.module.scss'

type PropsType = {
	product: Product
}

const Characteristics = ({ product }: PropsType) => {
	return (
		<div className={styles.wrapper}>
			<CharacteristicItem
				name='Класифікація'
				value={
					ProductClassification[product.classification] ||
					'без класифікації'
				}
			/>
			<CharacteristicItem
				name='Тип'
				value={ProductType[product.type] || 'без типу'}
			/>
			<CharacteristicItem
				name='Категорія'
				value={ProductCategory[product.category] || 'без категорії'}
			/>
		</div>
	)
}

export default Characteristics
