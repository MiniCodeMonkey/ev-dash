import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import AppContainer from './containers/AppContainer.jsx';
import OverviewContainer from './containers/OverviewContainer.jsx';
import AuthenticationContainer from './containers/AuthenticationContainer.jsx';

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
				</Route>
			</Router>
		</Provider>
	);

	render(reactComponent, mount);
}
