import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import WithoutAuth from '../../components/hoc/WithoutAuth'
import Loader from '../../components/ui/loader/Loader'
import { useUserStore } from '../../store/user'
import styles from './Register.module.scss'

const Register = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [isValid, setIsValid] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (
			!username ||
			!password ||
			!confirmPassword ||
			password !== confirmPassword
		) {
			setIsValid(false)
		} else {
			setIsValid(true)
		}
	}, [username, password, confirmPassword])

	const { error, register, user, isLoading } = useUserStore(
		useShallow(state => ({
			error: state.error,
			register: state.register,
			user: state.user,
			isLoading: state.isLoading,
		})),
	)

	useEffect(() => {
		if (user) {
			setUsername('')
			setPassword('')
			setConfirmPassword('')
			navigate('/')
		}
	}, [user])

	if (isLoading) {
		return <Loader />
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (isValid) {
			register({
				username,
				password,
			})
		}
	}

	return (
		<WithoutAuth>
			<div>
				<h1 className={styles.title}>Реєстрація</h1>
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
							placeholder='Нікнейм'
							type='text'
						/>
					</div>
					<div className={styles.formItem}>
						<input
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder='Пароль'
							type='password'
						/>
					</div>
					<div className={styles.formItem}>
						<input
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							placeholder='Підтвердіть пароль'
							type='password'
						/>
					</div>

					<button
						className={styles.registerButton}
						disabled={!isValid}
						type='submit'>
						Зареєструватися
					</button>
				</form>
			</div>
		</WithoutAuth>
	)
}

export default Register
