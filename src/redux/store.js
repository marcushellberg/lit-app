import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { lazyReducerEnhancer } from 'pwa-helpers';
import thunk from 'redux-thunk';
import { app } from './reducers/app.js';
import { todo } from './reducers/todo.js';

const devCompose =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const STORAGE_KEY = '__todo_app__';

export const saveState = state => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadState = () => {
  let json = localStorage.getItem(STORAGE_KEY) || '{}';
  let state = JSON.parse(json);

  return state || undefined;
};

export const store = createStore(
  state => state,
  loadState(),
  devCompose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
);
store.addReducers({ app, todo });
store.subscribe(() => {
  saveState(store.getState());
});
