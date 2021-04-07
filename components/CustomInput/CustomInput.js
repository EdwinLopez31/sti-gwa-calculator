import styles from '../../styles/CustomInput.module.scss'

const CustomInput = props => {
	return (
		<div className={`${styles.inputContainer}`}>
			<input
				{...props}
				className={`${styles.inputField}`}
				required
			/>
			<label className={`${styles.inputLabel} `} htmlFor={props.id}>
				{props.placeholder}
			</label>
		</div>
	)
}

export default CustomInput
