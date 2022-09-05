export const TRAVELS = `
  travels {
    id
    title
    text
    likes_count
    can
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
    title
    text
    can
    cover(sizes: "default@resize:fit:640") {
      id
      model_id
      sizes
    }
  }
`

export const CREATE_TRAVEL = `
  mutation ($input: TravelInput!) {
    travelForm: createTravel(input: $input)
  }
`