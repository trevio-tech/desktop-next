export default `
  mutation ($id: Int!) {
    deleteContent: deleteAnswer(id: $id)
  }
`