import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux';

import rootReducer from './reducers';

export default createStore(rootReducer, applyMiddleware(promise, thunk));
