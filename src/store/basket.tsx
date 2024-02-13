import { create } from 'zustand'
import { BasketItem } from '../types/basket-item'
import { Product } from '../types/product'

interface BasketStore {
	items: BasketItem[]
	addItem: (product: Product) => void
	removeItemByProduct: (productId: number) => void
	removeAllItems: () => void
	updateItemQuantity: (productId: number, quantity: number) => void
}

export const useBasketStore = create<BasketStore>(set => ({
	items: [],
	addItem: product => {
		set(state => {
			const existingItemIndex = state.items.findIndex(
				item => item.product.id === product.id,
			)

			if (existingItemIndex !== -1) {
				const updatedItems = [...state.items]
				updatedItems[existingItemIndex] = {
					...updatedItems[existingItemIndex],
					quantity: updatedItems[existingItemIndex].quantity + 1,
				}
				return { items: updatedItems }
			}

			return { items: [...state.items, { product, quantity: 1 }] }
		})
	},
	removeItemByProduct: productId => {
		set(state => {
			const updatedItems = state.items.filter(
				item => item.product.id !== productId,
			)
			return { items: updatedItems }
		})
	},
	removeAllItems: () => {
		set({ items: [] })
	},
	updateItemQuantity: (productId, quantity) => {
		set(state => {
			const updatedItems = state.items.map(item => {
				if (item.product.id === productId) {
					return { ...item, quantity }
				}
				return item
			})
			return { items: updatedItems }
		})
	},
}))
