export const TRAVELS = `
  travels(tag_id: $tag_id) {
    id
    title
    text(words: 12)
    likes_count
    can
    rating
    cover(sizes: "default@resize:fit:640") {
      id
      model_id
      sizes
    }
    tags {
      id
      name
    }
  }
`

export const TRAVEL = `
  travel(id: $id) {
    id
    place_id
    title
    text
    can
    rating
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

export const TRAVEL_FORM = `
  travel(id: $id) {
    id
    currency_id
    place_id
    budget
    title
    text
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

export const CREATE_TRAVEL = `
  mutation ($input: TravelInput!) {
    travelForm: createTravel(input: $input)
  }
`
export const UPDATE_TRAVEL = `
  mutation ($id: Int!, $input: TravelInput!) {
    travelForm: updateTravel(id: $id, input: $input)
  }
`