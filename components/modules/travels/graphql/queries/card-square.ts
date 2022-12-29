export default `
  id
  user_id
  title(words: 10)
  system_name
  created_at
  cover(sizes: "default@resize:fill:320:200") {
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