export const ACTION_DID_START_CHARGERS_REQUEST = 'ACTION_DID_START_CHARGERS_REQUEST';
export const ACTION_COMPLETED_CHARGERS_REQUEST = 'ACTION_COMPLETED_CHARGERS_REQUEST';
export const ACTION_SELECT_VEHICLE = 'ACTION_SELECT_VEHICLE';
export const ACTION_UPDATE_CURRENT_DATA = 'ACTION_UPDATE_CURRENT_DATA';

export function listChargers() {
	return doRequest('get');
}

function doRequest(method) {
	return dispatch => {
		dispatch(didStartChargersRequest());

		return fetch(`/api/v1/chargers`, {
			credentials: 'include',
			method: method,  
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-type': 'application/json',
				'X-CSRF-TOKEN': window.App.csrfToken
			}
		})
		.then(response => response.json())
		.then(json => {
			dispatch(completedChargersRequest(json));
		})
		.catch(error => dispatch(completedChargersRequest([])));
	}
}

function didStartChargersRequest() {
	return {
		type: ACTION_DID_START_CHARGERS_REQUEST
	}
}

function completedChargersRequest(chargers) {
	return {
		type: ACTION_COMPLETED_CHARGERS_REQUEST,
		chargers
	}
}
