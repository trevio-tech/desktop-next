export default `
  mutation ($id: Int!) {
    deleteContent: deleteQuestion(id: $id)
  }
`