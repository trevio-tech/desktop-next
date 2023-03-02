export default /* GraphQL */`
  id
  place_id
  user_id
  title
  text
  date_start
  date_end
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
  cover {
    id
    url(presets: "default@resize:fit:640")
  }
`