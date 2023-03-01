export default `
  id
  user_id
  question_id
  text
  is_pinned
  created_at(format: "relative")
  system_name
  likes_count
  like {
    is_liked
  }
  images {
    id
    url
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