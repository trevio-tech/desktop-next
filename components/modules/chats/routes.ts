export default [
  { path: '/chats', name: 'chats', file: 'index'},
  { path: '/chats/:chatType(notes|albums|reviews)?', name: 'chats', file: 'index'},
  { path: '/chats/:chatType(notes|albums|reviews)/:chatId(\\d+)', name: 'chats.show', file: 'show'},
]