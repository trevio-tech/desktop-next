export default `
  mutation ($id: ID!, $input: TravelInput!) {
    travelForm: updateTravel(id: $id, input: $input)
  }
`