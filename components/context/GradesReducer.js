import ACTIONS from './GradesActions'

const GradesReducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.ADD_SUBJECT:
			return {
				...state,
				subjects: [...state.subjects, action.payload],
			}
		case ACTIONS.CALCULATE_GWA:
			return {
				...state,
				GWA: action.payload,
			}
		case ACTIONS.DELETE_SUBJECT:
			return {
				...state,
				subjects: state.subjects.filter(
					subject => state.subjects.indexOf(subject) !== action.payload,
				),
			}
		case ACTIONS.REMOVE_ALL:
			return {
				...state,
				subjects: [],
			}

		default:
	}
}

export default GradesReducer
