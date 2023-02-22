export default `
  id
  user_id
  title
  text(words: 12)
  likes_count
  system_name
  created_at
  published_at
  cover {
    url(presets: "default@resize:fill:640:320")
  }
  tags {
    id
    name
  }
  user {
    id
    name
    avatar
  }
  bookmarks {
    category_id
  }
  like {
    is_liked
  }
`

/*
export default `
  id
  user_id
  title
  text(words: 12)
  likes_count
  can
  rating
  system_name
  created_at
  published_at
  cover(sizes: "default@resize:fill:640:320") {
    id
    model_id
    url
    sizes
  }
  tags {
    id
    name
  }
  user {
    id
    name
    avatar
  }
  bookmarks {
    category_id
  }
`*/
