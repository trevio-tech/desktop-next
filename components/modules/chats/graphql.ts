export const CREATE_CHAT_MESSAGE = `
  mutation ($chat_id: String!, $input: ChatMessageInput!) {
    messageId: createChatMessage(chat_id: $chat_id, input: $input)
  }
`