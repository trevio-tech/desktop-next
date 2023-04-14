export default [
  { path: '/users', name: 'users', file: 'login'},
  { path: '/login', name: 'users.login', file: 'login'},
  { path: '/register', name: 'users.register', file: 'register'},
  { path: '/users/:userId(\\d+)', name: 'users.show', file: 'show'},
  { path: '/me/edit', name: 'users.edit', file: 'edit'},
  { path: '/me/edit/password', name: 'users.edit.password', file: 'edit-password'},
  { path: '/me/edit/contacts', name: 'users.edit.contacts', file: 'edit-contacts'},
  { path: '/oauth/:provider/callback', name: 'users.callback', file: 'callback' },
  // Премиум аккаунт.
  { path: '/premium', name: 'users.premium', file: 'premium' },
]