import { LitElement, html, query } from '@polymer/lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../redux/store.js';
import { statsSelector } from '../redux/reducers/stats.js';
import '@vaadin/vaadin-charts';

class TodoStats extends connect(store)(LitElement) {
  static get properties() {
    return {
      chartConfig: Object
    };
  }

  stateChanged(state) {
    const stats = statsSelector(state);
    this.chartConfig = [
      {
        name: 'Completed',
        y: stats.completed
      },
      {
        name: 'Active',
        y: stats.active
      }
    ];

    this.hasTodos = stats.completed + stats.active > 0;
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }

        #chart {
          margin: 50px auto;
        }
      </style>
      
      <vaadin-chart type="pie" ?hidden="${!this.hasTodos}">
        <vaadin-chart-series 
          .values="${this.chartConfig}"></vaadin-chart-series>
      </vaadin-chart>
    `;
  }
}

customElements.define('todo-stats-view', TodoStats);
