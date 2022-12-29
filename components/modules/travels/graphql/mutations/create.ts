export default `
  mutation ($input: TravelInput!) {
    travelForm: createTravel(input: $input)
  }
`