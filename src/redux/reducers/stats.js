import { createSelector } from 'reselect';

const todosSelector = state => state.todo.todos;

export const statsSelector = createSelector([todosSelector], todos => {
  const completed = todos.filter(todo => todo.complete).length;
  return {
    completed,
    active: todos.length - completed
  };
});
