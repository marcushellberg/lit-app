import uuid from '../uuid.js';

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO_STATUS = 'UPDATE_TODO_STATUS';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

export const VisibilityFilters = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
};

export const addTodo = task => {
  return {
    type: ADD_TODO,
    todo: {
      id: uuid(),
      task,
      complete: false
    }
  };
};

export const updateTodoStatus = (todo, complete) => {
  return {
    type: UPDATE_TODO_STATUS,
    todo,
    complete
  };
};

export const updateFilter = filter => {
  return {
    type: UPDATE_FILTER,
    filter
  };
};

export const clearCompleted = () => {
  return {
    type: CLEAR_COMPLETED
  };
};
