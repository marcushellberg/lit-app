import './styles.css';
import './views/todo-view';
import { Router } from '@vaadin/router';
import { store } from './redux/store.js';
import { onNavigate } from './redux/actions/app.js';
import routes from './routes.js';

window.addEventListener('load', () => {
  initRouter();
  registerSW();
});

function initRouter() {
  const router = new Router(document.querySelector('#router-outlet'));
  router.setRoutes(routes);

  window.addEventListener('vaadin-router-location-changed', event =>
    store.dispatch(onNavigate(event.detail.location))
  );
}

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      console.log('ServiceWorker registration failed. Sorry about that.', e);
    }
  } else {
    console.log('Your browser does not support ServiceWorker.');
  }
}
