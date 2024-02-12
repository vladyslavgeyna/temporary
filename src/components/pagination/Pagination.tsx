import styles from './Pagination.module.scss'

type PropsType = {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PropsType) => {
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

	return (
		<div className={styles.pagination}>
			{pageNumbers.map(number => (
				<span
					key={number}
					onClick={() => onPageChange(number)}
					className={`${styles.paginationItem} ${
						number === currentPage ? styles.active : ''
					}`}>
					{number}
				</span>
			))}
		</div>
	)
}

export default Pagination
