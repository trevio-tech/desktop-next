export default `
  id
  title
  user_id
  place_id
  travel_id
  cover_id
  text(words: 20)
  published_at(format: "d.m.Y")
  likes_count
  system_name
  created_at
  can
  resolved_at(format: "d.m.Y")
  cover {
    id
    url
  }
  bookmarks {
    category_id
  }
  travel {
    id
    place_id
    title
    place {
      id
      name
    }
  }
  user {
    id
    name
    avatar
  }
  tags {
    id
    name
  }
  like {
    is_liked
  }
`