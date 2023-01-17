export default `
  id
  user_id
  question_id
  text
  is_pinned
  created_at(format: "relative")
  can_pin
  system_name
  likes_count
  like {
    is_liked
  }
  images(presets: "default@resize:fill:120:120") {
    id
    url
    presets
  }
  question {
    id
    user_id
  }
  user {
    id
    name
    avatar
  }
`