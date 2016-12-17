import update from 'react-addons-update';
import {
	ACTION_DID_START_TESLA_AUTHENTICATION, ACTION_COMPLETED_TESLA_AUTHENTICATION,
	ACTION_DID_START_TESLA_AUTHENTICATION_DISCONNECT, ACTION_COMPLETED_TESLA_AUTHENTICATION_DISCONNECT
} from '../actions/userActions';

const initialState = {
	name: null,
	email: null,
	hasValidAccessToken: false,
	isAuthenticatingWithTesla: false,
	showAuthenticationErrorMessage: false
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case ACTION_DID_START_TESLA_AUTHENTICATION:
			return update(state, {
				$merge: {
					isAuthenticatingWithTesla: true
				}
			});

		case ACTION_COMPLETED_TESLA_AUTHENTICATION:
			return update(state, {
				$merge: {
					hasValidAccessToken: action.success,
					isAuthenticatingWithTesla: false,
					showAuthenticationErrorMessage: !action.success
				}
			});

		case ACTION_DID_START_TESLA_AUTHENTICATION_DISCONNECT:
			return update(state, {
				$merge: {
					isAuthenticatingWithTesla: true
				}
			});

		case ACTION_COMPLETED_TESLA_AUTHENTICATION_DISCONNECT:
			return update(state, {
				$merge: {
					hasValidAccessToken: !action.success,
					isAuthenticatingWithTesla: false,
					showAuthenticationErrorMessage: !action.success
				}
			});

		default:
			return state;
	}
}

export default userReducer;
