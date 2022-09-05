export default [
  { path: '/users', name: 'users', file: 'login'},
  { path: '/login', name: 'users.login', file: 'login'},
  { path: '/register', name: 'users.register', file: 'register'},
  { path: '/users/:userId(\\d+)', name: 'users.show', file: 'show'},
]