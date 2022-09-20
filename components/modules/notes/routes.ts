export default [
  { path: '/notes', name: 'notes', file: 'index' },
  { path: '/notes/:noteId(\\d+)', name: 'notes.show', file: 'show'},
  { path: '/notes/create', name: 'notes.create', file: 'form'},
  { path: '/notes/:noteId(\\d+)/edit', name: 'notes.edit', file: 'form'},
]