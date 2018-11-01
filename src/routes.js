const routes = [
  {
    path: '/',
    component: 'todo-view'
  },
  {
    path: '/stats',
    component: 'todo-stats-view',
    action: () =>
      import(/* webpackChunkName: "stats" */ './views/todo-stats-view')
  },
  {
    path: '(.*)',
    component: 'not-found-view',
    action: () =>
      import(/* webpackChunkName: "not-found-view" */ './views/not-found-view')
  }
];

export default routes;
