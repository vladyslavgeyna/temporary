import { useEffect, useState } from 'react'
import { Enum } from '../../../types/enum'
import styles from './Checkbox.module.scss'

type PropsType = {
	item: Enum
	name: string
	setValue: (value: number) => void
	checked: boolean
}

const Checkbox = ({ item, name, setValue, checked }: PropsType) => {
	const [isChecked, setIsChecked] = useState(checked)

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked)
		setValue(item.id)
	}

	useEffect(() => {
		setIsChecked(checked)
	}, [checked])

	return (
		<label className={styles.label}>
			<input
				type='checkbox'
				value={item.id}
				name={name}
				checked={isChecked}
				onChange={handleCheckboxChange}
			/>
			{item.value}
		</label>
	)
}

export default Checkbox
