export default `
  mutation($input: AnswerInput!) {
    answerForm: createAnswer(input: $input) {
      id
      text
    }
  }
`