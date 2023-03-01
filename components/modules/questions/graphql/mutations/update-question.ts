export default `
  mutation ($id: ID!, $input: QuestionInput!) {
    questionForm: updateQuestion(id: $id, input: $input)
  }
`