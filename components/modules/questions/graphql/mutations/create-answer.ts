import { ANSWER_CARD } from '~/components/modules/questions/graphql'

export default `
  mutation($input: AnswerInput!) {
    answer: createAnswer(input: $input) {
      ${ANSWER_CARD}
    }
  }
`