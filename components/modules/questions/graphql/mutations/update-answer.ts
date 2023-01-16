export default `
  mutation($answer_id: ID!, $input: AnswerInput!) {
    answerForm: updateAnswer(answer_id: $answer_id, input: $input) {
      id
      text
    }
  }
`