import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import userReducer from '../reducers/userReducer.js';
import vehiclesReducer from '../reducers/vehiclesReducer.js';
import chargersReducer from '../reducers/chargersReducer.js';

export default function configureStore(initialState) {
    const middlewares = [
        thunkMiddleware,
        routerMiddleware(browserHistory)
    ];
    
    if (process.env.NODE_ENV !== 'production') {
        const logger = createLogger({ collapsed: false });
        middlewares.push(logger);
    }

    const middleware = compose(applyMiddleware(...middlewares));
    
    const reducer = combineReducers({
        routing: routerReducer,
        user: userReducer,
        vehicles: vehiclesReducer,
        chargers: chargersReducer
    });

    const store = middleware(createStore)(reducer, initialState);

    return store;
}
