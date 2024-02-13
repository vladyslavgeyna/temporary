import { FC, PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useUserStore } from '../../store/user'
import Loader from '../ui/loader/Loader'

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
	const navigate = useNavigate()

	const { isLoading, isCheckingAuthFinished, isAuthenticated } = useUserStore(
		useShallow(state => ({
			isLoading: state.isLoading,
			isAuthenticated: state.isAuthenticated,
			isCheckingAuthFinished: state.isCheckingAuthFinished,
		})),
	)

	if (isLoading || !isCheckingAuthFinished) {
		return <Loader />
	}

	if (!isAuthenticated && isCheckingAuthFinished) {
		navigate('/login')
	}

	return children
}

export default RequireAuth
