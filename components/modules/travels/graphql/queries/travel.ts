
export default `
  id
  place_id
  user_id
  title
  text
  can
  rating
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
  preview(sizes: "default@resize:fit:640") {
      id
      model_id
      url
      sizes
  }
`