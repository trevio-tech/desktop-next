export default [
  { path: '/users/:userId(\\d+)/bookmarks', name: 'bookmarks', file: 'index'},
  { path: '/users/:userId(\\d+)/bookmarks/:categoryId(\\d+)', name: 'bookmarks.category', file: 'index'},
]