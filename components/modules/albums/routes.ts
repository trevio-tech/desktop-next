export default [
  { path: '/albums', name: 'albums', file: 'index' },
  { path: '/albums/:albumId(\\d+)', name: 'albums.show', file: 'show'},
  { path: '/albums/create', name: 'albums.create', file: 'form'},
  { path: '/albums/:albumId(\\d+)/edit', name: 'albums.edit', file: 'form'},
]