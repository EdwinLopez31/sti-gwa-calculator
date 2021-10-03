import styles from '../../styles/CustomInput.module.scss'

const CustomInput = props => {
	return (
		<div className={`${styles.inputContainer} w-11/12`}>
			<input
				{...props}
				className={`${styles.inputField}  `}
				required
			/>
			<label className={`${styles.inputLabel} scale-[.85] translate-y-[-2rem] font-semibold text-[#0d61a5] `} htmlFor={props.id}>
				{props.placeholder}
			</label>
		</div>
	)
}

export default CustomInput
