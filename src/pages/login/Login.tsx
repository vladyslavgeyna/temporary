import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import WithoutAuth from '../../components/hoc/WithoutAuth'
import Loader from '../../components/ui/loader/Loader'
import { useUserStore } from '../../store/user'
import styles from './Login.module.scss'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isValid, setIsValid] = useState(false)
	const navigate = useNavigate()
	const [isSuccess, setIsSuccess] = useState(false)

	useEffect(() => {
		if (!username || !password) {
			setIsValid(false)
		} else {
			setIsValid(true)
		}
	}, [username, password])

	const { error, login, isLoading, user } = useUserStore(
		useShallow(state => ({
			error: state.error,
			login: state.login,
			isLoading: state.isLoading,
			user: state.user,
		})),
	)

	useEffect(() => {
		if (user) {
			setUsername('')
			setPassword('')
			navigate('/')
		}
	}, [user])

	if (isLoading) {
		return <Loader />
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (isValid) {
			login({
				username,
				password,
			})
		}
	}

	return (
		<WithoutAuth>
			<div>
				<h1 className={styles.title}>Авторизація</h1>
				{error && (
					<p className={styles.errorMessage}>
						Помилка: <strong>{error}</strong>
					</p>
				)}
				<form
					onSubmit={e => handleSubmit(e)}
					className={styles.form}
					method='post'>
					<div className={styles.formItem}>
						<input
							value={username}
							onChange={e => setUsername(e.target.value)}
							placeholder='Username'
							type='text'
						/>
					</div>
					<div className={styles.formItem}>
						<input
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder='Password'
							type='password'
						/>
					</div>
					<button
						className={styles.loginButton}
						disabled={!isValid}
						type='submit'>
						Ввійти
					</button>
				</form>
			</div>
		</WithoutAuth>
	)
}

export default Login
