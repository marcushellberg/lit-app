import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { lazyReducerEnhancer } from 'pwa-helpers';
import thunk from 'redux-thunk';
import { app } from './reducers/app.js';

const devCompose =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const store = createStore(
  state => state,
  devCompose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
);

store.addReducers({ app });
