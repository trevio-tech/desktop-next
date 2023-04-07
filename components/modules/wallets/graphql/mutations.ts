export const CREATE_PAYMENT = `
  mutation createPayment($amount: Int!, $type: String!) {
    createPayment(amount: $amount, type: $type)
  }
`

export const CONFIRM_PAYMENT = `
  mutation confirmPayment($operation_id: Int!) {
    confirmPayment(operation_id: $operation_id) {
      balance
      confirmed_at
      status
    }
  }
`