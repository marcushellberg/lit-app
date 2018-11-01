import { LitElement, html, property } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import {
  addTodo,
  VisibilityFilters,
  updateTodoStatus,
  updateFilter,
  clearCompleted
} from '../redux/actions/todo.js';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';

import { todo, getVisibleTodosSelector } from '../redux/reducers/todo.js';
store.addReducers({ todo });

export default class TodoView extends connect(store)(LitElement) {
  static get properties() {
    return {
      todos: Array,
      task: String
    };
  }

  stateChanged(state) {
    this.todos = getVisibleTodosSelector(state);
    this.filter = state.todo.filter;
  }

  render() {
    if (!this.task) this.task = '';

    return html`
      <style>
        :host {
          display: block;
          max-width: 800px;
          margin: 0 auto;
        }

        .input-layout {
          width: 100%;
          display: flex;
        }

        .input-layout vaadin-text-field {
          flex: 1;
          margin-right: var(--spacing);
        }

        .todos-list {
          margin-top: var(--spacing);
        }

        .visibility-filters {
          margin-top: calc(4 * var(--spacing));
        }
      </style>

      <div class="input-layout">
        <vaadin-text-field 
          placeholder="Task" 
          value="${this.task}"
          @change="${this.updateTask}"></vaadin-text-field>

        <vaadin-button 
          theme="primary"
          @click="${this.addTodo}">Add Todo</vaadin-button>
      </div>

      <div class="todos-list">
        ${this.todos.map(
          todo => html`
          <div class="todo-item">
            <vaadin-checkbox 
            ?checked="${todo.complete}"
            @checked-changed="${e =>
              this.updateTodoStatus(todo, e.target.checked)}">
              ${todo.task}
            </vaadin-checkbox>
          </div>`
        )}
      </div>

      <vaadin-radio-group 
        class="visibility-filters"
        value="${this.filter}"
        @value-changed="${this.filterChanged}">
        
        ${Object.values(VisibilityFilters).map(
          filter =>
            html`
            <vaadin-radio-button value="${filter}">
              ${filter}
            </vaadin-radio-button>`
        )}
      </vaadin-radio-group>
      <vaadin-button 
        @click="${this.clearCompleted}">
          Clear completed
      </vaadin-button>
    `;
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  addTodo() {
    store.dispatch(addTodo(this.task));
    this.task = '';
  }

  updateTodoStatus(todo, complete) {
    store.dispatch(updateTodoStatus(todo, complete));
  }

  clearCompleted() {
    store.dispatch(clearCompleted());
  }

  filterChanged(e) {
    store.dispatch(updateFilter(e.detail.value));
  }
}

customElements.define('todo-view', TodoView);
