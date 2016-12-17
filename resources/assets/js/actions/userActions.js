export const ACTION_DID_START_TESLA_AUTHENTICATION = 'ACTION_DID_START_TESLA_AUTHENTICATION';
export const ACTION_COMPLETED_TESLA_AUTHENTICATION = 'ACTION_COMPLETED_TESLA_AUTHENTICATION';

export const ACTION_DID_START_TESLA_AUTHENTICATION_DISCONNECT = 'ACTION_DID_START_TESLA_AUTHENTICATION_DISCONNECT';
export const ACTION_COMPLETED_TESLA_AUTHENTICATION_DISCONNECT = 'ACTION_COMPLETED_TESLA_AUTHENTICATION_DISCONNECT';

export function authenticateWithTesla(email, password) {
	return dispatch => {
		dispatch(didStartTeslaAuthentication());

		return fetch(`/api/v1/connect/tesla`, {
			credentials: 'include',
			method: 'post',  
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-type': 'application/json',
				'X-CSRF-TOKEN': window.App.csrfToken
			},  
			body: JSON.stringify({email, password})
		})
		.then(response => response.json())
		.then(json => {
			const success = json && json.success;
			dispatch(completedTeslaAuthentication(success || false));
		})
		.catch(error => dispatch(completedTeslaAuthentication(false)));
	}
}

export function disconnectAuthenticationWithTesla(email, password) {
	return dispatch => {
		dispatch(didStartTeslaAuthenticationDisconnect());

		return fetch(`/api/v1/connect/tesla`, {
			credentials: 'include',
			method: 'DELETE',  
			headers: {
				'X-CSRF-TOKEN': window.App.csrfToken
			}
		})
		.then(response => response.json())
		.then(json => {
			const success = json && json.success;
			dispatch(completedTeslaAuthenticationDisconnect(success || false));
		})
		.catch(error => dispatch(completedTeslaAuthenticationDisconnect(false)));
	}
}

function didStartTeslaAuthentication() {
	return {
		type: ACTION_DID_START_TESLA_AUTHENTICATION
	}
}

function completedTeslaAuthentication(success) {
	return {
		type: ACTION_COMPLETED_TESLA_AUTHENTICATION,
		success: success
	}
}

function didStartTeslaAuthenticationDisconnect() {
	return {
		type: ACTION_DID_START_TESLA_AUTHENTICATION_DISCONNECT
	}
}

function completedTeslaAuthenticationDisconnect(success) {
	return {
		type: ACTION_COMPLETED_TESLA_AUTHENTICATION_DISCONNECT,
		success: success
	}
}
