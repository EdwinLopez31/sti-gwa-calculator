import { useReducer } from 'react'
import GradesContext from './GradesContext'
import GradesReducer from './GradesReducer'
import GradesActions from './GradesActions'

const GradesState = props => {
	const initialState = {
		inputFields: {
			name: '',
			units: '',
			qt1Grade: '',
			qt2Grade: '',
			qt3Grade: '',
			qt4Grade: '',
			rawGrade: '',
			finalGrade: '',
			creditPointsPerCourse: '',
		},
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

	const removeAll = () => {
		dispatch({
			type: GradesActions.REMOVE_ALL,
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
				removeAll,
			}}
		>
			{props.children}
		</GradesContext.Provider>
	)
}

export default GradesState
