import update from 'react-addons-update';
import {
	ACTION_DID_START_CHARGERS_REQUEST,
	ACTION_COMPLETED_CHARGERS_REQUEST,
} from '../actions/chargersActions';

const initialState = {
	chargers: [],
	isLoading: false
};

function chargersReducer(state = initialState, action) {
	switch (action.type) {
		case ACTION_DID_START_CHARGERS_REQUEST:
			return update(state, {
				$merge: {
					isLoading: true
				}
			});

		case ACTION_COMPLETED_CHARGERS_REQUEST:
			return update(state, {
				$merge: {
					isLoading: false,
					chargers: action.chargers
				}
			});
			
		default:
			return state;
	}
}

export default chargersReducer;
