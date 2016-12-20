import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer';
import OverviewContainer from './containers/OverviewContainer';
import AuthenticationContainer from './containers/AuthenticationContainer';
import LogsContainer from './containers/LogsContainer';
import { refreshCurrentData } from './actions/vehiclesActions';

const mount = document.getElementById('app');

if (mount) {
	const initialState = window.__INITIAL_STATE__ || {};
	const store = configureStore(initialState);
	const history = syncHistoryWithStore(browserHistory, store);

	const reactComponent = (
		<Provider store={store}>
			<Router history={history}>
				<Route path="/" component={AppContainer}>
					<IndexRoute component={OverviewContainer} />
					<Route path="/authentication" component={AuthenticationContainer} />
					<Route path="/logs" component={LogsContainer} />
				</Route>
			</Router>
		</Provider>
	);

	render(reactComponent, mount);

	store.dispatch(refreshCurrentData());
	setInterval(() => {
		store.dispatch(refreshCurrentData());
	}, 30000);
}
