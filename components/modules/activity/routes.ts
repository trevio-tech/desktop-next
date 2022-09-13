export default [
  { path: '/reviews', name: 'reviews', file: 'index' },
  { path: '/reviews/:reviewId(\\d+)', name: 'reviews.show', file: 'show'},
]