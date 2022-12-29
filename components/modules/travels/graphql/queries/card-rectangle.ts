export default `
  id
  user_id
  title(words: 6)
  text(words: 12)
  system_name
  created_at
  cover(sizes: "default@resize:fill:640:320") {
    id
    model_id
    url
    sizes
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