export const CHAT_MESSAGE = `
  id
  chat_id
  parent_id
  text
  stack
  stack_name
  time
  chat {
    id
    name
  }
  user {
    id
    name
    avatar
  }
  images(presets: "default@resize:fill:80:80") {
    id
    model_id
    url
    presets
  }
`

export const CREATE_CHAT_MESSAGE = `
  mutation ($chatId: ID!, $input: ChatMessageInput!) {
    messageId: createChatMessage(chatId: $chatId, input: $input) {
      ${CHAT_MESSAGE}
    }
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