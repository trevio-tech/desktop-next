export default `
  id
  user_id
  question_id
  text
  is_pinned
  created_at(format: "relative")
  can_pin
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