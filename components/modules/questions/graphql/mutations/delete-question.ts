export default `
  mutation ($id: ID!) {
    deleteContent: deleteQuestion(id: $id)
  }
`