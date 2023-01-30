import { ANSWER_CARD } from '~/components/modules/questions/graphql'

export default `
  mutation($answerId: ID!, $input: AnswerInput!) {
    answerForm: updateAnswer(answerId: $answerId, input: $input) {
      ${ANSWER_CARD}
    }
  }
`