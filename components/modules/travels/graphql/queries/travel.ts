export default `
  id
  place_id
  user_id
  title
  text
  date_start
  date_end
  system_name
  nested_entries_count
  tags {
    id
    name
  }
  user {
    id
    name
    avatar
  }
  place {
    id
    name
    full_name
  }
  bookmarks {
    category_id
  }
  cover {
    id
    url(presets: "default@resize:fit:640")
  }
`