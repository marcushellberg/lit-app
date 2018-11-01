import { createSelector } from 'reselect';
import {
  ADD_TODO,
  VisibilityFilters,
  UPDATE_FILTER,
  UPDATE_TODO_STATUS,
  CLEAR_COMPLETED
} from '../actions/todo.js';

const newTodo = () => {
  return {
    task: '',
    complete: false
  };
};

const INITIAL_STATE = {
  todos: [],
  currentTodo: newTodo(),
  filter: VisibilityFilters.SHOW_ALL
};

export const todo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo],
        currentTodo: newTodo()
      };
    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo => {
          return todo.id === action.todo.id
            ? { ...action.todo, complete: action.complete }
            : todo;
        })
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.complete)
      };
    default:
      return state;
  }
};

// Selectors
const getTodosSelector = state => state.todo.todos;
const getFilterSelector = state => state.todo.filter;

export const getVisibleTodosSelector = createSelector(
  getTodosSelector,
  getFilterSelector,
  (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(todo => todo.complete);
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(todo => !todo.complete);
      default:
        return todos;
    }
  }
);
