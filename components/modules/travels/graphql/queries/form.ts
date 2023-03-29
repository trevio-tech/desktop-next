export default `
  id
  currency_id
  place_id
  budget
  title
  text
  date_start(format: "iso")
  date_end(format: "iso")
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
    url(presets: "default@resize:fill:640:640")
  }
`