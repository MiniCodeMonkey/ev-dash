import update from 'react-addons-update';
import { ACTION_DID_START_VEHICLES_REQUEST, ACTION_COMPLETED_VEHICLES_REQUEST, ACTION_SELECT_VEHICLE } from '../actions/userActions';

const initialState = {
	vehicles: [],
	isLoading: false,
	selectedVehicleId: null
};

function vehiclesReducer(state = initialState, action) {
	switch (action.type) {
		case ACTION_DID_START_VEHICLES_REQUEST:
			return update(state, {
				$merge: {
					isLoading: true
				}
			});

		case ACTION_COMPLETED_VEHICLES_REQUEST:
			return update(state, {
				$merge: {
					isLoading: false,
					vehicles: action.vehicles
				}
			});

		case ACTION_SELECT_VEHICLE:
			return update(state, {
				$merge: {
					selectedVehicleId: action.vehicleId
				}
			});

		default:
			return state;
	}
}

export default vehiclesReducer;
