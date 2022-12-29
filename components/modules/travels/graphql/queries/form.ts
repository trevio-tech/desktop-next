export default `
  travel(id: $id) {
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
    images(sizes: "default@resize:fit:256") {
      id
      model_id
      url
      sizes
    }
  }
`