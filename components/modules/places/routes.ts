export default [
  { path: '/countries', name: 'places.countries', file: 'countries' },
  { path: '/places/:placeId(\\d+)', name: 'places.show', file: 'show' },
  {
    path: '/places/:placeId(\\d+)/:contentType(travels|albums|notes|posts|questions)?',
    name: 'places.show',
    file: 'show'
  },
  {
    path: '/places/:placeId(\\d+)/reviews/:stars([1-5])?',
    name: 'places.reviews',
    file: 'show'
  },
]