export default `
  id
  currency_id
  place_id
  budget
  title
  text
  date_start
  date_end
  is_draft
  tags {
    id
    name
  }
  place {
    id
    name
    full_name
  }
  cover {
    id
    url(presets: "default@resize:fill:640:320")
  }
`