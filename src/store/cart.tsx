import { create } from 'zustand'
import { CartItem } from '../types/cart-item'
import { Product } from '../types/product'

interface CartStore {
	items: CartItem[]
	addItem: (product: Product) => void
}

export const useCartStore = create<CartStore>(set => ({
	items: [],
	addItem: product => {
		set(state => {
			const existingItemIndex = state.items.findIndex(
				item => item.product.id === product.id,
			)

			if (existingItemIndex !== -1) {
				const updatedItems = [...state.items]
				updatedItems[existingItemIndex].quantity += 1
				return { items: updatedItems }
			}

			return { items: [...state.items, { product, quantity: 1 }] }
		})
	},
}))
