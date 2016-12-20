export const ACTION_DID_START_VEHICLES_REQUEST = 'ACTION_DID_START_VEHICLES_REQUEST';
export const ACTION_COMPLETED_VEHICLES_REQUEST = 'ACTION_COMPLETED_VEHICLES_REQUEST';
export const ACTION_SELECT_VEHICLE = 'ACTION_SELECT_VEHICLE';
export const ACTION_UPDATE_CURRENT_DATA = 'ACTION_UPDATE_CURRENT_DATA';

export function refreshVehicles() {
	return doRequest('post');
}

export function listVehicles() {
	return doRequest('get');
}

export function refreshCurrentData() {
	return dispatch => {
		return fetch(`/api/v1/vehicles/current`, {
			credentials: 'include',
			method: 'get',  
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-type': 'application/json',
				'X-CSRF-TOKEN': window.App.csrfToken
			}
		})
		.then(response => response.json())
		.then(json => {
			dispatch(updateCurrentData(json));
		})
		.catch(error => dispatch(updateCurrentData([])));
	}
}

function doRequest(method) {
	return dispatch => {
		dispatch(didStartVehiclesRequest());

		return fetch(`/api/v1/vehicles`, {
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
			dispatch(completedVehiclesRequest(json));
		})
		.catch(error => dispatch(completedVehiclesRequest([])));
	}
}

function didStartVehiclesRequest() {
	return {
		type: ACTION_DID_START_VEHICLES_REQUEST
	}
}

function completedVehiclesRequest(vehicles) {
	return {
		type: ACTION_COMPLETED_VEHICLES_REQUEST,
		vehicles
	}
}

function updateCurrentData(currentData) {
	return {
		type: ACTION_UPDATE_CURRENT_DATA,
		currentData
	}
}

export function selectVehicle(vehicleId) {
	return {
		type: ACTION_SELECT_VEHICLE,
		vehicleId
	}
}
