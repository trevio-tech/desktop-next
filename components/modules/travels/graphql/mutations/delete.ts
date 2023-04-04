
export default `
  mutation deleteTravel($id: ID!) {
    deleteContent: deleteTravel(id: $id)
  }
`