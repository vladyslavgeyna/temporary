import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import Router from './components/Router'
import { useUserStore } from './store/user'
import { UserWithId } from './types/user'

function App() {
	const { login, setIsCheckingAuthFinished } = useUserStore(
		useShallow(state => ({
			login: state.login,
			setIsCheckingAuthFinished: state.setIsCheckingAuthFinished,
		})),
	)

	useEffect(() => {
		const userJSON = localStorage.getItem('user')

		let user = null

		if (userJSON) {
			user = JSON.parse(userJSON) as UserWithId
		}

		if (user) {
			login(user)
		}

		setIsCheckingAuthFinished(true)
	})

	return <Router />
}

export default App
