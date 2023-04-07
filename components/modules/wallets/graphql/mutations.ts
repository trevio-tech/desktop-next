export const CREATE_PAYMENT = `
  mutation createPayment($amount: Int!, $type: String!) {
    createPayment(amount: $amount, type: $type)
  }
`