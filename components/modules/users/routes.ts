export default [
  { path: '/users', name: 'users', file: 'login'},
  { path: '/login', name: 'users.login', file: 'login'},
  { path: '/register', name: 'users.register', file: 'register'},
  { path: '/users/:userId(\\d+)', name: 'users.show', file: 'show'},
  { path: '/users/:userId(\\d+)/edit', name: 'users.edit', file: 'edit'},
  { path: '/users/:userId(\\d+)/edit/password', name: 'users.edit.password', file: 'edit-password'},
  { path: '/users/:userId(\\d+)/edit/contacts', name: 'users.edit.contacts', file: 'edit-contacts'},
  { path: '/oauth/:provider/callback', name: 'users.callback', file: 'callback' },
]