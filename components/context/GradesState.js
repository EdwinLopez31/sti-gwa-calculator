import { useReducer } from 'react'
import GradesContext from './GradesContext'
import GradesReducer from './GradesReducer'
import GradesActions from './GradesActions'

const GradesState = props => {
	const initialState = {
		subjects: [],
		GWA: '',
	}

	const [state, dispatch] = useReducer(GradesReducer, initialState)

	const addSubject = subject => {
		dispatch({
			type: GradesActions.ADD_SUBJECT,
			payload: subject,
		})
	}

	const calculateGWA = GWA => {
		const TUN = state.subjects.reduce((acc, subject) => {
			return subject.units + acc
		}, 0)

		const TCP = state.subjects.reduce((acc, subject) => {
			return +subject.creditPointsPerCourse + acc
		}, 0)

		dispatch({
			type: GradesActions.CALCULATE_GWA,
			payload: (TCP / TUN).toFixed(2),
		})
	}

	const deleteSubject = _idx => {
		dispatch({
			type: GradesActions.DELETE_SUBJECT,
			payload: _idx,
		})
	}

	return (
		<GradesContext.Provider
			value={{
				subjects: state.subjects,
				GWA: state.GWA,
				addSubject,
				calculateGWA,
				deleteSubject,
			}}
		>
			{props.children}
		</GradesContext.Provider>
	)
}

export default GradesState
