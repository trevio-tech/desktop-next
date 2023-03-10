export default `
  id
  user_id
  title(words: 6)
  text(words: 12)
  system_name
  created_at
  cover {
    id
    url(presets: "default@resize:fill:640:320")
  }
  user {
    id
    name
    avatar
  }
  bookmarks {
    category_id
  }
`