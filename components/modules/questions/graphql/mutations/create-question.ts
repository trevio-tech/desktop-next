export default `
  mutation ($input: QuestionInput!) {
    questionForm: createQuestion(input: $input)
  }
`