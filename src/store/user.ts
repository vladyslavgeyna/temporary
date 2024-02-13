import axios from 'axios'
import { create } from 'zustand'
import { User, UserWithId } from '../types/user'
import { API_URL } from './../../config'

interface BasketStore {
	user: UserWithId | null
	isLoading: boolean
	error: string
	isAuthenticated: boolean
	isCheckingAuthFinished: boolean
	setCredentials: (user: UserWithId) => void
	logout: () => void
	setIsCheckingAuthFinished: (isFinished: boolean) => void
	register: (user: User) => void
	login: (user: User) => void
}

export const useUserStore = create<BasketStore>(set => ({
	isLoading: false,
	error: '',
	user: null,
	isAuthenticated: false,
	isCheckingAuthFinished: false,
	setCredentials: (user: UserWithId) => {
		set({ user: user, isAuthenticated: true })
		localStorage.setItem('user', JSON.stringify(user))
	},
	logout: () => {
		set({ user: null, isAuthenticated: false })
		localStorage.removeItem('user')
	},
	setIsCheckingAuthFinished: (isFinished: boolean) => {
		set({ isCheckingAuthFinished: isFinished })
	},
	register: async (user: User) => {
		set({ isLoading: true })
		try {
			const { data: checkUserData } = await axios.get<UserWithId[]>(
				`${API_URL}/users?username=${user.username}`,
			)

			if (checkUserData[0]) {
				set({
					error: `User with username ${user.username} already exists`,
				})
				return
			}

			const { data: registerUserData } = await axios.post<UserWithId>(
				`${API_URL}/users`,
				{
					...user,
				},
			)
			set({ user: registerUserData, isAuthenticated: true, error: '' })
			localStorage.setItem('user', JSON.stringify(registerUserData))
		} catch (error) {
			set({
				error: 'Invalid register operation',
				isAuthenticated: false,
				user: null,
			})
			localStorage.removeItem('user')
		} finally {
			set({ isLoading: false })
		}
	},
	login: async (user: User) => {
		set({ isLoading: true })
		try {
			const { data: checkUserExistsData } = await axios.get<UserWithId[]>(
				`${API_URL}/users?username=${user.username}&password=${user.password}`,
			)

			if (!checkUserExistsData[0]) {
				set({
					error: `User not found`,
				})
				return
			}

			set({
				user: checkUserExistsData[0],
				isAuthenticated: true,
				error: '',
			})
			localStorage.setItem('user', JSON.stringify(checkUserExistsData[0]))
		} catch (error) {
			set({
				error: 'Invalid login operation',
				isAuthenticated: false,
				user: null,
			})
			localStorage.removeItem('user')
		} finally {
			set({ isLoading: false })
		}
	},
}))
