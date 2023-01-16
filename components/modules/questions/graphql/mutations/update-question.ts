export default `
  mutation ($id: Int!, $input: QuestionInput!) {
    questionForm: updateQuestion(id: $id, input: $input)
  }
`