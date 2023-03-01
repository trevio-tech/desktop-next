import { ANSWER_CARD } from '~/components/modules/questions/graphql'

export default `
  mutation($answerId: ID!, $input: AnswerInput!) {
    answer: updateAnswer(answerId: $answerId, input: $input) {
      ${ANSWER_CARD}
    }
  }
`