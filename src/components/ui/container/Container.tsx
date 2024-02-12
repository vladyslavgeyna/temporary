import styles from './Container.module.scss'

type PropsType = {
	style?: React.CSSProperties
	children: React.ReactNode
}

const Container = ({ children, style }: PropsType) => {
	return (
		<div style={style} className={styles.container}>
			{children}
		</div>
	)
}

export default Container
