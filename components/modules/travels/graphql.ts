export const TRAVEL_CARD = `
  id
  user_id
  title(words: 6)
  text(words: 12)
  likes_count
  can
  rating
  preview(sizes: "default@resize:fill:256:256") {
    id
    model_id
    url
    sizes
  }
  tags {
    id
    name
  }
  user {
    id
    name
    avatar
  }
`

export const TRAVEL = `
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

export const TRAVEL_FORM = `
  travel(id: $id) {
    id
    currency_id
    place_id
    budget
    title
    text
    date_start
    date_end
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