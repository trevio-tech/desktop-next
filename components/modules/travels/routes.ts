export default [
  { path: '/travels', name: 'travels', file: 'index' },
  { path: '/travels/:travelId(\\d+)', name: 'travels.show', file: 'show'},
  { path: '/travels/create', name: 'travels.create', file: 'form'},
  { path: '/travels/:travelId(\\d+)/edit', name: 'travels.edit', file: 'form'},
]