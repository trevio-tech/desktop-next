export default [
  { path: '/tags', name: 'tags', file: 'index' },
  { path: '/tags/:tag', name: 'tags.tag', file: 'index'},
  { path: '/tags/:tag/:content', name: 'tags.tag.content', file: 'index'},
]