export default `
  mutation ($id: Int!, $input: TravelInput!) {
    travelForm: updateTravel(id: $id, input: $input)
  }
`