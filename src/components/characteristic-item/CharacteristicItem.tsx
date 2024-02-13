import styles from './CharacteristicItem.module.scss'

type PropsType = {
	name: string
	value: string
}

const CharacteristicItem = ({ name, value }: PropsType) => {
	return (
		<div className={styles.wrapper}>
			<p>
				<strong>{name}</strong>:
			</p>
			&nbsp;
			<p>{value}</p>
		</div>
	)
}

export default CharacteristicItem
