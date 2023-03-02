import { ANSWER_CARD } from '~/components/modules/questions/graphql'

export default `
  mutation($id: ID!, $input: AnswerInput!) {
    answer: updateAnswer(id: $id, input: $input) {
      ${ANSWER_CARD}
    }
  }
`