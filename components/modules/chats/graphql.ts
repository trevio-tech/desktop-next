export const CREATE_CHAT_MESSAGE = `
  mutation ($chat_id: String!, $input: ChatMessageInput!) {
    messageId: createChatMessage(chat_id: $chat_id, input: $input)
  }
`

export const MY_CHATS = `
  myChats {
    id
    name
    model_type
    model_id
    last_message_id
    last_message_at
    lastMessage {
      id
      chat_id
      user_id
      text(length: 5)
      user {
        id
        name
        avatar
      }
    }
  }
`