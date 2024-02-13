import { ProductCategory } from './enums/product-category'
import { ProductClassification } from './enums/product-classification'
import { ProductType } from './enums/product-type'

export interface Product {
	id: number
	name: string
	description: string
	price: number
	imageUrl: string
	category: ProductCategory
	isNew: boolean
	classification: ProductClassification
	type: ProductType
}
