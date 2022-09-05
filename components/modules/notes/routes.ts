export default [
  { path: '/notes', name: 'notes', file: 'index' },
  { path: '/notes/:noteId(\\d+)', name: 'notes.show', file: 'show'},
]